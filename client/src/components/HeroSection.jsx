import React from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  CalendarPlus, 
  ArrowRight, 
  Sparkles, 
  School, 
  Users, 
  Briefcase, 
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function HeroSection() {
  const { setActiveView, currentUser, setIsLoginModalOpen, showToast } = useLecture();

  const handleRequestClick = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      showToast('Please log in with VT credentials (vt / vt123) to submit a request.', 'info');
    } else {
      setActiveView('booking');
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white overflow-hidden py-16 sm:py-24 border-b border-emerald-900/40">
      {/* Decorative pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966910_1px,transparent_1px),linear-gradient(to_bottom,#05966910_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tg-green/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Institutional Pill or VT Greeting */}
        {currentUser?.role === 'VT' ? (
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/50 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-300 mb-6 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Logged in as: <strong>{currentUser.name}</strong> ({currentUser.trade})</span>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-400/30 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-300 mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Department of School Education • Government of Telangana</span>
            <span className="hidden sm:inline text-emerald-400/50">•</span>
            <span className="hidden sm:inline text-amber-300 font-bold">Samagra Shiksha</span>
          </div>
        )}

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Bridging Classrooms with{' '}
          <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Industry Experts
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
          Official Requisition & Scheduling Portal for Vocational Trainers (VTs) in government high schools and junior colleges across all 33 Telangana districts.
        </p>

        {/* Primary Call to Action Button: "Request for Guest Lectures" */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-request-lecture-btn"
            onClick={handleRequestClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-tg-green hover:from-emerald-400 hover:to-emerald-600 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-3 group border border-emerald-300/40 active:scale-[0.98] cursor-pointer"
          >
            <CalendarPlus className="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform" />
            <span className="text-slate-950">Request for Guest Lectures</span>
            <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="#trades"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base backdrop-blur-xs border border-white/20 transition flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>Explore Vocational Trades</span>
          </a>
        </div>

        {/* Key Statistics Cards */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto text-left">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl">
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <School className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Schools</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">500+</p>
            <p className="text-[11px] text-emerald-200/70 mt-0.5">ZPHS & TS Model Schools</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">NSQF Trades</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">11 Trades</p>
            <p className="text-[11px] text-emerald-200/70 mt-0.5">IT, Health, Retail, Auto, etc.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl">
            <div className="flex items-center space-x-2 text-blue-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Districts</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">33 Districts</p>
            <p className="text-[11px] text-emerald-200/70 mt-0.5">All Telangana Mandals</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl">
            <div className="flex items-center space-x-2 text-teal-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Lectures</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">1,200+</p>
            <p className="text-[11px] text-emerald-200/70 mt-0.5">Industry Sessions Concluded</p>
          </div>
        </div>
      </div>
    </section>
  );
}

