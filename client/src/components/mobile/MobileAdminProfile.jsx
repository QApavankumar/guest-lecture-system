import React from 'react';
import { useLecture } from '../../context/LectureContext';
import { Shield, Building, Mail, Phone, LogOut, CheckCircle2, Database, School } from 'lucide-react';

export default function MobileAdminProfile() {
  const { currentUser, logout, requests } = useLecture();

  return (
    <div className="p-4 space-y-4 pb-24 text-left">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Admin Account</h2>
        <p className="text-xs text-slate-500">State Academic Vocational Cell</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-5 text-white shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">
              {currentUser?.name || 'State Academic Officer'}
            </h3>
            <p className="text-xs text-amber-300 font-semibold">
              {currentUser?.roleLabel || 'State Administrator'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Samagra Shiksha • Govt of Telangana
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 block">Total Requests</span>
            <span className="text-base font-bold text-white">{requests.length}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 block">Approved</span>
            <span className="text-base font-bold text-emerald-400">
              {requests.filter(r => r.status === 'Approved').length}
            </span>
          </div>
        </div>
      </div>

      {/* Department Details */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Cell Information
        </h4>

        <div className="space-y-2 text-slate-600">
          <div className="flex items-start space-x-2.5">
            <Building className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">SCERT Complex</p>
              <p className="text-[11px] text-slate-500">Saifabad, Hyderabad, Telangana 500004</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>040-23232345 (State Desk)</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
            <span>schooledu@telangana.gov.in</span>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2">
        <button
          onClick={logout}
          className="w-full py-3.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition flex items-center justify-center space-x-2 active:scale-[0.98] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Admin Portal</span>
        </button>
      </div>
    </div>
  );
}

