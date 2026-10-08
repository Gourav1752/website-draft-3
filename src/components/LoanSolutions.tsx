import React, { useState } from 'react';
import { 
  User, 
  Building, 
  Home, 
  KeyRound, 
  Coins, 
  HeartHandshake, 
  TrendingUp, 
  CreditCard, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2,
  Filter
} from 'lucide-react';

interface LoanSolutionsProps {
  onCheckEligibility: (loanName: string) => void;
}

export const LoanSolutions: React.FC<LoanSolutionsProps> = ({ onCheckEligibility }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'retail' | 'business' | 'property'>('all');

  const loans = [
    {
      id: 'personal-loan',
      name: 'Personal Loan',
      category: 'retail',
      icon: User,
      description: 'Collateral-free multi-purpose financing for emergencies, weddings, medical, travel or debt consolidation.',
      indicativeTenure: 'Up to 5 Years',
      ticketSize: 'Up to ₹40 Lakhs',
      highlight: 'Minimal Documentation'
    },
    {
      id: 'business-loan',
      name: 'Business Loan',
      category: 'business',
      icon: Building,
      description: 'Fuel business scaling, machinery purchase, vendor payments, or working capital for MSMEs and enterprises.',
      indicativeTenure: 'Up to 7 Years',
      ticketSize: 'Up to ₹2 Crores',
      highlight: 'Collateral-free options available'
    },
    {
      id: 'home-loan',
      name: 'Home Loan',
      category: 'property',
      icon: Home,
      description: 'Competitive interest rate housing loans for buying apartments, plots, self-construction or home renovations.',
      indicativeTenure: 'Up to 30 Years',
      ticketSize: 'Up to ₹10 Crores',
      highlight: 'Longest Repayment Tenure'
    },
    {
      id: 'loan-against-property',
      name: 'Loan Against Property (LAP)',
      category: 'property',
      icon: KeyRound,
      description: 'Unlock maximum equity trapped in residential, commercial, or industrial real estate at lower interest rates.',
      indicativeTenure: 'Up to 15 Years',
      ticketSize: 'Up to ₹15 Crores',
      highlight: 'High Loan-to-Value Ratio'
    },
    {
      id: 'mortgage-loan',
      name: 'Mortgage Loan',
      category: 'property',
      icon: Coins,
      description: 'Secured credit facilities against existing property assets with structured flexible repayment options.',
      indicativeTenure: 'Up to 15 Years',
      ticketSize: 'Customized based on valuation',
      highlight: 'Lower Interest Burden'
    },
    {
      id: 'pension-loan',
      name: 'Pension Loan',
      category: 'retail',
      icon: HeartHandshake,
      description: 'Tailored hassle-free credit assistance for Central, State, and Defence government pensioners in India.',
      indicativeTenure: 'Up to 5 Years',
      ticketSize: 'Based on pension credit',
      highlight: 'Priority Senior Processing'
    },
    {
      id: 'working-capital-loan',
      name: 'Working Capital Loan',
      category: 'business',
      icon: TrendingUp,
      description: 'Bridge cyclical liquidity gaps, seasonal inventory demands, and everyday operational expenditures seamlessly.',
      indicativeTenure: '12 to 36 Months',
      ticketSize: 'Tailored to turnover',
      highlight: 'Smooth Cashflow Cycles'
    },
    {
      id: 'od-cc-limit',
      name: 'OD / CC Limit',
      category: 'business',
      icon: CreditCard,
      description: 'Overdraft and Cash Credit facility where interest is charged only on the exact funds utilized.',
      indicativeTenure: 'Annual Renewal',
      ticketSize: 'Linked to business stock & book debts',
      highlight: 'Pay Interest Only on Utilized Funds'
    },
    {
      id: 'balance-transfer-loan',
      name: 'Balance Transfer Loan',
      category: 'retail',
      icon: RefreshCw,
      description: 'Switch your existing high-cost loan to a partner bank with reduced interest rate and top-up funding.',
      indicativeTenure: 'Matches or extends tenure',
      ticketSize: 'Existing principal + top-up',
      highlight: 'Substantial Interest Savings'
    }
  ];

  const filteredLoans = filterCategory === 'all' 
    ? loans 
    : loans.filter(l => l.category === filterCategory);

  return (
    <section id="loans" className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Retail, MSME & Secured Financing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
              Loan Solutions Designed Around Your Needs
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
              Explore our full suite of 9 specialized credit facilities. Our multi-lender network helps evaluate eligibility against diverse bank policies simultaneously.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start md:self-end">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterCategory === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Loans (9)
            </button>
            <button
              onClick={() => setFilterCategory('retail')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterCategory === 'retail'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Retail & Personal
            </button>
            <button
              onClick={() => setFilterCategory('business')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterCategory === 'business'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Business & MSME
            </button>
            <button
              onClick={() => setFilterCategory('property')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterCategory === 'property'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Mortgage & Property
            </button>
          </div>
        </div>

        {/* 9 Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredLoans.map((loan) => {
            const Icon = loan.icon;
            return (
              <div
                key={loan.id}
                className="group relative p-7 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-orange-500/50 dark:hover:border-amber-500/50 hover:bg-white dark:hover:bg-slate-800/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Highlight */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/15 via-orange-500/15 to-rose-500/15 text-orange-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                      {loan.highlight}
                    </span>
                  </div>

                  {/* Loan Name */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                    {loan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {loan.description}
                  </p>

                  {/* Specification details */}
                  <div className="space-y-2 py-3 border-y border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Indicative Limit:</span>
                      <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{loan.ticketSize}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Repayment Tenure:</span>
                      <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{loan.indicativeTenure}</span>
                    </div>
                  </div>
                </div>

                {/* Check Eligibility Button */}
                <div className="mt-6">
                  <button
                    onClick={() => onCheckEligibility(loan.name)}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-900 dark:text-white bg-slate-200/70 hover:bg-orange-500 hover:text-white dark:bg-slate-700 dark:hover:bg-amber-500 dark:hover:text-slate-950 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-sm"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on loan processing */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            * Final sanctioned amount, interest rate, tenure and processing fees are determined by partner lending institutions according to applicant eligibility, CIBIL score and credit assessment.
          </p>
        </div>

      </div>
    </section>
  );
};
