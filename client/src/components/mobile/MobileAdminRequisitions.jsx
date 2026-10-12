import React, { useState } from 'react';
import { useLecture } from '../../context/LectureContext';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Check, 
  X, 
  Eye, 
  Calendar,
  School,
  UserCheck,
  UserPlus
} from 'lucide-react';

export default function MobileAdminRequisitions() {
  const { 
    requests, 
    updateRequestStatus, 
    setSelectedRequestForView,
    openAssignModal,
    setIsAddLecturerModalOpen 
  } = useLecture();

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = requests.filter(r => {
    const matchesFilter = filter === 'All' || r.status === filter;
    const matchesSearch = 
      r.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      r.udiseCode.includes(search) ||
      r.vtName.toLowerCase().includes(search.toLowerCase()) ||
      r.district.toLowerCase().includes(search.toLowerCase()) ||
      (r.assignedSpeaker && r.assignedSpeaker.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="p-4 space-y-3 pb-24 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Lecture Requisitions</h2>
          <p className="text-xs text-slate-500">Review, assign guest lecturers & approve</p>
        </div>
        <button
          onClick={() => setIsAddLecturerModalOpen(true)}
          className="text-xs font-bold text-tg-green hover:text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Lecturer</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search school, UDISE, VT, lecturer, district..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-tg-green/30"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              filter === status
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {status} ({requests.filter(r => status === 'All' ? true : r.status === status).length})
          </button>
        ))}
      </div>

      {/* Card List */}
      <div className="space-y-3 pt-1">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-400">
            <Clock className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-semibold text-slate-600">No requisitions matching filter</p>
          </div>
        ) : (
          filtered.map((req) => {
            const hasLecturer = req.assignedSpeaker && 
              !req.assignedSpeaker.toLowerCase().includes('tbd') &&
              !req.assignedSpeaker.toLowerCase().includes('not assigned');

            const isPending = req.status === 'Pending';
            const isApproved = req.status === 'Approved';

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    {req.id}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {hasLecturer ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Lecturer Assigned
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Needs Lecturer
                      </span>
                    )}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedRequestForView(req)}
                  className="cursor-pointer"
                >
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {req.schoolName}
                  </h4>
                  <p className="text-xs text-tg-green font-semibold mt-0.5">
                    {req.trade}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-500 space-y-0.5">
                    <p>Trainer: <strong className="text-slate-700">{req.vtName}</strong> ({req.vtMobile})</p>
                    <p>District: {req.district} • Mandal: {req.mandal}</p>
                    <p>Proposed Date: <strong className="text-slate-700">{req.lectureDate || req.proposedDate || 'TBD'}</strong></p>
                  </div>

                  {/* Lecturer Info Banner on Card */}
                  <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      <UserCheck className={`w-3.5 h-3.5 shrink-0 ${hasLecturer ? 'text-tg-green' : 'text-slate-400'}`} />
                      <span className="text-[11px] text-slate-700 truncate font-medium">
                        {hasLecturer ? req.assignedSpeaker : 'No Lecturer assigned yet'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAssignModal(req, isPending ? 'assign' : 'assign');
                      }}
                      className="text-[10px] font-bold text-tg-green hover:underline shrink-0 ml-2 cursor-pointer"
                    >
                      {hasLecturer ? 'Change' : '+ Assign'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedRequestForView(req)}
                    className="text-xs font-bold text-slate-600 hover:text-tg-green flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  <div className="flex items-center space-x-1.5">
                    {req.status !== 'Rejected' && isPending && (
                      <button
                        onClick={() => updateRequestStatus(req.id, 'Rejected')}
                        className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
                      >
                        Reject
                      </button>
                    )}

                    {isPending ? (
                      <button
                        onClick={() => openAssignModal(req, 'approve_and_assign')}
                        className="px-3 py-1 rounded-xl bg-tg-green text-white text-xs font-bold shadow-xs hover:bg-emerald-700 transition cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Approve & Assign</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => openAssignModal(req, 'assign')}
                        className="px-3 py-1 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition cursor-pointer flex items-center gap-1"
                      >
                        <UserCheck className="w-3 h-3 text-amber-300" />
                        <span>{hasLecturer ? 'Edit Lecturer' : 'Assign Lecturer'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

