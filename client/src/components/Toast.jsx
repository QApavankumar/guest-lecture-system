import React from 'react';
import { useLecture } from '../context/LectureContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useLecture();

  if (!toast) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500 bg-white text-emerald-950';
      case 'warning':
        return 'border-amber-500 bg-white text-amber-950';
      case 'error':
        return 'border-rose-500 bg-white text-rose-950';
      default:
        return 'border-blue-500 bg-white text-blue-950';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-modal">
      <div className={`flex items-center space-x-3 p-4 rounded-xl border shadow-xl max-w-md ${getBorderColor(toast.type)}`}>
        {getToastIcon(toast.type)}
        <div className="text-xs sm:text-sm font-semibold pr-2">
          {toast.message}
        </div>
      </div>
    </div>
  );
}

