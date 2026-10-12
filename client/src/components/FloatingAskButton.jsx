import React, { useState } from 'react';
import { useLecture } from '../context/LectureContext';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function FloatingAskButton() {
  const { setIsAskModalOpen } = useLecture();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute bottom-20 right-4 z-30 flex items-center space-x-2">
      {/* Tooltip on hover */}
      {hovered && (
        <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900 text-white text-[11px] px-2.5 py-1.5 rounded-xl shadow-xl border border-slate-800 animate-modal">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Ask Admin on WhatsApp</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-ask-btn"
        onClick={() => setIsAskModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white/80 active:scale-95 cursor-pointer"
        title="Ask Admin Query via WhatsApp"
        aria-label="Ask Admin on WhatsApp"
      >
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 border border-white"></span>
        </span>

        {/* WhatsApp/Chat Icon */}
        <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />

        <span className="font-bold text-white text-xs">
          Ask Admin
        </span>
      </button>
    </div>
  );
}
