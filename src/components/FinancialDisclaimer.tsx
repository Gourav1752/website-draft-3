import React from 'react';
import { AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export const FinancialDisclaimer: React.FC = () => {
  return (
    <section className="py-12 bg-slate-100/80 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px]">
          <Scale className="w-4 h-4 text-orange-500" />
          <span>Statutory Regulatory Disclaimers & Intermediary Disclosure</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 leading-relaxed">
          
          {/* DSA Intermediary */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <span>DSA Intermediary Notice</span>
            </h4>
            <p>
              Phoenix Financial Services operates as a Direct Selling Associate/financial services intermediary and facilitates loan and financial product applications through its associated financial institutions. Phoenix Financial Services does not guarantee loan approval, interest rates, processing time or disbursement. All approvals, rates, fees, eligibility criteria and terms are determined solely by the respective lender/institution and are subject to their policies and applicable regulations.
            </p>
          </div>

          {/* Investments */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <span>Mutual Funds & Market Risks</span>
            </h4>
            <p>
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not guarantee future returns. Phoenix Financial Services facilitates scheme distribution in association with registered Asset Management Companies (AMCs).
            </p>
          </div>

          {/* Insurance */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <span>Insurance Underwriting</span>
            </h4>
            <p>
              Insurance products are subject to the terms, conditions, exclusions and underwriting guidelines of the respective insurer. Tax benefits are subject to changes in tax laws as per the Income Tax Act. Solicitation is conducted as a referral or corporate agent channel.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
