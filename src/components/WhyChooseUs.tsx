import React from 'react';
import { Users2, SlidersHorizontal, UserCheck, Network, MapPin, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Users2,
      title: 'Experienced Professionals',
      description: 'Our experienced team of financial specialists provides end-to-end assistance throughout every stage of application.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: SlidersHorizontal,
      title: 'Customized Solutions',
      description: 'Solutions thoughtfully designed around specific individual, professional, and business financing requirements.',
      gradient: 'from-orange-500 to-rose-500'
    },
    {
      icon: UserCheck,
      title: 'Client-First Approach',
      description: 'Customer requirements and best interests remain firmly at the centre of our consultation and recommendation model.',
      gradient: 'from-rose-500 to-red-600'
    },
    {
      icon: Network,
      title: 'Trusted Network',
      description: 'Strategic association with multiple premier Public, Private Banks, NBFCs, and Housing Finance Companies across India.',
      gradient: 'from-amber-500 to-yellow-600'
    },
    {
      icon: MapPin,
      title: 'PAN India Presence',
      description: 'Seamless financial assistance and doorstep/digital processing available across major cities and regional hubs nationwide.',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: CheckCircle,
      title: 'End-to-End Assistance',
      description: 'Comprehensive handholding from initial eligibility check and documentation right through to sanction and final disbursement.',
      gradient: 'from-red-500 to-rose-600'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            The Phoenix Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Why Choose Phoenix Financial Services?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            We bridge the gap between borrowers and institutional lenders with complete transparency, faster turnaround times, and professional guidance.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pt.gradient} p-0.5 shadow-md flex items-center justify-center mb-6`}>
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-transparent group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                  {pt.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
