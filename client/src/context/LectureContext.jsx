import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

const LectureContext = createContext();

export function LectureProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('home'); // VT: 'home' | 'request' | 'history' | 'support', Admin: 'dashboard' | 'requisitions' | 'search' | 'profile'
  const [activeView, setActiveView] = useState('home'); // for backward compatibility

  // Modal controls
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedRequestForView, setSelectedRequestForView] = useState(null);

  // Guest Lecturer assignment modal controls
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedRequestForAssignment, setSelectedRequestForAssignment] = useState(null);
  const [assignModalAction, setAssignModalAction] = useState('assign'); // 'assign' | 'approve_and_assign'

  // Guest Lecturers Database & Add Modal
  const [lecturers, setLecturers] = useState([]);
  const [isAddLecturerModalOpen, setIsAddLecturerModalOpen] = useState(false);

  // Admin Notification Drawer & dismissals
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState([]);

  // Active trainer form inputs (persisted across modals)
  const [trainerData, setTrainerData] = useState({
    trade: '',
    vtName: '',
    vtMobile: ''
  });

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  useEffect(() => {
    loadRequests();
    loadLecturers();
    // User requested: "when we run first we have to see login page"
    // Always start fresh at the Login screen unless explicitly logged in in this session.
    api.logout();
    setCurrentUser(null);
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await api.getRequests();
      setRequests(data);
    } catch (err) {
      showToast('Failed to load requests from storage', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadLecturers = async () => {
    try {
      const data = await api.getLecturers();
      setLecturers(data);
    } catch (err) {
      console.error('Failed to load guest lecturers', err);
    }
  };

  const handleAddLecturer = async (lecturerData) => {
    try {
      const newLecturer = await api.addLecturer(lecturerData);
      setLecturers(prev => [newLecturer, ...prev]);
      showToast(`Guest Lecturer "${newLecturer.name}" registered successfully!`, 'success');
      setIsAddLecturerModalOpen(false);
      return { success: true, data: newLecturer };
    } catch (err) {
      showToast('Failed to register guest lecturer', 'error');
      return { success: false, error: err.message };
    }
  };

  // Double-booking check:
  // Exclude lecturers who are already assigned to an active (Pending or Approved) request,
  // excluding the current request being edited.
  const getAvailableLecturers = (tradeName = '', currentRequestId = null) => {
    const activeRequests = requests.filter(r => 
      r.id !== currentRequestId &&
      r.status !== 'Rejected' &&
      r.status !== 'Completed' &&
      r.assignedSpeaker &&
      r.assignedSpeaker.trim() &&
      !r.assignedSpeaker.toLowerCase().includes('tbd') &&
      !r.assignedSpeaker.toLowerCase().includes('not assigned')
    );

    const busyLecturerNames = activeRequests.map(r => r.assignedSpeaker.toLowerCase());

    const available = lecturers.filter(lecturer => {
      const lecName = lecturer.name.trim().toLowerCase();
      const isAlreadyAssigned = busyLecturerNames.some(busy => busy.includes(lecName));
      return !isAlreadyAssigned;
    });

    if (!tradeName) return available;
    const lowerTrade = tradeName.toLowerCase();
    const tradeMatches = available.filter(l => {
      const tradeField = (l.trade || '').toLowerCase();
      const keywords = l.tradeKeywords || [];
      return lowerTrade.includes(tradeField) ||
        tradeField.includes(lowerTrade) ||
        keywords.some(kw => lowerTrade.includes(kw.toLowerCase()));
    });

    return tradeMatches.length > 0 ? tradeMatches : available;
  };

  const handleCreateRequest = async (formData) => {
    try {
      const fullRecord = {
        ...formData,
        trade: trainerData.trade || formData.trade,
        vtName: trainerData.vtName || formData.vtName,
        vtMobile: trainerData.vtMobile || formData.vtMobile,
      };

      const created = await api.createRequest(fullRecord);
      setRequests(prev => [created, ...prev]);
      
      // Joyful celebratory confetti for the user!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti is purely decorative
      }

      showToast(`Guest Lecture Request ${created.id} submitted successfully!`, 'success');
      setIsLectureModalOpen(false);
      return { success: true, data: created };
    } catch (err) {
      showToast('Error submitting request. Please check your inputs.', 'error');
      return { success: false, error: err.message };
    }
  };

  const handleUpdateStatus = async (id, status, assignedSpeaker) => {
    try {
      const updated = await api.updateRequestStatus(id, status, assignedSpeaker);
      setRequests(prev => prev.map(r => r.id === id ? updated : r));
      showToast(`Request ${id} marked as "${status}"`, 'info');
      return { success: true };
    } catch (err) {
      showToast('Failed to update status', 'error');
      return { success: false };
    }
  };

  // Open modal to assign speaker (either independently or during approval)
  const openAssignModal = (request, action = 'assign') => {
    setSelectedRequestForAssignment(request);
    setAssignModalAction(action);
    setIsAssignModalOpen(true);
  };

  const handleAssignLecturer = async (requestId, assignedSpeaker, newStatus = null) => {
    try {
      const updated = await api.assignLecturer(requestId, assignedSpeaker, newStatus);
      setRequests(prev => prev.map(r => r.id === requestId ? updated : r));
      if (newStatus === 'Approved') {
        showToast(`Request ${requestId} approved & assigned to "${assignedSpeaker}"`, 'success');
      } else {
        showToast(`Guest Lecturer assigned: "${assignedSpeaker}"`, 'success');
      }
      setIsAssignModalOpen(false);
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Failed to assign guest lecturer', 'error');
      return { success: false };
    }
  };

  // Compute dynamic notifications for Admin:
  // 1. Upcoming GL with no lecturer assigned (Urgent)
  // 2. Approved GL with no lecturer assigned
  // 3. Upcoming confirmed GL
  // 4. New GL awaiting approval
  const getAdminNotifications = () => {
    const list = [];
    const today = new Date();

    requests.forEach(req => {
      const speakerStr = req.assignedSpeaker ? req.assignedSpeaker.trim() : '';
      const hasSpeaker = speakerStr.length > 0 && 
        !speakerStr.toLowerCase().includes('tbd') && 
        !speakerStr.toLowerCase().includes('not assigned');
      
      const reqDateStr = req.lectureDate || req.proposedDate;
      let isUpcomingSoon = false;
      let daysAway = null;

      if (reqDateStr) {
        const d = new Date(reqDateStr);
        if (!isNaN(d.getTime())) {
          const diffTime = d.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // If within 10 days
          if (diffDays >= -1 && diffDays <= 10) {
            isUpcomingSoon = true;
            daysAway = diffDays;
          }
        }
      }

      // Check condition A: Upcoming within 10 days AND lecturer is NOT assigned (URGENT)
      if (isUpcomingSoon && !hasSpeaker && req.status !== 'Rejected') {
        list.push({
          id: `urgent-unassigned-${req.id}`,
          type: 'urgent',
          badge: daysAway <= 0 ? 'Today / Overdue' : `In ${daysAway} days`,
          title: '⚠️ Urgent: Lecturer Not Assigned',
          message: `${req.schoolName} (${req.trade}) is upcoming on ${reqDateStr || 'soon'}, but has NO lecturer assigned.`,
          requestId: req.id,
          request: req,
          action: 'assign'
        });
      }

      // Check condition B: Approved, but Lecturer is NOT assigned (HIGH PRIORITY)
      else if (req.status === 'Approved' && !hasSpeaker) {
        list.push({
          id: `approved-no-speaker-${req.id}`,
          type: 'warning',
          badge: 'Lecturer Missing',
          title: 'Approved GL Needs Lecturer',
          message: `${req.schoolName} (${req.trade}) is approved, but lecturer is yet to be assigned.`,
          requestId: req.id,
          request: req,
          action: 'assign'
        });
      }

      // Check condition C: Upcoming Confirmed Lecture
      else if (isUpcomingSoon && hasSpeaker && req.status === 'Approved') {
        list.push({
          id: `upcoming-confirmed-${req.id}`,
          type: 'info',
          badge: daysAway <= 0 ? 'Today' : `In ${daysAway} days`,
          title: 'Upcoming Confirmed Lecture',
          message: `${req.schoolName} on ${reqDateStr}. Assigned: ${req.assignedSpeaker}`,
          requestId: req.id,
          request: req,
          action: 'view'
        });
      }

      // Check condition D: Pending Requisition Awaiting Approval
      else if (req.status === 'Pending') {
        list.push({
          id: `pending-${req.id}`,
          type: 'pending',
          badge: 'Pending Review',
          title: 'New GL Requisition',
          message: `${req.schoolName} (${req.trade}) submitted by ${req.vtName}.`,
          requestId: req.id,
          request: req,
          action: 'review'
        });
      }
    });

    return list.filter(n => !dismissedNotificationIds.includes(n.id));
  };

  const dismissNotification = (id) => {
    setDismissedNotificationIds(prev => [...prev, id]);
  };

  const clearAllNotifications = () => {
    const allIds = getAdminNotifications().map(n => n.id);
    setDismissedNotificationIds(prev => [...new Set([...prev, ...allIds])]);
  };

  // Unified Role-based Login (VT / Admin)
  const handleLogin = async (username, password) => {
    const res = await api.login(username, password);
    if (res.success) {
      setCurrentUser(res.user);
      setIsLoginModalOpen(false);

      if (res.user.role === 'ADMIN') {
        setActiveView('admin');
        setCurrentTab('dashboard');
        showToast(`Welcome, State Administrator: ${res.user.name}`, 'success');
      } else if (res.user.role === 'VT') {
        setActiveView('home');
        setCurrentTab('home');
        setTrainerData({
          trade: res.user.trade || '',
          vtName: res.user.name || '',
          vtMobile: res.user.mobile || ''
        });
        showToast(`Welcome, Vocational Trainer: ${res.user.name}`, 'success');
      }

      return { success: true, user: res.user };
    } else {
      showToast(res.message || 'Login failed', 'error');
      return { success: false, message: res.message };
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setActiveView('home');
    setCurrentTab('home');
    showToast('Logged out successfully', 'info');
  };

  // Derived properties
  const adminUser = currentUser?.role === 'ADMIN' ? currentUser : null;
  const vtUser = currentUser?.role === 'VT' ? currentUser : null;

  return (
    <LectureContext.Provider
      value={{
        requests,
        loading,
        currentUser,
        adminUser,
        vtUser,
        activeView,
        setActiveView,
        currentTab,
        setCurrentTab,
        isLectureModalOpen,
        setIsLectureModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isAdminLoginModalOpen: isLoginModalOpen,
        setIsAdminLoginModalOpen: setIsLoginModalOpen,
        isAskModalOpen,
        setIsAskModalOpen,
        selectedRequestForView,
        setSelectedRequestForView,
        // Lecturer Assignment state & helpers
        isAssignModalOpen,
        setIsAssignModalOpen,
        selectedRequestForAssignment,
        setSelectedRequestForAssignment,
        assignModalAction,
        openAssignModal,
        assignLecturer: handleAssignLecturer,
        // Guest Lecturers Database & Management
        lecturers,
        isAddLecturerModalOpen,
        setIsAddLecturerModalOpen,
        addLecturer: handleAddLecturer,
        getAvailableLecturers,
        loadLecturers,
        // Admin Notifications state & helpers
        isNotificationOpen,
        setIsNotificationOpen,
        getAdminNotifications,
        dismissNotification,
        clearAllNotifications,
        trainerData,
        setTrainerData,
        toast,
        showToast,
        createRequest: handleCreateRequest,
        updateRequestStatus: handleUpdateStatus,
        login: handleLogin,
        logout: handleLogout,
        loginAdmin: handleLogin,
        logoutAdmin: handleLogout,
        refreshRequests: loadRequests
      }}
    >
      {children}
    </LectureContext.Provider>
  );
}

export function useLecture() {
  const ctx = useContext(LectureContext);
  if (!ctx) {
    throw new Error('useLecture must be used within a LectureProvider');
  }
  return ctx;
}

