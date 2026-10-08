import React from 'react';
import { Send, FileSearch, FolderCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Share Your Requirement',
      desc: 'Tell us what financial solution you need through our quick online form or by calling our financial team.',
      icon: Send,
    },
    {
      num: '02',
      title: 'Eligibility Assessment',
      desc: 'Our team reviews your income, CIBIL profile, and requirements against multiple partner bank criteria.',
      icon: FileSearch,
    },
    {
      num: '03',
      title: 'Documentation & Processing',
      desc: 'We assist with collecting the required KYC, income records, and submitting complete bank dossiers.',
      icon: FolderCheck,
    },
    {
      num: '04',
      title: 'Sanction & Disbursement',
      desc: 'The respective lender processes and evaluates the application according to its institutional policies and sanctions funds.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Transparent Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            How It Works
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            From initial enquiry to disbursement, we simplify every step of your borrowing journey.
          </p>
        </div>

        {/* Timeline Desktop & Mobile */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-black text-orange-500/80 dark:text-amber-400/80 font-display">
                        {step.num}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 group-hover:text-orange-500 transition-colors">
                    Stage {step.num} of 04
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
