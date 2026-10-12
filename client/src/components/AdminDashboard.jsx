import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileSpreadsheet, 
  Eye, 
  Check, 
  X, 
  RotateCcw,
  School,
  ArrowLeft,
  Building,
  UserCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    requests, 
    updateRequestStatus, 
    setSelectedRequestForView, 
    setActiveView,
    adminUser 
  } = useLecture();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');

  // Stats calculation
  const totalCount = requests.length;
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;
  const uniqueDistricts = Array.from(new Set(requests.map(r => r.district))).filter(Boolean);

  // Filtering logic
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.udiseCode.includes(searchTerm) ||
      req.vtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesDistrict = districtFilter === 'All' || req.district === districtFilter;

    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Context Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-gov">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              STATE CONTROL DESK
            </span>
            <span className="text-xs text-slate-500">• TG Samagra Shiksha</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Guest Lecture Requisitions & Status Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time monitoring of vocational school lecture requests submitted across Telangana.
          </p>
        </div>

        <button
          onClick={() => setActiveView('public')}
          className="self-start sm:self-center inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-tg-green text-tg-green hover:bg-emerald-50 text-xs sm:text-sm font-bold transition shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to VT Request Form</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Requests</span>
            <FileSpreadsheet className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{totalCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across 33 Districts</p>
        </div>

        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pending Review</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-2">{pendingCount}</p>
          <p className="text-[11px] text-amber-700 mt-1">Awaiting Allocation</p>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Approved</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-2">{approvedCount}</p>
          <p className="text-[11px] text-emerald-700 mt-1">Speaker Scheduled</p>
        </div>

        <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Completed</span>
            <School className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-2">{completedCount}</p>
          <p className="text-[11px] text-blue-700 mt-1">Report Logged</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-gov space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by school, UDISE code, VT name or ID..."
              className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden"
            />
          </div>

          {/* District Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-700 focus:border-tg-green focus:ring-2 focus:ring-emerald-200 outline-hidden cursor-pointer"
            >
              <option value="All">All Districts</option>
              {uniqueDistricts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2">Filter by Status:</span>
          {['All', 'Pending', 'Approved', 'Rejected', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
          {(searchTerm || statusFilter !== 'All' || districtFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setDistrictFilter('All');
              }}
              className="ml-auto text-xs text-tg-green font-semibold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Requests Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Req ID & Date</th>
                <th className="py-3.5 px-4">School & UDISE</th>
                <th className="py-3.5 px-4">District / Mandal</th>
                <th className="py-3.5 px-4">Trade & Topic</th>
                <th className="py-3.5 px-4">Vocational Trainer</th>
                <th className="py-3.5 px-4">Proposed Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                      <div className="font-mono font-bold text-tg-green">{req.id}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(req.submittedAt).toLocaleDateString('en-GB')}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="font-semibold text-slate-800 max-w-[200px] truncate" title={req.schoolName}>
                        {req.schoolName}
                      </div>
                      <div className="font-mono text-[11px] text-slate-500">
                        UDISE: {req.udiseCode}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{req.district}</div>
                      <div className="text-[11px] text-slate-400">{req.mandal}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] inline-block border border-emerald-200/60">
                        {req.trade}
                      </div>
                      <div className="text-slate-600 text-[11px] mt-0.5 max-w-[180px] truncate" title={req.topic}>
                        {req.topic}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{req.vtName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">+91 {req.vtMobile}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold font-mono text-slate-900">{req.lectureDate}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1">
                        {/* Quick Approve button */}
                        {req.status !== 'Approved' && (
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Approved')}
                            className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition"
                            title="Quick Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}

                        {/* Quick Reject button */}
                        {req.status !== 'Rejected' && (
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Rejected')}
                            className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-100 transition"
                            title="Quick Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}

                        {/* View Full Details */}
                        <button
                          onClick={() => setSelectedRequestForView(req)}
                          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition"
                          title="View Requisition Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    <p className="text-sm font-semibold">No guest lecture requisitions found matching the filter</p>
                    <p className="text-xs mt-1">Submit a new request from the Trainer Form or reset the filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredRequests.length} of {requests.length} records</span>
          <span className="text-[11px] font-mono text-slate-400">Department of School Education, Govt of Telangana</span>
        </div>
      </div>
    </div>
  );
}

