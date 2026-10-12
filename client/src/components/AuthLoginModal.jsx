import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  X, 
  Shield, 
  UserCheck, 
  KeyRound, 
  AlertCircle, 
  School, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function AuthLoginModal() {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    login 
  } = useLecture();

  const [username, setUsername] = useState('vt');
  const [password, setPassword] = useState('vt123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  // Auto-detection of role based on input
  const normalizedUser = username.trim().toLowerCase();
  const isVtDetected = normalizedUser.startsWith('vt') || normalizedUser.includes('trainer');
  const isAdminDetected = normalizedUser.startsWith('admin') || normalizedUser.includes('state');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login(username, password);
    setIsSubmitting(false);
    if (!res.success) {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleSelectRoleDemo = (role) => {
    setError('');
    if (role === 'vt') {
      setUsername('vt');
      setPassword('vt123');
    } else {
      setUsername('admin');
      setPassword('admin123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/65 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-modal">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-tg-green/30 border border-tg-green/50 flex items-center justify-center text-amber-300 font-bold">
              <School className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold leading-tight">
                Single Sign-On Portal
              </h3>
              <p className="text-[11px] text-emerald-300 font-medium">
                TG Samagra Shiksha • Vocational Education
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Role Autofill Selectors */}
        <div className="bg-slate-50 border-b border-slate-200/80 p-3 sm:px-6">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Select Role Demo:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSelectRoleDemo('vt')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                isVtDetected 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-200 shadow-2xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>VT (vt / vt123)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRoleDemo('admin')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                isAdminDetected 
                  ? 'bg-slate-900 border-slate-800 text-white ring-2 ring-slate-400 shadow-2xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin (admin / admin123)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Auto-detected role banner */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Detected Role:</span>
            {isVtDetected ? (
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                Vocational Trainer (VT)
              </span>
            ) : isAdminDetected ? (
              <span className="inline-flex items-center gap-1.5 font-bold text-slate-900">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                State Administrator
              </span>
            ) : (
              <span className="text-slate-400 italic">Auto-detecting...</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Username / ID
            </label>
            <input
              type="text"
              id="auth-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. vt or admin"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              id="auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition font-medium"
            />
          </div>

          {/* Role access destination helper note */}
          <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200/70 rounded-xl p-3 space-y-1">
            <p className="font-semibold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Role Navigation Flow:
            </p>
            <p>
              • <strong>VT Login:</strong> Lands on Home page with request access & pre-filled profile.
            </p>
            <p>
              • <strong>Admin Login:</strong> Lands directly on Guest Lecture Requisitions & Status Board.
            </p>
          </div>

          <div className="pt-2">
            <button
              id="submit-auth-login"
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer ${
                isAdminDetected
                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>
                    {isVtDetected 
                      ? 'Sign In as Vocational Trainer (VT)' 
                      : isAdminDetected 
                      ? 'Sign In as State Administrator' 
                      : 'Sign In to Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

