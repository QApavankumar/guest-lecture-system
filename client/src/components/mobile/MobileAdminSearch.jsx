import React, { useState } from 'react';
import { useLecture } from '../../context/LectureContext';
import { Search, School, MapPin, User, ChevronRight, Filter } from 'lucide-react';

export default function MobileAdminSearch() {
  const { requests, setSelectedRequestForView } = useLecture();
  const [query, setQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const districts = ['All', ...Array.from(new Set(requests.map(r => r.district))).filter(Boolean)];

  const results = requests.filter(r => {
    const matchesDistrict = selectedDistrict === 'All' || r.district === selectedDistrict;
    const q = query.toLowerCase();
    const matchesQuery = 
      !query.trim() ||
      r.schoolName.toLowerCase().includes(q) ||
      r.udiseCode.includes(q) ||
      r.vtName.toLowerCase().includes(q) ||
      r.trade.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q);
    return matchesDistrict && matchesQuery;
  });

  return (
    <div className="p-4 space-y-3 pb-24 text-left">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Directory Search</h2>
        <p className="text-xs text-slate-500">Search by UDISE, school, trainer, or trade</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Medchal, ITES, 28120100101..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-tg-green/30"
        />
      </div>

      {/* District Pill Filters */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {districts.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDistrict(d)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedDistrict === d
                ? 'bg-tg-green text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-2.5 pt-1">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Found {results.length} record{results.length !== 1 ? 's' : ''}
        </p>

        {results.map(req => (
          <div
            key={req.id}
            onClick={() => setSelectedRequestForView(req)}
            className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-xs transition active:scale-[0.99] cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-1 text-left min-w-0 pr-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {req.id}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 truncate">
                  UDISE: {req.udiseCode}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {req.schoolName}
              </h4>
              <p className="text-[11px] text-tg-green font-semibold truncate">
                {req.trade} • {req.vtName}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

