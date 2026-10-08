import React from 'react';
import { TrendingUp, Target, ShieldCheck, PiggyBank, Sparkles, ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react';

interface InvestmentSectionProps {
  onOpenLead: (service: string) => void;
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({ onOpenLead }) => {
  const pillars = [
    {
      icon: TrendingUp,
      title: 'Mutual Funds & SIP',
      description: 'Disciplined compounding through equity, hybrid, and debt schemes distributed by AMFI-registered partner houses.',
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      icon: Target,
      title: 'Goal-Based Investing',
      description: 'Custom portfolios targeted towards child higher education, dream home down payment, and milestone celebrations.',
      color: 'text-orange-500 bg-orange-500/10'
    },
    {
      icon: PiggyBank,
      title: 'Wealth Creation',
      description: 'Long-term capital appreciation strategies designed to outpace inflation and build substantial wealth.',
      color: 'text-rose-500 bg-rose-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'Retirement Corpus',
      description: 'Structured retirement roadmaps balancing risk-managed growth with annuity-generating financial instruments.',
      color: 'text-emerald-500 bg-emerald-500/10'
    }
  ];

  return (
    <section id="investments" className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Wealth & Asset Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Build Your Wealth With Smarter Investment Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We help customers explore investment solutions based on their financial goals, investment horizon and risk profile. Experience disciplined portfolio planning backed by India's top Asset Management Companies.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-orange-500/50 dark:hover:border-amber-500/40 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Advisory Banner */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/60 dark:border-amber-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Tailored Portfolio Assessment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Not sure whether to start a SIP or invest Lumpsum?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Connect with our certified mutual fund advisors for risk profiling and scheme selection tailored to your goals.
            </p>
          </div>

          <button
            onClick={() => onOpenLead('Mutual Funds & SIP')}
            className="py-3 px-6 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2 text-sm"
          >
            <span>Consult Investment Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
