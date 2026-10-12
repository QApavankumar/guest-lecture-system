import React from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  UserCheck, 
  Clock, 
  ArrowRight,
  Trash2
} from 'lucide-react';

export default function AdminNotificationDrawer() {
  const { 
    isNotificationOpen, 
    setIsNotificationOpen, 
    getAdminNotifications, 
    dismissNotification, 
    clearAllNotifications,
    openAssignModal,
    setSelectedRequestForView,
    setCurrentTab
  } = useLecture();

  if (!isNotificationOpen) return null;

  const notifications = getAdminNotifications();

  const handleNotificationAction = (n) => {
    setIsNotificationOpen(false);
    if (n.action === 'assign') {
      openAssignModal(n.request, 'assign');
    } else if (n.action === 'review') {
      openAssignModal(n.request, 'approve_and_assign');
    } else if (n.action === 'view') {
      setSelectedRequestForView(n.request);
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'urgent':
        return {
          bg: 'bg-rose-50 border-rose-200',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
          btn: 'bg-rose-600 hover:bg-rose-700 text-white'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
          btn: 'bg-amber-600 hover:bg-amber-700 text-white'
        };
      case 'info':
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
          btn: 'bg-emerald-700 hover:bg-emerald-800 text-white'
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
          btn: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-modal text-left flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Admin Notifications
              </h3>
              <p className="text-[11px] text-emerald-300">
                {notifications.length} active alert{notifications.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-[10px] text-slate-300 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                title="Dismiss all alerts"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">All caught up!</p>
              <p className="text-[11px] text-slate-400">
                No pending lecturer assignments or urgent lecture alerts at this time.
              </p>
            </div>
          ) : (
            notifications.map((n) => {
              const style = getAlertStyle(n.type);
              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border ${style.bg} space-y-2 relative transition hover:shadow-xs`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2">
                      {style.icon}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {n.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${style.badge}`}>
                      {n.badge}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                    <button
                      onClick={() => handleNotificationAction(n)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] shadow-2xs transition flex items-center gap-1 cursor-pointer ${style.btn}`}
                    >
                      <span>{n.action === 'assign' ? 'Assign Guest Lecturer' : n.action === 'review' ? 'Review & Approve' : 'View Lecture'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => dismissNotification(n.id)}
                      className="text-slate-400 hover:text-slate-600 p-1 text-[11px] font-medium"
                      title="Dismiss"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

