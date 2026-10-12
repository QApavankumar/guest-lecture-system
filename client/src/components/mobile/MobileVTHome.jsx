import React from 'react';
import { useLecture } from '../../context/LectureContext';
import { VOCATIONAL_TRADES } from '../../data/trades';
import { 
  CalendarPlus, 
  ArrowRight, 
  School, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageCircle,
  HelpCircle,
  Building,
  UserCheck
} from 'lucide-react';

export default function MobileVTHome() {
  const { currentUser, setCurrentTab, requests, setIsAskModalOpen } = useLecture();

  // Filter requests for current VT (or demo requests)
  const myRequests = requests.filter(r => 
    r.vtName?.toLowerCase().includes('srikanth') || 
    r.vtMobile === '9849012345' || 
    r.udiseCode === '28120100101'
  );
  const myApproved = myRequests.filter(r => r.status === 'Approved');

  return (
    <div className="p-4 space-y-4 pb-24 text-left">
      {/* VT Welcome Card */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-5 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-tg-green/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Vocational Trainer (VT)</span>
            </span>
            <span className="text-[10px] text-slate-400">Telangana NSQF</span>
          </div>

          <h2 className="text-xl font-extrabold text-white leading-tight">
            {currentUser?.name || 'K. Srikanth Rao'}
          </h2>
          <p className="text-xs text-emerald-300 font-semibold mt-0.5">
            {currentUser?.trade || 'Information Technology (ITES)'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentUser?.schoolName || 'ZPHS Medchal High School'}</span>
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
            <div 
              onClick={() => setCurrentTab('history')}
              className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-xs cursor-pointer active:scale-95 transition"
            >
              <div className="flex items-center space-x-1.5 text-amber-300 text-[10px] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>My Requests</span>
              </div>
              <p className="text-xl font-black text-white mt-0.5">
                {myRequests.length || requests.length}
              </p>
            </div>

            <div 
              onClick={() => setCurrentTab('history')}
              className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-xs cursor-pointer active:scale-95 transition"
            >
              <div className="flex items-center space-x-1.5 text-emerald-300 text-[10px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approved</span>
              </div>
              <p className="text-xl font-black text-white mt-0.5">
                {myApproved.length || requests.filter(r => r.status === 'Approved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Banner: Request for Guest Lectures */}
      <div className="bg-gradient-to-r from-emerald-500 via-tg-green to-emerald-600 rounded-3xl p-5 text-slate-950 shadow-lg shadow-emerald-900/10 flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-1 mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-950 bg-white/30 px-2 py-0.5 rounded-full inline-block">
            Quick Action
          </span>
          <h3 className="text-lg font-black leading-tight text-slate-950">
            Request Guest Lecture
          </h3>
          <p className="text-xs text-slate-900 font-medium">
            Book industry experts, schedule sessions, and invite guest speakers to your school.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('request')}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center space-x-2 active:scale-[0.98] cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4 text-emerald-400" />
          <span>New Lecture Requisition</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* WhatsApp Support Query Card */}
      <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-tg-green" />
            <span>Need Help with Speaker Selection?</span>
          </p>
          <p className="text-[11px] text-emerald-800">
            Ask State Admin directly via WhatsApp
          </p>
        </div>
        <button
          onClick={() => setIsAskModalOpen(true)}
          className="px-3 py-2 rounded-xl bg-tg-green text-white font-bold text-xs shadow-xs hover:bg-emerald-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Ask Admin</span>
        </button>
      </div>

      {/* 4 Steps Mobile Guide */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          How It Works (4 Simple Steps)
        </h4>
        <div className="space-y-3 text-xs">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <p className="font-bold text-slate-800">Select School & Trade</p>
              <p className="text-slate-500 text-[11px]">Choose district, mandal, and your school UDISE code.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <p className="font-bold text-slate-800">Fill Session Details</p>
              <p className="text-slate-500 text-[11px]">Specify topic, proposed dates, and student batch size.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <p className="font-bold text-slate-800">State Admin Reviews</p>
              <p className="text-slate-500 text-[11px]">Academic cell approves and assigns an industry speaker.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </div>
            <div>
              <p className="font-bold text-slate-800">Conduct Lecture & Submit</p>
              <p className="text-slate-500 text-[11px]">Conduct workshop in school and submit feedback.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vocational Trades Overview */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Approved Vocational Trades
          </h4>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {VOCATIONAL_TRADES.length} Trades
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-left">
          {VOCATIONAL_TRADES.slice(0, 6).map((t) => (
            <div 
              key={t.id} 
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-emerald-50/50 transition"
            >
              <p className="text-xs font-bold text-slate-800 truncate">{t.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{t.sector}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

