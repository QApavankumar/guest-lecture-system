import React from 'react';
import { useLecture } from '../context/LectureContext';
import { 
  FileText, 
  UserCheck, 
  Presentation, 
  Award, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function WorkflowSection() {
  const { setActiveView } = useLecture();

  const steps = [
    {
      num: "01",
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      title: "Requisition by VT",
      desc: "Vocational Trainer selects trade, identifies school by UDISE code, and sets preferred date."
    },
    {
      num: "02",
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
      title: "Admin Review & Matching",
      desc: "State/District cell approves request and assigns certified industry specialist or faculty."
    },
    {
      num: "03",
      icon: <Presentation className="w-6 h-6 text-blue-600" />,
      title: "Interactive Lecture",
      desc: "Expert visits school lab, conducts hands-on demonstrations, and guides student queries."
    },
    {
      num: "04",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Reporting & Honorarium",
      desc: "Attendance logged, feedback submitted, and official honorarium disbursed seamlessly."
    }
  ];

  return (
    <section id="workflow" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-tg-green uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Standard Operating Procedure
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            How the Guest Lecture System Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A transparent and structured lifecycle from school request to state monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white shadow-2xs border border-slate-100">
                    {step.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span>Samagra Shiksha Norm</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar below workflow */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              Ready to schedule a lecture for your school?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Submit your request in under 2 minutes with your school UDISE code.
            </p>
          </div>

          <button
            onClick={() => setActiveView('booking')}
            className="px-6 py-3 rounded-xl bg-tg-green hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Request for Guest Lectures</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

