import React, { useState, useEffect } from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  X, 
  UserCheck, 
  Building2, 
  Phone, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Sparkles,
  UserPlus
} from 'lucide-react';

export default function AssignLecturerModal() {
  const { 
    isAssignModalOpen, 
    setIsAssignModalOpen, 
    selectedRequestForAssignment, 
    assignModalAction, 
    assignLecturer,
    getAvailableLecturers,
    setIsAddLecturerModalOpen
  } = useLecture();

  const req = selectedRequestForAssignment;

  const [selectedLecturerId, setSelectedLecturerId] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customOrg, setCustomOrg] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Dynamic available lecturers filtered to trade and excluding already assigned/booked lecturers!
  const availableLecturers = req ? getAvailableLecturers(req.trade, req.id) : [];

  useEffect(() => {
    if (req) {
      setError('');
      setIsCustom(false);
      setCustomName('');
      setCustomOrg('');
      setCustomPhone('');

      // If already has an assigned speaker, check if it matches an available lecturer or custom
      if (req.assignedSpeaker && req.assignedSpeaker.trim()) {
        const found = availableLecturers.find(l => req.assignedSpeaker.includes(l.name));
        if (found) {
          setSelectedLecturerId(found.id);
        } else {
          setIsCustom(true);
          setCustomName(req.assignedSpeaker);
          setSelectedLecturerId('custom');
        }
      } else {
        // Pre-select the first available lecturer if any exist
        if (availableLecturers.length > 0) {
          setSelectedLecturerId(availableLecturers[0].id);
        } else {
          setSelectedLecturerId('custom');
          setIsCustom(true);
        }
      }
    }
  }, [req, isAssignModalOpen]);

  if (!isAssignModalOpen || !req) return null;

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedLecturerId(val);
    if (val === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
  };

  const handleSave = async (shouldApprove = false) => {
    setError('');
    let finalSpeakerString = '';

    if (isCustom) {
      if (!customName.trim()) {
        setError('Please enter the Guest Lecturer name.');
        return;
      }
      finalSpeakerString = `${customName.trim()}${customOrg.trim() ? ` (${customOrg.trim()})` : ''}${customPhone.trim() ? ` • ${customPhone.trim()}` : ''}`;
    } else {
      const selected = availableLecturers.find(l => l.id === selectedLecturerId);
      if (!selected) {
        setError('Please select an available verified lecturer or choose custom.');
        return;
      }
      finalSpeakerString = `${selected.name} (${selected.organization}${selected.phone ? ` • ${selected.phone}` : ''})`;
    }

    setIsSubmitting(true);
    let newStatus = null;
    if (shouldApprove) {
      newStatus = 'Approved';
    } else if (req.status === 'Pending' && assignModalAction === 'approve_and_assign') {
      newStatus = 'Approved';
    }

    await assignLecturer(req.id, finalSpeakerString, newStatus);
    setIsSubmitting(false);
  };

  const handleApproveWithoutSpeaker = async () => {
    setIsSubmitting(true);
    await assignLecturer(req.id, 'TBD (To Be Assigned)', 'Approved');
    setIsSubmitting(false);
  };

  const isPending = req.status === 'Pending';
  const isApproveFlow = assignModalAction === 'approve_and_assign';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-modal text-left">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-tg-green/30 border border-tg-green/50 flex items-center justify-center text-amber-300">
              <UserCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isPending ? 'Approve & Assign Guest Lecturer' : 'Assign / Edit Guest Lecturer'}
              </h3>
              <p className="text-[11px] text-emerald-300">
                Requisition {req.id} • {req.district}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAssignModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Requisition Brief Summary */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">{req.schoolName}</span>
            <div className="flex items-center space-x-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {req.status}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {req.trade}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span>Trainer: <strong className="text-slate-700">{req.vtName}</strong></span>
            <span>•</span>
            <span>Date: <strong className="text-slate-700">{req.lectureDate || req.proposedDate || 'TBD'}</strong></span>
          </div>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Lecturer Selection Dropdown & Add Button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Available Guest Lecturer
              </label>
              <button
                type="button"
                onClick={() => setIsAddLecturerModalOpen(true)}
                className="text-[11px] font-bold text-tg-green hover:text-emerald-700 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Register New Lecturer</span>
              </button>
            </div>

            <select
              value={selectedLecturerId}
              onChange={handleSelectChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition font-medium"
            >
              {availableLecturers.length > 0 ? (
                availableLecturers.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.organization} ({l.designation})
                  </option>
                ))
              ) : (
                <option value="" disabled>No available unassigned lecturers for this trade</option>
              )}
              <option value="custom">➕ Enter Custom / Other Guest Lecturer...</option>
            </select>

            <p className="text-[10px] text-slate-500 mt-1">
              * Note: Lecturers already assigned to active sessions are automatically excluded from this dropdown to prevent double-booking.
            </p>
          </div>

          {/* Custom Input Form (Visible if custom selected) */}
          {isCustom && (
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Custom Guest Lecturer Details</span>
              </p>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Lecturer Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Dr. K. Anand Kumar"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-300 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={customOrg}
                    onChange={(e) => setCustomOrg(e.target.value)}
                    placeholder="e.g. Apollo / TCS / PJTSAU"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-300 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="e.g. 9849012345"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-300 outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons: Supporting Assign Before Approval OR After Approval */}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {isPending ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSave(true)}
                className="w-full py-3 px-4 rounded-xl bg-tg-green hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-75"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Assign Lecturer</span>
              </button>
            ) : (
              /* If already Approved: Save / Update Assigned Lecturer */
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSave(false)}
                className="w-full py-3 px-4 rounded-xl bg-tg-green hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-75"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Assigned Lecturer</span>
              </button>
            )}

            <div className="flex items-center justify-between gap-2 pt-1">
              {isPending && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleApproveWithoutSpeaker}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
                  title="Approve now, lecturer can be assigned later"
                >
                  Approve (Assign Later)
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="ml-auto py-2 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

