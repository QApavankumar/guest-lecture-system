import React, { useState } from 'react';
import { useLecture } from '../../context/LectureContext';
import { 
  MessageCircle, 
  PhoneCall, 
  Mail, 
  MapPin, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Sparkles 
} from 'lucide-react';

export default function MobileSupport() {
  const { currentUser, setIsAskModalOpen } = useLecture();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How many guest lectures can a VT request per academic year?',
      a: 'As per Samagra Shiksha NSQF guidelines, each Vocational Trainer is entitled to request up to 4 industry guest lectures and 1 field visit per batch each academic year.'
    },
    {
      q: 'Who pays the guest speaker honorarium?',
      a: 'Honorarium is directly disbursed by the Telangana Samagra Shiksha State Office under the NSQF Industry Engagement Fund upon submission of the post-lecture attendance report.'
    },
    {
      q: 'Can a speaker attend online via T-SAT / Google Meet?',
      a: 'Yes! Both In-Person classroom sessions and Digital / T-SAT blended sessions are supported. Please indicate your preference in the requisition form.'
    },
    {
      q: 'My school UDISE code is not appearing in the dropdown. What should I do?',
      a: 'Use the "Ask Admin via WhatsApp" button below or call the State Support Desk at 040-23232345 to map your UDISE code in the directory.'
    }
  ];

  return (
    <div className="p-4 space-y-4 pb-24 text-left">
      {/* Top Banner */}
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Support & Help Desk</h2>
        <p className="text-xs text-slate-500">Contact State Academic Cell & FAQs</p>
      </div>

      {/* WhatsApp Primary Contact Card */}
      <div className="bg-gradient-to-br from-emerald-600 to-tg-green rounded-3xl p-5 text-white shadow-lg space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-xs">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">WhatsApp Query Desk</h3>
            <p className="text-xs text-emerald-100 font-medium">Direct connection to State Admin</p>
          </div>
        </div>

        <p className="text-xs text-emerald-50 leading-relaxed">
          Need immediate advice regarding speaker assignment, syllabus topics, or date rescheduling? Message the State Admin directly.
        </p>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 active:scale-[0.98] cursor-pointer"
        >
          <Send className="w-4 h-4 text-tg-green" />
          <span>Send Query on WhatsApp</span>
        </button>
      </div>

      {/* Quick Direct Contacts */}
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="tel:04023232345"
          className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:bg-slate-50 transition block text-left"
        >
          <PhoneCall className="w-5 h-5 text-emerald-600 mb-1.5" />
          <p className="text-xs font-bold text-slate-800">State Helpline</p>
          <p className="text-[11px] text-slate-500 mt-0.5">040-23232345</p>
        </a>

        <a
          href="mailto:schooledu@telangana.gov.in"
          className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:bg-slate-50 transition block text-left"
        >
          <Mail className="w-5 h-5 text-blue-600 mb-1.5" />
          <p className="text-xs font-bold text-slate-800">Email Support</p>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">schooledu@telangana</p>
        </a>
      </div>

      {/* Office Location */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
        <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800">State Academic Vocational Cell</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            SCERT Complex, Opposite LB Stadium, Saifabad, Hyderabad - 500004
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Frequently Asked Questions
        </h4>
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/60 transition cursor-pointer"
                >
                  <span className="pr-2">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-3 text-[11px] text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

