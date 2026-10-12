import React from 'react';
import { LectureProvider, useLecture } from './context/LectureContext';

// Mobile Shell Components
import MobileLogin from './components/mobile/MobileLogin';
import MobileTopBar from './components/mobile/MobileTopBar';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import MobileVTHome from './components/mobile/MobileVTHome';
import MobileVTHistory from './components/mobile/MobileVTHistory';
import MobileSupport from './components/mobile/MobileSupport';
import MobileAdminDashboard from './components/mobile/MobileAdminDashboard';
import MobileAdminRequisitions from './components/mobile/MobileAdminRequisitions';
import MobileAdminSearch from './components/mobile/MobileAdminSearch';
import MobileAdminProfile from './components/mobile/MobileAdminProfile';

// Shared Form & Modals
import MainTrainerForm from './components/MainTrainerForm';
import GuestLectureModal from './components/GuestLectureModal';
import AskAdminModal from './components/AskAdminModal';
import RequestDetailsModal from './components/RequestDetailsModal';
import AssignLecturerModal from './components/AssignLecturerModal';
import AddLecturerModal from './components/AddLecturerModal';
import AdminNotificationDrawer from './components/AdminNotificationDrawer';
import FloatingAskButton from './components/FloatingAskButton';
import Toast from './components/Toast';

function MainAppContent() {
  const { currentUser, currentTab } = useLecture();

  // 1. Mandatory Login First: If not authenticated, always display MobileLogin
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 sm:py-6 flex items-center justify-center">
        <div className="w-full sm:max-w-md min-h-screen sm:min-h-[844px] bg-slate-900 flex flex-col relative sm:rounded-[36px] sm:shadow-2xl overflow-hidden border sm:border-slate-800">
          <MobileLogin />
          <Toast />
        </div>
      </div>
    );
  }

  // 2. Role-based Mobile App Shell with Top Bar & Fixed Bottom Navigation
  const isVT = currentUser.role === 'VT';

  return (
    <div className="min-h-screen bg-slate-950 sm:py-6 flex items-center justify-center">
      {/* Mobile Frame Container (Full-screen on phone/APK, sleek device frame on desktop) */}
      <div className="w-full sm:max-w-md min-h-screen sm:min-h-[844px] bg-slate-50 text-slate-800 flex flex-col relative sm:rounded-[36px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden border sm:border-slate-800">
        
        {/* Sticky Mobile Top App Bar */}
        <MobileTopBar />

        {/* Scrollable Mobile Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {isVT ? (
            /* VT Views */
            <>
              {currentTab === 'home' && <MobileVTHome />}
              {currentTab === 'request' && <MainTrainerForm />}
              {currentTab === 'history' && <MobileVTHistory />}
              {currentTab === 'support' && <MobileSupport />}
            </>
          ) : (
            /* Admin Views */
            <>
              {currentTab === 'dashboard' && <MobileAdminDashboard />}
              {currentTab === 'requisitions' && <MobileAdminRequisitions />}
              {currentTab === 'search' && <MobileAdminSearch />}
              {currentTab === 'profile' && <MobileAdminProfile />}
            </>
          )}
        </main>

        {/* Fixed Mobile Bottom Navigation Bar with Modern Icons */}
        <MobileBottomNav />

        {/* Interactive Modals */}
        <GuestLectureModal />
        <AskAdminModal />
        <RequestDetailsModal />
        <AssignLecturerModal />
        <AddLecturerModal />
        <AdminNotificationDrawer />

        {/* Floating WhatsApp Action Button (Only for VT, never for Admin, and hidden on support tab) */}
        {isVT && currentTab !== 'support' && <FloatingAskButton />}

        {/* Real-time Toast Alerts */}
        <Toast />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LectureProvider>
      <MainAppContent />
    </LectureProvider>
  );
}

