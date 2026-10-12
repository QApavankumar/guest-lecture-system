import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  X, 
  UserPlus, 
  Building2, 
  Phone, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const POPULAR_TRADES = [
  'Information Technology',
  'Healthcare',
  'Automotive',
  'Retail Management',
  'Electronics & Hardware',
  'Agriculture',
  'Beauty & Wellness',
  'Solar Energy',
  'Banking & Financial Services',
  'Tourism & Hospitality',
  'Apparel & Made-ups',
  'Other Vocational Trade'
];

export default function AddLecturerModal() {
  const { isAddLecturerModalOpen, setIsAddLecturerModalOpen, addLecturer } = useLecture();

  const [formData, setFormData] = useState({
    name: '',
    trade: 'Information Technology',
    organization: '',
    designation: '',
    phone: '',
    email: '',
    qualification: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isAddLecturerModalOpen) return null;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide the Guest Lecturer name.');
      return;
    }
    if (!formData.organization.trim()) {
      setError('Please provide the Organization/Industry partner name.');
      return;
    }
    if (!formData.designation.trim()) {
      setError('Please provide the Designation/Role.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    const res = await addLecturer(formData);
    setIsSubmitting(false);

    if (res.success) {
      setFormData({
        name: '',
        trade: 'Information Technology',
        organization: '',
        designation: '',
        phone: '',
        email: '',
        qualification: '',
        location: ''
      });
      setIsAddLecturerModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-modal text-left my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-tg-green/30 border border-tg-green/50 flex items-center justify-center text-amber-300">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Add Industry Guest Lecturer
              </h3>
              <p className="text-[11px] text-emerald-300">
                Register verified expert for Telangana Vocational Schools
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddLecturerModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name & Trade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Dr. K. Anand Kumar"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Vocational Trade <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.trade}
                onChange={(e) => handleChange('trade', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
              >
                {POPULAR_TRADES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Organization & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Organization / Company <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  placeholder="e.g. TCS / Yashoda Hospitals"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Designation / Role <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  placeholder="e.g. Lead Technical Architect"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="e.g. 9849012345"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="e.g. expert@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Qualification & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Qualification (Optional)
              </label>
              <div className="relative">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => handleChange('qualification', e.target.value)}
                  placeholder="e.g. M.Tech / MBBS / MBA"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City / District (Optional)
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Hyderabad / Warangal"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddLecturerModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-tg-green hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-75"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering...' : 'Save & Register Lecturer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
