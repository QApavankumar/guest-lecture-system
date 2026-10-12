import React, { useState, useEffect } from 'react';
import { useLecture } from '../context/LectureContext';
import { TELANGANA_LOCATIONS } from '../data/tgLocations';
import { 
  X, 
  MapPin, 
  Calendar, 
  School, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Building2,
  Clock
} from 'lucide-react';

export default function GuestLectureModal() {
  const { 
    isLectureModalOpen, 
    setIsLectureModalOpen, 
    trainerData, 
    createRequest 
  } = useLecture();

  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null); // { name, udise }
  const [lectureDate, setLectureDate] = useState('');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset or initialize when modal opens
  useEffect(() => {
    if (isLectureModalOpen) {
      setDistrict('Medchal-Malkajgiri'); // sensible default for instant preview
      setMandal('Medchal');
      setVillage('Medchal Town');
      const defSchool = TELANGANA_LOCATIONS['Medchal-Malkajgiri']?.mandals['Medchal']?.schools[0];
      setSelectedSchool(defSchool || null);
      
      // Default lecture date: 10 days from now
      const d = new Date();
      d.setDate(d.getDate() + 7);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setLectureDate(`${yyyy}-${mm}-${dd}`);
      setTopic('');
      setNotes('');
      setFormErrors({});
    }
  }, [isLectureModalOpen]);

  if (!isLectureModalOpen) return null;

  // Derived options based on selections
  const districtList = Object.keys(TELANGANA_LOCATIONS);
  const currentDistrictData = district ? TELANGANA_LOCATIONS[district] : null;
  const mandalList = currentDistrictData ? Object.keys(currentDistrictData.mandals) : [];
  const currentMandalData = (currentDistrictData && mandal) ? currentDistrictData.mandals[mandal] : null;
  const villageList = currentMandalData ? currentMandalData.villages : [];
  const schoolList = currentMandalData ? currentMandalData.schools : [];

  // Handlers for cascading dropdowns
  const handleDistrictChange = (e) => {
    const newDist = e.target.value;
    setDistrict(newDist);
    if (newDist && TELANGANA_LOCATIONS[newDist]) {
      const firstMandal = Object.keys(TELANGANA_LOCATIONS[newDist].mandals)[0] || '';
      setMandal(firstMandal);
      if (firstMandal) {
        const mData = TELANGANA_LOCATIONS[newDist].mandals[firstMandal];
        setVillage(mData.villages[0] || '');
        setSelectedSchool(mData.schools[0] || null);
      } else {
        setVillage('');
        setSelectedSchool(null);
      }
    } else {
      setMandal('');
      setVillage('');
      setSelectedSchool(null);
    }
  };

  const handleMandalChange = (e) => {
    const newMandal = e.target.value;
    setMandal(newMandal);
    if (newMandal && currentDistrictData?.mandals[newMandal]) {
      const mData = currentDistrictData.mandals[newMandal];
      setVillage(mData.villages[0] || '');
      setSelectedSchool(mData.schools[0] || null);
    } else {
      setVillage('');
      setSelectedSchool(null);
    }
  };

  const handleSchoolChange = (e) => {
    const udise = e.target.value;
    const found = schoolList.find(s => s.udise === udise);
    setSelectedSchool(found || null);
  };

  const validate = () => {
    const errors = {};
    if (!district) errors.district = 'Please select a District';
    if (!mandal) errors.mandal = 'Please select a Mandal';
    if (!village) errors.village = 'Please select a Village';
    if (!selectedSchool) errors.school = 'Please select a UDISE School';
    if (!lectureDate) errors.lectureDate = 'Please select a proposed Lecture Date';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const requestPayload = {
      district,
      mandal,
      village,
      schoolName: selectedSchool.name,
      udiseCode: selectedSchool.udise,
      lectureDate,
      topic: topic.trim() || 'Practical Industry Overview & Career Opportunities',
      notes: notes.trim(),
      trade: trainerData.trade,
      vtName: trainerData.vtName,
      vtMobile: trainerData.vtMobile
    };

    await createRequest(requestPayload);
    setSubmitting(false);
  };

  // Format date display for visual indicator
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return 'DD/MM/YYYY';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y.slice(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-modal my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-tg-green to-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-white/10 text-amber-300">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Guest Lecture Request Form
              </h3>
              <p className="text-xs text-emerald-100">
                Samagra Shiksha Telangana • School & Date Requisition
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLectureModalOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VT Summary Info Strip */}
        <div className="bg-emerald-50/60 border-b border-emerald-100 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-emerald-900 gap-2">
          <div>
            <span className="text-emerald-700 font-semibold">Trainer: </span>
            <span className="font-bold">{trainerData.vtName || 'Trainer'}</span>
            <span className="mx-2 text-emerald-300">•</span>
            <span className="text-emerald-700 font-semibold">Mobile: </span>
            <span>+91 {trainerData.vtMobile}</span>
          </div>
          <div className="bg-emerald-200/60 text-emerald-900 font-semibold px-2 py-0.5 rounded text-[11px]">
            {trainerData.trade || 'Vocational Trade'}
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          {/* Field 1: Select Dist (District) */}
          <div>
            <label htmlFor="dist" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Select Dist (District) <span className="text-rose-500">*</span></span>
              <span className="text-[11px] font-normal text-slate-400">Telangana State</span>
            </label>
            <select
              id="dist"
              value={district}
              onChange={handleDistrictChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition cursor-pointer"
            >
              <option value="">-- Select District --</option>
              {districtList.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
            {formErrors.district && (
              <p className="mt-1 text-xs text-rose-600">{formErrors.district}</p>
            )}
          </div>

          {/* Field 2: Select Mandal */}
          <div>
            <label htmlFor="mandal" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Mandal <span className="text-rose-500">*</span>
            </label>
            <select
              id="mandal"
              value={mandal}
              onChange={handleMandalChange}
              disabled={!district}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">-- Select Mandal --</option>
              {mandalList.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {formErrors.mandal && (
              <p className="mt-1 text-xs text-rose-600">{formErrors.mandal}</p>
            )}
          </div>

          {/* Field 3: Select Villages */}
          <div>
            <label htmlFor="village" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Villages / Habitation <span className="text-rose-500">*</span>
            </label>
            <select
              id="village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              disabled={!mandal}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">-- Select Village --</option>
              {villageList.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            {formErrors.village && (
              <p className="mt-1 text-xs text-rose-600">{formErrors.village}</p>
            )}
          </div>

          {/* Field 4: UDISE School */}
          <div>
            <label htmlFor="udiseSchool" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>UDISE School <span className="text-rose-500">*</span></span>
              {selectedSchool && (
                <span className="font-mono text-xs font-bold text-tg-green bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  UDISE: {selectedSchool.udise}
                </span>
              )}
            </label>
            <select
              id="udiseSchool"
              value={selectedSchool?.udise || ''}
              onChange={handleSchoolChange}
              disabled={!mandal}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">-- Select School --</option>
              {schoolList.map(s => (
                <option key={s.udise} value={s.udise}>
                  {s.name} (Code: {s.udise})
                </option>
              ))}
            </select>
            {formErrors.school && (
              <p className="mt-1 text-xs text-rose-600">{formErrors.school}</p>
            )}
          </div>

          {/* Field 5: Date Picker (Matching Sketch 1 with format 01/01/26 + calendar widget) */}
          <div>
            <label htmlFor="lectureDate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-tg-green" />
                Proposed Date of Guest Lecture <span className="text-rose-500">*</span>
              </span>
              <span className="font-mono text-xs text-emerald-800 bg-amber-100/70 border border-amber-300 px-2 py-0.5 rounded font-semibold">
                {formatDisplayDate(lectureDate)}
              </span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="lectureDate"
                value={lectureDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLectureDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition cursor-pointer"
              />
            </div>
            {formErrors.lectureDate && (
              <p className="mt-1 text-xs text-rose-600">{formErrors.lectureDate}</p>
            )}
          </div>

          {/* Field 6: Topic (Enrichment) */}
          <div>
            <label htmlFor="topic" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lecture Topic / Skill Focus <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Modern Web Frameworks / IoT Diagnostics"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 shadow-2xs focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden transition"
            />
          </div>

          {/* Action Buttons: Matching "Submit for Request" button from sketch */}
          <div className="pt-3 flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsLectureModalOpen(false)}
              className="w-1/3 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              id="submit-request-btn"
              type="submit"
              disabled={submitting}
              className="w-2/3 py-2.5 px-5 rounded-xl bg-gradient-to-r from-tg-green to-emerald-700 hover:from-tg-green-dark hover:to-tg-green text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Submit for Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

