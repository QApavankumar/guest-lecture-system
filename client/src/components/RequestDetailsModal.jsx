import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  X, 
  School, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Printer, 
  UserPlus,
  Clock
} from 'lucide-react';

export default function RequestDetailsModal() {
  const { 
    selectedRequestForView, 
    setSelectedRequestForView, 
    updateRequestStatus,
    adminUser 
  } = useLecture();

  const [speakerInput, setSpeakerInput] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  if (!selectedRequestForView) return null;

  const req = selectedRequestForView;

  const handleStatusChange = (newStatus) => {
    updateRequestStatus(req.id, newStatus, speakerInput || req.assignedSpeaker);
    setSelectedRequestForView(prev => ({
      ...prev,
      status: newStatus,
      ...(speakerInput ? { assignedSpeaker: speakerInput } : {})
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (st) => {
    switch (st) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-modal my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-tg-green text-amber-300">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-bold">Requisition Details</h3>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {req.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">TG Samagra Shiksha Vocational Wing</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedRequestForView(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-left">
          {/* Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Current Status:</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(req.status)}`}>
                {req.status}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Submitted: {new Date(req.submittedAt).toLocaleDateString('en-GB')}</span>
            </div>
          </div>

          {/* School & Location Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <School className="w-4 h-4 text-tg-green" /> School Details
              </h4>
              <p className="text-sm font-bold text-slate-900">{req.schoolName}</p>
              <p className="text-xs font-mono text-tg-green mt-1 font-semibold">
                UDISE Code: {req.udiseCode}
              </p>
              <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{req.village}, {req.mandal}, {req.district} Dist.</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-tg-green" /> Trainer Information
              </h4>
              <p className="text-sm font-bold text-slate-900">{req.vtName}</p>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> +91 {req.vtMobile}
              </p>
              <p className="text-xs text-emerald-800 font-semibold mt-2 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                {req.trade}
              </p>
            </div>
          </div>

          {/* Lecture Requirements */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-tg-green" /> Session Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Proposed Lecture Date:</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
                  {req.lectureDate}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Assigned Speaker / Expert:</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {req.assignedSpeaker || <span className="text-slate-400 italic">Not assigned yet</span>}
                </p>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-xs text-slate-500">Topic / Core Focus:</span>
              <p className="text-sm font-medium text-slate-800 mt-0.5 bg-slate-100 p-2.5 rounded-lg">
                {req.topic || 'Industry overview session'}
              </p>
            </div>

            {req.notes && (
              <div>
                <span className="text-xs text-slate-500">Additional Remarks / Lab Requirements:</span>
                <p className="text-xs text-slate-700 mt-0.5 italic">
                  "{req.notes}"
                </p>
              </div>
            )}
          </div>

          {/* Admin Actions (if user is admin) */}
          {adminUser && (
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Administrative Action Controls:
                </span>
                <button
                  type="button"
                  onClick={() => setIsAssigning(!isAssigning)}
                  className="text-xs font-bold text-tg-green hover:underline flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {isAssigning ? 'Cancel' : 'Assign Resource Person'}
                </button>
              </div>

              {isAssigning && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={speakerInput}
                    onChange={(e) => setSpeakerInput(e.target.value)}
                    placeholder="Enter industry speaker / faculty name & org"
                    className="grow text-xs rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <button
                    onClick={() => {
                      if (speakerInput.trim()) {
                        handleStatusChange('Approved');
                        setIsAssigning(false);
                      }
                    }}
                    className="px-3 py-1.5 bg-tg-green text-white text-xs font-bold rounded-lg"
                  >
                    Save & Approve
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => handleStatusChange('Approved')}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve Request</span>
                </button>
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Request</span>
                </button>
                <button
                  onClick={() => handleStatusChange('Completed')}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Mark as Completed</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Requisition Sheet</span>
            </button>
            <button
              onClick={() => setSelectedRequestForView(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

