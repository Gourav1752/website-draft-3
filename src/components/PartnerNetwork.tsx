import React, { useState } from 'react';
import { Landmark, Shield, TrendingUp, Building2, CheckCircle2 } from 'lucide-react';

export const PartnerNetwork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    {
      id: 'govt',
      name: 'Public Sector & Housing',
      partners: [
        { name: 'State Bank of India (SBI)', code: 'SBI', type: 'Public Sector Bank' },
        { name: 'Punjab National Bank (PNB)', code: 'PNB', type: 'Public Sector Bank' },
        { name: 'Bank of India', code: 'BOI', type: 'Public Sector Bank' },
        { name: 'GIC Housing Finance', code: 'GIC HF', type: 'Housing Finance' },
      ]
    },
    {
      id: 'private',
      name: 'Private Banking',
      partners: [
        { name: 'HDFC Bank', code: 'HDFC', type: 'Premier Private Bank' },
        { name: 'IDFC FIRST Bank', code: 'IDFC', type: 'Private Commercial Bank' },
      ]
    },
    {
      id: 'nbfc',
      name: 'NBFCs & Housing Finance',
      partners: [
        { name: 'Aditya Birla Capital', code: 'ABC', type: 'NBFC / Conglomerate' },
        { name: 'Tata Capital Housing Finance', code: 'TATA', type: 'Housing Finance' },
        { name: 'Cholamandalam Finance', code: 'CHOLA', type: 'NBFC Vehicle & Mortgages' },
        { name: 'FlexiLoans', code: 'FLEXI', type: 'MSME Business Lending' },
        { name: 'Sammaan Capital', code: 'SAMMAAN', type: 'Mortgages & Housing' },
        { name: 'Grihum Housing Finance', code: 'GRIHUM', type: 'Affordable Housing' },
        { name: 'Fataak Pay', code: 'FATAAK', type: 'Fintech Credit Partner' },
        { name: 'WeRize', code: 'WERIZE', type: 'Socio-economic Lending' },
      ]
    },
    {
      id: 'mutual_funds',
      name: 'Mutual Funds & AMCs',
      partners: [
        { name: 'SBI Mutual Fund', code: 'SBI MF', type: 'Asset Management' },
        { name: 'HDFC Mutual Fund', code: 'HDFC MF', type: 'Asset Management' },
        { name: 'ICICI Prudential Mutual Fund', code: 'ICICI PRU MF', type: 'Asset Management' },
        { name: 'Aditya Birla Sun Life MF', code: 'ABSL MF', type: 'Asset Management' },
      ]
    },
    {
      id: 'insurance',
      name: 'Insurance Partners',
      partners: [
        { name: 'ICICI Prudential Life', code: 'ICICI LIFE', type: 'Life Insurance' },
        { name: 'Central Life', code: 'CENTRAL', type: 'Life Insurance' },
        { name: 'ICICI Lombard General', code: 'ICICI LOMBARD', type: 'General & Health' },
        { name: 'IndusInd General', code: 'INDUSIND', type: 'General Insurance' },
        { name: 'Nippon Life Insurance', code: 'NIPPON LIFE', type: 'Life Insurance' },
      ]
    }
  ];

  const allPartners = categories.flatMap((cat) => cat.partners);

  const displayedPartners = activeTab === 'all'
    ? allPartners
    : categories.find((c) => c.id === activeTab)?.partners || [];

  return (
    <section id="partners" className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Institutional Association
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Our Banking & Financial Partners
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Associated with leading Banks, NBFCs and Housing Finance Companies across India for multi-institution product comparisons.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Partners ({allPartners.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedPartners.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors">
                  {p.code}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" title="Active Sourcing Channel" />
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                  {p.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {p.type}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>DSA Channel Partner</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification & Legal Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Important Notice:</strong> Phoenix Financial Services acts as an independent Direct Selling Associate (DSA) and channel intermediary. Logos, brand names, and trademarks belong strictly to their respective registered Banks, NBFCs, and financial entities. Sourcing is subject to respective partner sanction guidelines.
          </p>
        </div>

      </div>
    </section>
  );
};
