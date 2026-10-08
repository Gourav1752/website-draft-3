import React from 'react';
import { Award, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';

export const ISOCertification: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5 border border-amber-300/40 dark:border-amber-700/30 overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Badge Representation */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 p-1 shadow-lg shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-center p-2">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mb-1" />
                  <span className="text-[9px] font-extrabold tracking-wider uppercase text-slate-800 dark:text-slate-200">
                    ISO 9001
                  </span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Quality Management Standard Placeholder</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                  ISO 9001:2015 CERTIFIED
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                  Dedicated to rigorous operational workflows, transparent client disclosures, and standardized financial intermediary processes.
                </p>
              </div>
            </div>

            {/* Right: Adherence Details & Verification Placeholder */}
            <div className="w-full lg:w-auto p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs space-y-2.5 max-w-md shrink-0">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Certificate Adherence Slot</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                <em>Note for Company Admin:</em> This section is designed to host the valid accredited ISO 9001:2015 audit certificate number and registrar badge upon institutional filing.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between text-[11px] text-slate-400">
                <span>Scope: Financial Intermediation</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">Audited QMS Standards</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
