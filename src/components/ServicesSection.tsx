import React from 'react';
import { Landmark, ShieldAlert, LineChart, Umbrella, Compass, Briefcase, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      icon: Landmark,
      title: 'Loan Solutions',
      description: 'Quick and hassle-free financing solutions tailored to eligible customers across personal, business, and property categories.',
      ctaText: 'Explore Loans',
      serviceKey: 'Personal Loan',
      badge: 'Popular',
      gradient: 'from-amber-500 to-orange-500',
      actionType: 'scroll-loans'
    },
    {
      icon: ShieldAlert,
      title: 'Insurance Solutions',
      description: 'Protect what matters most with suitable life and general insurance solutions from India’s leading underwriting partners.',
      ctaText: 'View Insurance',
      serviceKey: 'Insurance Solutions',
      badge: 'Essential',
      gradient: 'from-orange-500 to-rose-500',
      actionType: 'modal'
    },
    {
      icon: LineChart,
      title: 'Investment Solutions',
      description: 'Smart investment options focused on long-term wealth creation, mutual funds, and structured SIP portfolios.',
      ctaText: 'Explore Investments',
      serviceKey: 'Mutual Funds & SIP',
      badge: 'Wealth Creation',
      gradient: 'from-rose-500 to-red-600',
      actionType: 'scroll-investments'
    },
    {
      icon: Umbrella,
      title: 'Retirement Planning',
      description: 'Plan today for a more secure, dignified, and financially independent tomorrow with structured corpus guidance.',
      ctaText: 'Plan Retirement',
      serviceKey: 'Retirement Planning',
      badge: 'Long Term',
      gradient: 'from-amber-500 to-yellow-500',
      actionType: 'modal'
    },
    {
      icon: Compass,
      title: 'Financial Advisory',
      description: 'Expert guidance for better-informed financial decisions, debt consolidation, and portfolio optimization.',
      ctaText: 'Consult an Expert',
      serviceKey: 'Financial Advisory',
      badge: 'Consultation',
      gradient: 'from-orange-500 to-amber-600',
      actionType: 'modal'
    },
    {
      icon: Briefcase,
      title: 'Business Advisory',
      description: 'Strategic financial guidance to help businesses grow, expand cash flows, and manage working capital requirements.',
      ctaText: 'Get Business Support',
      serviceKey: 'Business Advisory',
      badge: 'MSME & Corp',
      gradient: 'from-red-500 to-orange-500',
      actionType: 'modal'
    }
  ];

  const handleAction = (item: typeof services[0]) => {
    if (item.actionType === 'scroll-loans') {
      const el = document.getElementById('loans');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.actionType === 'scroll-investments') {
      const el = document.getElementById('investments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSelectService(item.serviceKey);
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Complete Financial Solutions Under One Roof
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            From funding immediate business expansion to protecting family assets and building multi-generational wealth, we partner with top-tier Indian financial institutions.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                id={item.serviceKey === 'Insurance Solutions' ? 'insurance' : undefined}
                className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} p-0.5 shadow-md flex items-center justify-center`}>
                      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-transparent group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-full px-2.5 py-0.5">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => handleAction(item)}
                    className="w-full inline-flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer py-1"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
