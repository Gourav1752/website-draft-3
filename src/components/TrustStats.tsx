import React from 'react';
import { MapPin, Building2, Layers, Headphones } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      label: 'PAN India',
      sublabel: 'Coverage',
      desc: 'Seamless processing across metro and tier-2/3 regions',
      icon: MapPin,
    },
    {
      label: 'Multiple',
      sublabel: 'Banking & Financial Partners',
      desc: 'Associated with premier Banks, NBFCs and HFCs',
      icon: Building2,
    },
    {
      label: '9+',
      sublabel: 'Loan Solutions',
      desc: 'Comprehensive credit options for diverse customer profiles',
      icon: Layers,
    },
    {
      label: 'End-to-End',
      sublabel: 'Customer Assistance',
      desc: 'Dedicated support through document collection to payout',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {item.sublabel}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
