import { INITIAL_REQUESTS } from '../data/initialRequests';
import { VERIFIED_GUEST_LECTURERS } from '../data/guestLecturers';

const STORAGE_KEY = 'tg_guest_lecture_requests';
const LECTURERS_STORAGE_KEY = 'tg_guest_lecturers_list';
const ADMIN_SESSION_KEY = 'tg_admin_auth_user';

// Cached working base URL
let resolvedBaseUrl = null;

const LIVE_RENDER_API = 'https://guest-lecture-system.onrender.com/api';

// Smart multi-target candidate list
// Priority: 1. Live Render Cloud Backend -> 2. Local Wi-Fi -> 3. Emulator bridge -> 4. Localhost
const getCandidateUrls = () => {
  if (import.meta.env.VITE_API_URL) return [import.meta.env.VITE_API_URL, LIVE_RENDER_API];

  const isNative = typeof window !== 'undefined' && (
    window.Capacitor?.isNativePlatform?.() ||
    window.location?.protocol === 'capacitor:' ||
    window.location?.protocol === 'file:' ||
    (window.location?.hostname === 'localhost' && window.navigator?.userAgent?.includes('Android'))
  );

  if (isNative) {
    return [
      LIVE_RENDER_API,                  // Primary: Live 24/7 Cloud Backend on Render
      'http://192.168.101.39:5000/api', // Local Wi-Fi fallback
      'http://10.0.2.2:5000/api',       // Android Studio Emulator bridge
      'http://localhost:5000/api'
    ];
  }

  return [
    LIVE_RENDER_API,
    'http://localhost:5000/api'
  ];
};

// Resilient fetch helper that automatically finds the correct host on mobile or desktop
const requestApi = async (endpoint, options = {}) => {
  const candidates = resolvedBaseUrl 
    ? [resolvedBaseUrl, ...getCandidateUrls().filter(u => u !== resolvedBaseUrl)]
    : getCandidateUrls();

  let lastError = null;

  for (const base of candidates) {
    try {
      const url = `${base}${endpoint}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      // Connection succeeded! Cache this working base URL for subsequent calls
      resolvedBaseUrl = base;
      return res;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('Network request failed. Ensure backend server is running.');
};

// Helper to attach authorization header if token exists
const getAuthHeaders = () => {
  const session = api.getSession();
  const headers = { 'Content-Type': 'application/json' };
  if (session && session.token) {
    headers['Authorization'] = `Bearer ${session.token}`;
  }
  return headers;
};

export const api = {
  // Fetch all requisitions from real PostgreSQL database
  getRequests: async () => {
    try {
      const res = await requestApi('/requests');
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch (err) {
      console.warn('⚠️ Server unreachable, falling back to local cache:', err.message);
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_REQUESTS;
    }
  },

  // Create new requisition in PostgreSQL
  createRequest: async (requestData) => {
    try {
      const res = await requestApi('/requests', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit requisition to server');
      }
      const newRecord = await res.json();
      return newRecord;
    } catch (err) {
      console.error('API createRequest error:', err);
      throw err;
    }
  },

  // Update request status (Pending, Approved, Rejected, Completed)
  updateRequestStatus: async (requestId, status, assignedSpeaker = '') => {
    try {
      const res = await requestApi(`/requests/${encodeURIComponent(requestId)}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, assignedSpeaker })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update requisition status');
      }
      return await res.json();
    } catch (err) {
      console.error('API updateRequestStatus error:', err);
      throw err;
    }
  },

  // Assign or update Guest Lecturer (with backend double-booking conflict check)
  assignLecturer: async (requestId, assignedSpeaker, newStatus = null) => {
    try {
      const res = await requestApi(`/requests/${encodeURIComponent(requestId)}/assign`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ assignedSpeaker, status: newStatus })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to assign guest lecturer');
      }
      return await res.json();
    } catch (err) {
      console.error('API assignLecturer error:', err);
      throw err;
    }
  },

  // Fetch verified and added guest lecturers from PostgreSQL
  getLecturers: async () => {
    try {
      const res = await requestApi('/lecturers');
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      localStorage.setItem(LECTURERS_STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch (err) {
      console.warn('⚠️ Server unreachable, falling back to local lecturer cache:', err.message);
      const stored = localStorage.getItem(LECTURERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : VERIFIED_GUEST_LECTURERS;
    }
  },

  // Register a new guest lecturer in PostgreSQL
  addLecturer: async (lecturerData) => {
    try {
      const res = await requestApi('/lecturers', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(lecturerData)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add guest lecturer');
      }
      return await res.json();
    } catch (err) {
      console.error('API addLecturer error:', err);
      throw err;
    }
  },

  // Unified Role-based Authentication with backend bcrypt & JWT verification
  login: async (username, password) => {
    try {
      const res = await requestApi('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Invalid username or password.'
        };
      }

      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      console.warn('⚠️ Backend login failed, falling back to local credentials:', err.message);
      
      const u = username.trim().toLowerCase();
      const p = password.trim();

      if (u === 'admin' && p === 'admin123') {
        const user = {
          id: 'admin-01',
          name: 'State Academic Officer (Vocational)',
          role: 'ADMIN',
          roleLabel: 'State Administrator',
          department: 'Samagra Shiksha, Govt of Telangana',
          username: 'admin',
          token: 'offline-mock-jwt-admin-2026'
        };
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(user));
        return { success: true, user };
      }

      if (u === 'vt' && p === 'vt123') {
        const user = {
          id: 'vt-101',
          name: 'K. Srikanth Rao',
          role: 'VT',
          roleLabel: 'Vocational Trainer',
          department: 'Department of School Education • ZPHS Medchal',
          trade: 'Information Technology (ITES)',
          schoolName: 'ZPHS Medchal High School',
          udiseCode: '28120100101',
          mobile: '9849012345',
          username: 'vt',
          token: 'offline-mock-jwt-vt-2026'
        };
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(user));
        return { success: true, user };
      }

      return {
        success: false,
        message: 'Unable to connect to backend server and credentials not recognized.'
      };
    }
  },

  getSession: () => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  logout: () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  },

  adminLogin: async (username, password) => api.login(username, password),
  getAdminSession: () => api.getSession(),
  adminLogout: () => api.logout()
};
