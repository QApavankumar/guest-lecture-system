import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { VOCATIONAL_TRADES } from '../data/trades';
import { 
  Briefcase, 
  User, 
  Phone, 
  CalendarDays, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ArrowRight
} from 'lucide-react';

export default function MainTrainerForm() {
  const { 
    trainerData, 
    setTrainerData, 
    setIsLectureModalOpen, 
    setIsAskModalOpen,
    setActiveView,
    setCurrentTab,
    showToast 
  } = useLecture();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateTrainerInfo = () => {
    const newErrors = {};
    if (!trainerData.trade) {
      newErrors.trade = 'Please select a vocational trade';
    }
    if (!trainerData.vtName.trim()) {
      newErrors.vtName = 'Vocational Trainer (VT) name is required';
    }
    if (!trainerData.vtMobile.trim()) {
      newErrors.vtMobile = 'VT 10-digit mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(trainerData.vtMobile.trim())) {
      newErrors.vtMobile = 'Enter a valid 10-digit Indian mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenLectureModal = () => {
    if (!validateTrainerInfo()) {
      showToast('Please fill in Trade, VT Name, and valid Mobile Number first', 'warning');
      return;
    }
    setIsLectureModalOpen(true);
  };

  const handleOpenAskModal = () => {
    setIsAskModalOpen(true);
  };

  return (
    <div className="w-full px-4 py-4 pb-28 text-left">
      {/* Back to Home Button */}
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => {
            if (setCurrentTab) setCurrentTab('home');
            setActiveView('home');
          }}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-tg-green bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
        >
          <span>← Back to Home</span>
        </button>
        <span className="text-[11px] font-semibold text-slate-400">Step 1 of 2: Trainer Info</span>
      </div>

      {/* Welcome & Directive Hero Banner */}
      <div className="mb-4 bg-gradient-to-r from-tg-green via-emerald-800 to-slate-900 rounded-2xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-emerald-200 mb-2">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Vocational Requisition</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
            Schedule Industry Lecture
          </h2>
          <p className="mt-1 text-xs text-emerald-100/90 leading-relaxed">
            Fill in your trainer details below, then proceed to select your school & schedule dates.
          </p>
        </div>
      </div>

      {/* Main Form Container - Directly matching user's Sketch 2 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
        {/* Card Header */}
        <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Vocational Trainer (VT) Identification
            </h3>
            <p className="text-xs text-slate-500">
              Enter your trade & contact credentials to request or enquire about guest lectures
            </p>
          </div>

          {/* User-specified "Ask" button repositioned seamlessly */}
          <button
            type="button"
            onClick={handleOpenAskModal}
            className="self-start sm:self-auto inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold transition hover:shadow-xs group"
            title="Send WhatsApp query to State Admin"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Ask Admin (WhatsApp)</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field 1: Select Trade */}
            <div className="md:col-span-2">
              <label htmlFor="trade" className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-tg-green" />
                  Select Trade <span className="text-rose-500">*</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">NSQF Vocational Stream</span>
              </label>
              <select
                id="trade"
                name="trade"
                value={trainerData.trade}
                onChange={handleChange}
                className={`w-full rounded-xl border ${
                  errors.trade ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-tg-green focus:ring-2 focus:ring-emerald-200'
                } bg-white px-4 py-3 text-sm text-slate-800 shadow-2xs outline-hidden transition cursor-pointer`}
              >
                <option value="">-- Choose Vocational Trade --</option>
                {VOCATIONAL_TRADES.map(trade => (
                  <option key={trade.id} value={trade.name}>
                    {trade.name} ({trade.code})
                  </option>
                ))}
              </select>
              {errors.trade && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.trade}</p>
              )}
            </div>

            {/* Field 2: VT Name */}
            <div>
              <label htmlFor="vtName" className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-tg-green" />
                VT Name (Vocational Trainer) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="vtName"
                name="vtName"
                value={trainerData.vtName}
                onChange={handleChange}
                placeholder="e.g. K. Sravan Kumar"
                className={`w-full rounded-xl border ${
                  errors.vtName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-tg-green focus:ring-2 focus:ring-emerald-200'
                } bg-white px-4 py-3 text-sm text-slate-800 shadow-2xs outline-hidden transition`}
              />
              {errors.vtName && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.vtName}</p>
              )}
            </div>

            {/* Field 3: VT Mobile */}
            <div>
              <label htmlFor="vtMobile" className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-tg-green" />
                  VT Mobile Number <span className="text-rose-500">*</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">10-digit number</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-400 pointer-events-none">
                  +91
                </span>
                <input
                  type="tel"
                  id="vtMobile"
                  name="vtMobile"
                  maxLength={10}
                  value={trainerData.vtMobile}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  className={`w-full rounded-xl border pl-12 ${
                    errors.vtMobile ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-tg-green focus:ring-2 focus:ring-emerald-200'
                  } bg-white px-4 py-3 text-sm text-slate-800 shadow-2xs outline-hidden transition`}
                />
              </div>
              {errors.vtMobile && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.vtMobile}</p>
              )}
            </div>
          </div>

          {/* Quick guidance note */}
          <div className="flex items-start space-x-3 bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <span>
              After entering your Trainer credentials, click the button below to select your School (UDISE Code) and schedule the preferred Guest Lecture date.
            </span>
          </div>

          {/* Main Action Button - Prominent CTA as sketched */}
          <div className="pt-2">
            <button
              id="open-lecture-modal-btn"
              type="button"
              onClick={handleOpenLectureModal}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-tg-green to-emerald-700 hover:from-tg-green-dark hover:to-tg-green text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 group active:scale-[0.99]"
            >
              <CalendarDays className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Click here for Guest Lecture</span>
              <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official Portal for TG Samagra Shiksha Vocational Schools</span>
          </div>
          <div className="text-slate-400">
            Helpline: 040-23232345 (10:00 AM - 5:00 PM)
          </div>
        </div>
      </div>
    </div>
  );
}

