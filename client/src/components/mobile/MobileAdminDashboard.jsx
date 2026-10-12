import React, { useState } from 'react';
import { useLecture } from '../../context/LectureContext';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Users, 
  School, 
  ArrowRight, 
  ShieldCheck, 
  Filter, 
  AlertCircle,
  UserCheck,
  UserPlus,
  Building2,
  Phone,
  Briefcase,
  Bell,
  Sparkles
} from 'lucide-react';

export default function MobileAdminDashboard() {
  const { 
    requests, 
    updateRequestStatus, 
    setSelectedRequestForView, 
    setCurrentTab,
    openAssignModal,
    lecturers,
    setIsAddLecturerModalOpen,
    getAdminNotifications,
    setIsNotificationOpen,
    getAvailableLecturers
  } = useLecture();

  const [lecturerSearch, setLecturerSearch] = useState('');
  const [selectedTradeFilter, setSelectedTradeFilter] = useState('All');

  const total = requests.length;
  const pending = requests.filter(r => r.status === 'Pending');
  const approved = requests.filter(r => r.status === 'Approved');

  // Compute notifications count
  const notifications = getAdminNotifications();
  const urgentCount = notifications.length;

  // Active assigned lecturer names across active requests
  const activeAssignedNames = requests
    .filter(r => r.status !== 'Rejected' && r.status !== 'Completed' && r.assignedSpeaker && !r.assignedSpeaker.toLowerCase().includes('tbd'))
    .map(r => r.assignedSpeaker.toLowerCase());

  // Filtered lecturers for the Directory preview
  const filteredLecturers = lecturers.filter(l => {
    const matchesTrade = selectedTradeFilter === 'All' || l.trade.toLowerCase().includes(selectedTradeFilter.toLowerCase());
    const matchesSearch = 
      l.name.toLowerCase().includes(lecturerSearch.toLowerCase()) ||
      l.organization.toLowerCase().includes(lecturerSearch.toLowerCase()) ||
      l.trade.toLowerCase().includes(lecturerSearch.toLowerCase());
    return matchesTrade && matchesSearch;
  });

  return (
    <div className="p-4 space-y-4 pb-24 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-5 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full inline-block">
            State Administrative Dashboard
          </span>

          {urgentCount > 0 && (
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="flex items-center space-x-1 bg-rose-500/20 border border-rose-400/30 text-rose-300 px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer animate-pulse"
            >
              <Bell className="w-3 h-3 text-rose-400" />
              <span>{urgentCount} Alerts</span>
            </button>
          )}
        </div>

        <h2 className="text-xl font-extrabold text-white">
          Guest Lecture Management
        </h2>
        <p className="text-xs text-emerald-200/80 mt-1">
          33 Districts • 500+ NSQF Schools • Academic Year 2025-26
        </p>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
          <div 
            onClick={() => setCurrentTab('requisitions')}
            className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs cursor-pointer active:scale-95 transition"
          >
            <div className="flex items-center space-x-1.5 text-amber-300 text-[11px] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Pending</span>
            </div>
            <p className="text-2xl font-black text-white mt-1">{pending.length}</p>
          </div>

          <div 
            onClick={() => setCurrentTab('requisitions')}
            className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs cursor-pointer active:scale-95 transition"
          >
            <div className="flex items-center space-x-1.5 text-emerald-300 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approved</span>
            </div>
            <p className="text-2xl font-black text-white mt-1">{approved.length}</p>
          </div>
        </div>
      </div>

      {/* Urgent Action: Pending Requisitions with Quick Assign & Approve */}
      {pending.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Awaiting Action ({pending.length})</span>
            </h3>
            <button
              onClick={() => setCurrentTab('requisitions')}
              className="text-xs font-bold text-tg-green hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {pending.slice(0, 3).map((req) => {
              const hasLecturer = req.assignedSpeaker && 
                !req.assignedSpeaker.toLowerCase().includes('tbd') &&
                !req.assignedSpeaker.toLowerCase().includes('not assigned');

              return (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-3.5 border border-amber-200/80 shadow-2xs space-y-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {req.id}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      {hasLecturer ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Lecturer Assigned
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          No Lecturer Yet
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        Pending
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedRequestForView(req)}
                    className="cursor-pointer"
                  >
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {req.schoolName}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Trainer: <strong className="text-slate-700">{req.vtName}</strong> • {req.trade}
                    </p>
                    {hasLecturer && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 line-clamp-1">
                        Lecturer: {req.assignedSpeaker}
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons for Admin */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => updateRequestStatus(req.id, 'Rejected')}
                      className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold hover:bg-rose-100 transition cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => openAssignModal(req, 'approve_and_assign')}
                      className="px-3 py-1 rounded-xl bg-tg-green text-white text-[11px] font-bold shadow-xs hover:bg-emerald-700 transition cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Approve & Assign</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Guest Lecturers Management Section */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-tg-green" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Industry Guest Lecturers
              </h3>
              <p className="text-[11px] text-slate-500">
                {lecturers.length} Registered Experts Available for Assignment
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddLecturerModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-tg-green hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Lecturer</span>
          </button>
        </div>

        {/* Search in Dashboard Directory */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={lecturerSearch}
            onChange={(e) => setLecturerSearch(e.target.value)}
            placeholder="Search lecturer by name, company, trade..."
            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:ring-1 focus:ring-tg-green outline-hidden"
          />
        </div>

        {/* Quick Lecturer Cards (Top 3) */}
        <div className="space-y-2">
          {filteredLecturers.slice(0, 3).map((l) => {
            const isAssigned = activeAssignedNames.some(name => name.includes(l.name.toLowerCase()));

            return (
              <div
                key={l.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-left"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{l.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      {l.trade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {l.organization} • {l.designation}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.2 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{l.phone}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  {isAssigned ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      Booked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Available
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setCurrentTab('requisitions')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-emerald-300 transition text-left cursor-pointer"
        >
          <Users className="w-5 h-5 text-emerald-600 mb-1.5" />
          <p className="text-xs font-bold text-slate-900">All Requisitions</p>
          <p className="text-[11px] text-slate-500 mt-0.5">{total} total requests</p>
        </button>

        <button
          onClick={() => setCurrentTab('search')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-emerald-300 transition text-left cursor-pointer"
        >
          <School className="w-5 h-5 text-blue-600 mb-1.5" />
          <p className="text-xs font-bold text-slate-900">Search Schools</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Filter by UDISE code</p>
        </button>
      </div>
    </div>
  );
}

