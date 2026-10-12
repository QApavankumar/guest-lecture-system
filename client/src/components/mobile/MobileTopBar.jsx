import React from 'react';
import { useLecture } from '../../context/LectureContext';
import { School, LogOut, MessageCircle, Shield, UserCheck, Bell } from 'lucide-react';

export default function MobileTopBar() {
  const { 
    currentUser, 
    logout, 
    setIsAskModalOpen, 
    getAdminNotifications, 
    setIsNotificationOpen 
  } = useLecture();

  const isAdmin = currentUser?.role === 'ADMIN';
  const notifications = isAdmin ? getAdminNotifications() : [];
  const urgentCount = notifications.length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top tiny status strip */}
      <div className="bg-tg-green text-[10px] py-1 px-4 flex justify-between items-center text-emerald-100 font-medium">
        <span>GOVT OF TELANGANA • SAMAGRA SHIKSHA</span>
        <span className="text-amber-300 font-bold">NSQF VOCATIONAL</span>
      </div>

      {/* Main bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-tg-green flex items-center justify-center text-white border border-amber-300/40 shadow-xs">
            <School className="w-4 h-4 text-amber-300" />
          </div>
          <div className="text-left leading-tight">
            <h1 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
              TG Guest Lecture
            </h1>
            <p className="text-[10px] text-emerald-400 font-medium">
              Vocational Education Cell
            </p>
          </div>
        </div>

        {/* User Pill & Quick Actions */}
        <div className="flex items-center space-x-2">
          {currentUser && (
            <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700 px-2 py-1 rounded-xl">
              {isAdmin ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-bold text-amber-300">Admin</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-bold text-emerald-300 truncate max-w-[90px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Admin Notification Bell */}
          {isAdmin ? (
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition relative cursor-pointer"
              title="Admin Notifications & Lecturer Alerts"
            >
              <Bell className="w-4 h-4" />
              {urgentCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-rose-600 text-white text-[9px] font-extrabold shadow-xs">
                    {urgentCount}
                  </span>
                </span>
              )}
            </button>
          ) : (
            /* VT WhatsApp query button */
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="p-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 transition cursor-pointer"
              title="Ask Admin on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </button>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>
    </header>
  );
}

