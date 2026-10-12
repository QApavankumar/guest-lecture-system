import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Building, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-tg-green">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>About Telangana Vocational Education</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Empowering Students with Real-World Industry Exposure
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Under the aegis of <strong className="text-slate-800">Samagra Shiksha, Department of School Education, Telangana</strong>, vocational education is integrated into secondary and higher secondary schools to cultivate employable competencies and entrepreneurial attitudes among students.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              The <strong className="text-tg-green">Guest Lecture Management System</strong> guarantees that every batch of students receives mandatory interactive sessions from practicing industry leaders, certified engineers, healthcare supervisors, and agricultural technologists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NSQF Level 1 to 4 Compliance</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified Expert Verification</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live WhatsApp Admin Query Cell</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent State Monitoring</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-emerald-800 to-tg-green-dark rounded-3xl p-8 text-white shadow-gov-lg relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 text-amber-300">
                <Building className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold mb-3">Key Mandates for VTs</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-emerald-100">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  <span>Minimum 3 industry expert lectures required per academic semester.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  <span>Advance requisition must be placed at least 7 days prior to proposed date.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  <span>School UDISE code and verified Vocational Trainer phone number are mandatory.</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-emerald-700/60 flex items-center justify-between text-xs text-emerald-200">
                <span>Directorate of School Education</span>
                <span className="font-mono font-bold text-amber-300">Govt of Telangana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

