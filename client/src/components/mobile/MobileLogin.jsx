import React, { useState } from 'react';
import { useLecture } from '../../context/LectureContext';
import { 
  School, 
  User, 
  Lock, 
  ArrowRight, 
  Shield, 
  UserCheck, 
  Sparkles, 
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  PhoneCall
} from 'lucide-react';

export default function MobileLogin() {
  const { login } = useLecture();
  const [username, setUsername] = useState('vt');
  const [password, setPassword] = useState('vt123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSelectRole = (role) => {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white flex flex-col justify-between p-6 sm:p-8">
      {/* Decorative top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-tg-green/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header & Branding */}
      <div className="pt-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-tg-green p-0.5 shadow-xl shadow-emerald-900/50 mb-4 border border-amber-300/40">
          <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center">
            <School className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[11px] font-semibold text-emerald-300 mb-2">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Government of Telangana</span>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          TG Samagra Shiksha
        </h1>
        <p className="text-xs text-emerald-200/80 font-medium mt-1">
          Guest Lecture Management System • Vocational Education Cell
        </p>
      </div>

      {/* Center Card: Role Selector & Login Form */}
      <div className="my-auto py-6 relative z-10 w-full max-w-sm mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-3xl shadow-2xl text-left">
          
          {/* Role Pill Selector */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Login Role:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/25 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => handleSelectRole('vt')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isVtDetected
                    ? 'bg-gradient-to-r from-emerald-500 to-tg-green text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Trainer (VT)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isAdminDetected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-500/20 border border-rose-400/50 text-rose-200 px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Username / Mobile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="mobile-login-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. vt or admin"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="mobile-login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Helper */}
            <div className="text-[11px] text-emerald-200/80 bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-300">Quick Test: </span>
                <span>{isVtDetected ? 'vt / vt123' : 'admin / admin123'}</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectRole(isVtDetected ? 'vt' : 'admin')}
                className="text-[11px] font-bold text-amber-300 hover:underline"
              >
                Autofill
              </button>
            </div>

            {/* Submit Button */}
            <button
              id="mobile-login-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-tg-green hover:from-emerald-400 hover:to-emerald-600 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-900/40 transition active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>
                    {isVtDetected 
                      ? 'Sign In as Vocational Trainer' 
                      : isAdminDetected 
                      ? 'Sign In as State Administrator' 
                      : 'Sign In to Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Institutional Footer */}
      <div className="pb-4 relative z-10 text-center space-y-1 text-slate-400 text-[11px]">
        <p className="font-medium text-slate-300">
          Telangana State Educational System • NSQF Compliant
        </p>
        <p className="text-slate-500 text-[10px]">
          Helpline: 040-23232345 • SCERT Complex, Saifabad, Hyderabad
        </p>
      </div>
    </div>
  );
}

