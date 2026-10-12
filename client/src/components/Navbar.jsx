import React from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  Shield, 
  LayoutDashboard, 
  Home, 
  School, 
  CalendarPlus, 
  LogOut, 
  UserCheck, 
  LogIn 
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentUser, 
    adminUser, 
    vtUser, 
    activeView, 
    setActiveView, 
    setIsLoginModalOpen, 
    logout 
  } = useLecture();

  const handleNavClick = (view, anchorId) => {
    setActiveView(view);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top institutional strip */}
      <div className="bg-tg-green text-white text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center font-medium tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>GOVERNMENT OF TELANGANA • DEPARTMENT OF SCHOOL EDUCATION</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-emerald-100">
          <span>SAMAGRA SHIKSHA (VOCATIONAL CELL)</span>
          <span>•</span>
          <span className="text-amber-300 font-semibold">T-SAT & NSQF COMPLIANT</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand logo & title */}
        <div 
          onClick={() => setActiveView('home')}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-tg-green to-emerald-800 text-white flex items-center justify-center shadow-md border border-amber-400/50">
            <School className="w-6 h-6 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 leading-tight">
                TG GOVT EDUCATIONAL SYSTEM
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Samagra Shiksha
              </span>
            </div>
            <p className="text-xs font-semibold text-tg-green flex items-center gap-1.5">
              <span>Guest Lecture Management Portal</span>
            </p>
          </div>
        </div>

        {/* Center Nav Links (visible on desktop) */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs sm:text-sm font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-tg-green transition cursor-pointer ${
              activeView === 'home' ? 'text-tg-green font-bold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('home', 'about')}
            className="hover:text-tg-green transition cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('home', 'trades')}
            className="hover:text-tg-green transition cursor-pointer"
          >
            Vocational Trades
          </button>
          <button
            onClick={() => handleNavClick('home', 'workflow')}
            className="hover:text-tg-green transition cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveView('booking')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeView === 'booking'
                ? 'bg-emerald-100 text-emerald-900 font-bold'
                : 'text-slate-700 hover:text-tg-green'
            }`}
          >
            <CalendarPlus className="w-4 h-4 text-tg-green" />
            <span>Request Lecture</span>
          </button>
        </nav>

        {/* Action Controls & Role-Based Auth Button (Top Right) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {adminUser ? (
            /* Admin controls */
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                {activeView === 'admin' ? (
                  <>
                    <Home className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">View Website</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5 text-tg-green" />
                    <span>Status Board</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-white">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold">State Admin</span>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : vtUser ? (
            /* VT controls */
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-300/80 px-3 py-1.5 rounded-xl text-emerald-900">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold truncate max-w-[120px] sm:max-w-[160px]">{vtUser.name}</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Vocational Trainer</p>
                </div>
              </div>

              <button
                onClick={() => setActiveView('booking')}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-tg-green hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>New Request</span>
              </button>

              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            /* Unauthenticated User: Single Login Button */
            <button
              id="nav-unified-login-btn"
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition border border-slate-700 hover:shadow cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
