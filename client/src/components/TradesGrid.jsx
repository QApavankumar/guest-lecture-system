import React from 'react';
import { useLecture } from '../context/LectureContext';
import { VOCATIONAL_TRADES } from '../data/trades';
import { 
  Laptop, 
  Stethoscope, 
  ShoppingBag, 
  Sparkles, 
  Car, 
  Sprout, 
  Cpu, 
  Shirt, 
  Compass, 
  Landmark, 
  Wrench,
  ArrowRight
} from 'lucide-react';

export default function TradesGrid() {
  const { setTrainerData, setActiveView } = useLecture();

  // Trade icons mapping
  const getIcon = (id) => {
    switch (id) {
      case 'it_ites': return <Laptop className="w-6 h-6 text-emerald-600" />;
      case 'healthcare': return <Stethoscope className="w-6 h-6 text-rose-600" />;
      case 'retail': return <ShoppingBag className="w-6 h-6 text-amber-600" />;
      case 'beauty_wellness': return <Sparkles className="w-6 h-6 text-pink-600" />;
      case 'automotive': return <Car className="w-6 h-6 text-blue-600" />;
      case 'agriculture': return <Sprout className="w-6 h-6 text-green-600" />;
      case 'electronics': return <Cpu className="w-6 h-6 text-indigo-600" />;
      case 'apparel': return <Shirt className="w-6 h-6 text-purple-600" />;
      case 'tourism': return <Compass className="w-6 h-6 text-teal-600" />;
      case 'banking': return <Landmark className="w-6 h-6 text-sky-600" />;
      default: return <Wrench className="w-6 h-6 text-orange-600" />;
    }
  };

  const handleSelectTrade = (tradeName) => {
    setTrainerData(prev => ({ ...prev, trade: tradeName }));
    setActiveView('booking');
  };

  return (
    <section id="trades" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-tg-green uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            NSQF Aligned Curricula
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Vocational Trades in Telangana Schools
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Secondary students (Class 9th to 12th) undergo vocational training across these sectors. Industry guest lectures bridge the gap between classroom theory and real-world shop-floor practices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {VOCATIONAL_TRADES.map((trade) => (
            <div 
              key={trade.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-tg-green/50 transition-all duration-200 flex flex-col justify-between group text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                    {getIcon(trade.id)}
                  </div>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {trade.code}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-tg-green transition-colors">
                  {trade.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Practical lab work, technical skill modules, and certified expert interactions.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSelectTrade(trade.name)}
                  className="text-xs font-bold text-tg-green group-hover:text-emerald-700 flex items-center space-x-1 hover:underline cursor-pointer"
                >
                  <span>Request Lecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] text-slate-400 font-medium">Samagra Shiksha</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

