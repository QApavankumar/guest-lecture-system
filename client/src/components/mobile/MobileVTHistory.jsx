import React, { useState } from 'react';
import { useLecture } from '../../context/LectureContext';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  School, 
  Calendar, 
  User, 
  ChevronRight, 
  Filter,
  PlusCircle
} from 'lucide-react';

export default function MobileVTHistory() {
  const { requests, setSelectedRequestForView, setCurrentTab } = useLecture();
  const [filter, setFilter] = useState('All');

  const filtered = requests.filter(r => {
    if (filter === 'All') return true;
    return r.status === filter;
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
    <div className="p-4 space-y-4 pb-24 text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">My Requests</h2>
          <p className="text-xs text-slate-500">Track requisition status & speaker assignments</p>
        </div>
        <button
          onClick={() => setCurrentTab('request')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-tg-green text-white text-xs font-bold shadow-xs hover:bg-emerald-700 transition cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New</span>
        </button>
      </div>

      {/* Filter Chips */}
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
            {status}
          </button>
        ))}
      </div>

      {/* Requests Card List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-400 space-y-3">
            <Clock className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No requests found</p>
            <p className="text-xs text-slate-400">
              Submit your first guest lecture requisition to see it tracked here.
            </p>
            <button
              onClick={() => setCurrentTab('request')}
              className="mt-2 px-4 py-2 rounded-xl bg-tg-green text-white text-xs font-bold shadow-xs inline-block"
            >
              Request Lecture Now
            </button>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequestForView(req)}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {req.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(req.status)}`}>
                  {req.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                {req.schoolName}
              </h4>
              <p className="text-xs text-tg-green font-semibold mt-0.5">
                {req.trade}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5 truncate">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{req.proposedDate || 'Date: TBD'}</span>
                </div>
                <div className="flex items-center space-x-1.5 truncate justify-end">
                  <span className="text-slate-400">District:</span>
                  <span className="font-semibold text-slate-700">{req.district}</span>
                </div>
              </div>

              {req.assignedSpeaker && (
                <div className="mt-2 bg-emerald-50 rounded-xl p-2 text-[11px] text-emerald-900 flex items-center justify-between">
                  <span className="font-semibold">Speaker: {req.assignedSpeaker}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

