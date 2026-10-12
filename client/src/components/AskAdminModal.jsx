import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  X, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  User, 
  Phone, 
  Briefcase,
  ExternalLink
} from 'lucide-react';

export default function AskAdminModal() {
  const { 
    isAskModalOpen, 
    setIsAskModalOpen, 
    trainerData, 
    showToast 
  } = useLecture();

  const [queryCategory, setQueryCategory] = useState('Guest Lecture Approval');
  const [customMessage, setCustomMessage] = useState('');
  const [sentPreview, setSentPreview] = useState(false);

  if (!isAskModalOpen) return null;

  // Designated State Admin WhatsApp Helpline Number
  const ADMIN_WHATSAPP_NUMBER = '919440123456'; 

  const constructWhatsAppMessage = () => {
    const name = trainerData.vtName || 'Vocational Trainer';
    const mobile = trainerData.vtMobile || 'Not provided';
    const trade = trainerData.trade || 'Vocational Trade';
    const detail = customMessage.trim() || 'Seeking assistance regarding guest lecture planning.';

    return `*TG Samagra Shiksha - Guest Lecture Query*\n\n` +
      `👤 *VT Name:* ${name}\n` +
      `📞 *VT Mobile:* ${mobile}\n` +
      `💼 *Trade:* ${trade}\n` +
      `📌 *Subject:* ${queryCategory}\n` +
      `💬 *Query:* ${detail}\n\n` +
      `_Sent from TG Samagra Shiksha Guest Lecture Portal_`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const formattedMsg = constructWhatsAppMessage();
    const waUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMsg)}`;
    
    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
    setSentPreview(true);
    showToast('Opening WhatsApp to notify Admin with your query', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-modal my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-tg-green text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-emerald-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Ask Admin via WhatsApp
              </h3>
              <p className="text-xs text-emerald-100">
                Direct query notification to State Vocational Admin
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAskModalOpen(false);
              setSentPreview(false);
            }}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSendWhatsApp} className="p-6 space-y-4 text-left">
          <p className="text-xs text-slate-600">
            Submit your doubt or request assistance regarding speaker allocation, dates, or honorarium. Clicking the button below immediately sends a WhatsApp notification to the Vocational State Admin.
          </p>

          {/* Trainer Quick Summary Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-tg-green" /> VT Name:
              </span>
              <span className="font-semibold text-slate-900">{trainerData.vtName || 'Not entered yet'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-tg-green" /> VT Mobile:
              </span>
              <span className="font-mono font-semibold text-slate-900">{trainerData.vtMobile || 'Not entered yet'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-tg-green" /> Trade:
              </span>
              <span className="font-semibold text-tg-green">{trainerData.trade || 'Not selected'}</span>
            </div>
          </div>

          {/* Query Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Query Topic / Category
            </label>
            <select
              value={queryCategory}
              onChange={(e) => setQueryCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition cursor-pointer"
            >
              <option value="Guest Lecture Approval">Guest Lecture Approval & Review</option>
              <option value="Speaker Allocation Request">Industry Speaker / Resource Person Help</option>
              <option value="Date Reschedule">Date Reschedule or Postponement</option>
              <option value="Syllabus & Lab Setup Guidance">Syllabus & Equipment Guidelines</option>
              <option value="Honorarium & TA/DA Query">Speaker Honorarium & TA/DA Queries</option>
              <option value="Other Query">Other Question</option>
            </select>
          </div>

          {/* Specific Query Details */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Question / Message to Admin
            </label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="e.g. Please approve our request for IT guest lecture or provide certified speaker contacts in Medchal mandal."
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition resize-none"
            ></textarea>
          </div>

          {/* Simulated WhatsApp Preview */}
          <div className="bg-emerald-900/5 rounded-xl border border-emerald-300/40 p-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 mb-1.5">
              <span>Admin WhatsApp Notification Preview:</span>
              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">
                Target: +91 94401 23456
              </span>
            </div>
            <div className="bg-[#e2f7cb] border border-[#b8e29a] rounded-lg p-2.5 text-xs text-slate-800 font-sans shadow-2xs space-y-1">
              <p className="font-bold text-slate-900">TG Samagra Shiksha - Guest Lecture Query</p>
              <p><span className="font-semibold">VT:</span> {trainerData.vtName || 'Trainer'} ({trainerData.vtMobile || 'Mobile'})</p>
              <p><span className="font-semibold">Trade:</span> {trainerData.trade || 'Vocational Trade'}</p>
              <p><span className="font-semibold">Subject:</span> {queryCategory}</p>
              <p className="italic text-slate-700">"{customMessage.trim() || 'Seeking assistance regarding guest lecture planning.'}"</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsAskModalOpen(false)}
              className="w-1/3 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send WhatsApp Notification</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

