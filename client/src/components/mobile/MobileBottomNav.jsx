import React from 'react';
import { useLecture } from '../../context/LectureContext';
import { 
  Home, 
  CalendarPlus, 
  ClipboardList, 
  HelpCircle, 
  LayoutDashboard, 
  ClipboardCheck, 
  Search, 
  User 
} from 'lucide-react';

export default function MobileBottomNav() {
  const { currentUser, currentTab, setCurrentTab, requests } = useLecture();

  if (!currentUser) return null;

  const isVT = currentUser.role === 'VT';
  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around">
        {isVT ? (
          /* ================= VT BOTTOM TABS ================= */
          <>
            {/* Tab 1: Home */}
            <button
              onClick={() => setCurrentTab('home')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
                currentTab === 'home'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'home' ? 'bg-emerald-50' : ''}`}>
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Home</span>
            </button>

            {/* Tab 2: Request */}
            <button
              onClick={() => setCurrentTab('request')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
                currentTab === 'request'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'request' ? 'bg-emerald-50' : ''}`}>
                <CalendarPlus className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Request</span>
            </button>

            {/* Tab 3: My Requests / History */}
            <button
              onClick={() => setCurrentTab('history')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer relative ${
                currentTab === 'history'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'history' ? 'bg-emerald-50' : ''}`}>
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">My Requests</span>
            </button>

            {/* Tab 4: Support / WhatsApp */}
            <button
              onClick={() => setCurrentTab('support')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
                currentTab === 'support'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'support' ? 'bg-emerald-50' : ''}`}>
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Support</span>
            </button>
          </>
        ) : (
          /* ================= ADMIN BOTTOM TABS ================= */
          <>
            {/* Tab 1: Dashboard */}
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'dashboard' ? 'bg-emerald-50' : ''}`}>
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Dashboard</span>
            </button>

            {/* Tab 2: Requisitions */}
            <button
              onClick={() => setCurrentTab('requisitions')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer relative ${
                currentTab === 'requisitions'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition relative ${currentTab === 'requisitions' ? 'bg-emerald-50' : ''}`}>
                <ClipboardCheck className="w-5 h-5" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-extrabold shadow-2xs">
                    {pendingCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">Requisitions</span>
            </button>

            {/* Tab 3: Search */}
            <button
              onClick={() => setCurrentTab('search')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
                currentTab === 'search'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'search' ? 'bg-emerald-50' : ''}`}>
                <Search className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Search</span>
            </button>

            {/* Tab 4: Profile */}
            <button
              onClick={() => setCurrentTab('profile')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
                currentTab === 'profile'
                  ? 'text-tg-green font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentTab === 'profile' ? 'bg-emerald-50' : ''}`}>
                <User className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">Profile</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

