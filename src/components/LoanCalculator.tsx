import React, { useState, useMemo } from 'react';
import { IndianRupee, Calculator, ArrowRight, MessageSquare, Percent, Calendar } from 'lucide-react';
import { formatINR, formatINRShort } from '../lib/api';

interface LoanCalculatorProps {
  onApply: (amount: string) => void;
  onTalkToExpert: () => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onApply, onTalkToExpert }) => {
  const [amount, setAmount] = useState<number>(2500000); // 25 Lakhs default
  const [rate, setRate] = useState<number>(9.5); // 9.5% p.a.
  const [tenure, setTenure] = useState<number>(20); // 20 years default
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');

  // Calculate EMI, Total Interest, and Total Amount Payable
  const { emi, totalInterest, totalPayment, principalPct, interestPct, months } = useMemo(() => {
    const totalMonths = tenureUnit === 'years' ? tenure * 12 : tenure;
    if (totalMonths <= 0 || rate <= 0 || amount <= 0) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPct: 100,
        interestPct: 0,
        months: totalMonths
      };
    }

    const monthlyRate = rate / 12 / 100;
    const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
    const calculatedEmi = (amount * monthlyRate * compoundFactor) / (compoundFactor - 1);
    const calculatedTotalPayment = calculatedEmi * totalMonths;
    const calculatedTotalInterest = calculatedTotalPayment - amount;

    const pPct = Math.round((amount / calculatedTotalPayment) * 100);
    const iPct = 100 - pPct;

    return {
      emi: Math.round(calculatedEmi),
      totalInterest: Math.round(calculatedTotalInterest),
      totalPayment: Math.round(calculatedTotalPayment),
      principalPct: pPct,
      interestPct: iPct,
      months: totalMonths
    };
  }, [amount, rate, tenure, tenureUnit]);

  // SVG Donut calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (principalPct / 100) * circumference;
  const interestStroke = (interestPct / 100) * circumference;

  return (
    <section id="calculators" className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Interactive Financial Planning
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Loan EMI Calculator
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Plan your monthly outflow before applying. Real-time calculations for personal, business, home loans, and mortgage lines.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
              
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Loan Amount
                  </label>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-semibold text-slate-500">₹</span>
                    <input
                      type="number"
                      value={amount}
                      min={50000}
                      max={100000000}
                      step={50000}
                      onChange={(e) => setAmount(Math.max(10000, Number(e.target.value)))}
                      className="w-28 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={20000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                  <span>₹1 Lakh</span>
                  <span className="font-semibold text-orange-600 dark:text-amber-400">{formatINRShort(amount)}</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Interest Rate (% per annum)
                  </label>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      step={0.1}
                      min={6}
                      max={30}
                      value={rate}
                      onChange={(e) => setRate(Math.max(1, Number(e.target.value)))}
                      className="w-16 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                    />
                    <span className="text-sm font-semibold text-slate-500">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={6}
                  max={24}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                  <span>6.0%</span>
                  <span className="font-semibold text-orange-600 dark:text-amber-400">{rate}% p.a.</span>
                  <span>24.0%</span>
                </div>
              </div>

              {/* Loan Tenure with Years/Months toggle */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Loan Tenure
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => {
                          if (tenureUnit === 'months') {
                            setTenure(Math.max(1, Math.round(tenure / 12)));
                            setTenureUnit('years');
                          }
                        }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          tenureUnit === 'years'
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Years
                      </button>
                      <button
                        onClick={() => {
                          if (tenureUnit === 'years') {
                            setTenure(tenure * 12);
                            setTenureUnit('months');
                          }
                        }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          tenureUnit === 'months'
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Months
                      </button>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <input
                        type="number"
                        min={1}
                        max={tenureUnit === 'years' ? 30 : 360}
                        value={tenure}
                        onChange={(e) => setTenure(Math.max(1, Number(e.target.value)))}
                        className="w-14 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={tenureUnit === 'years' ? 30 : 360}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                  <span>{tenureUnit === 'years' ? '1 Year' : '1 Month'}</span>
                  <span className="font-semibold text-orange-600 dark:text-amber-400">
                    {tenure} {tenureUnit === 'years' ? 'Years' : 'Months'} ({months} Months)
                  </span>
                  <span>{tenureUnit === 'years' ? '30 Years' : '360 Months'}</span>
                </div>
              </div>

              {/* Informative Note */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Calculator className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  Standard Reducing Balance EMI Formula applied. Actual lender sanction terms may include processing fees, GST, and insurance charges.
                </span>
              </div>
            </div>

            {/* Right Output & Donut Chart (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50/80 dark:bg-slate-800/40 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              
              <div>
                {/* Monthly EMI Result Highlight */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/40 dark:border-amber-700/30 text-center mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Monthly Loan EMI
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums font-display">
                    {formatINR(emi)}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                    payable for {months} consecutive months
                  </span>
                </div>

                {/* Donut Chart: Principal vs Interest */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-6">
                  {/* SVG Donut */}
                  <div className="relative w-36 h-36 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#e2e8f0"
                        strokeWidth="16"
                        fill="none"
                        className="dark:stroke-slate-700"
                      />
                      {/* Principal segment */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#f97316"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${principalStroke} ${circumference}`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      {/* Interest segment */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#f43f5e"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${interestStroke} ${circumference}`}
                        strokeDashoffset={-principalStroke}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-slate-400 font-medium">Split</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{principalPct}% / {interestPct}%</span>
                    </div>
                  </div>

                  {/* Breakdown Legend */}
                  <div className="space-y-3 w-full">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-slate-600 dark:text-slate-300">Principal Amount</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {formatINR(amount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500" />
                        <span className="text-slate-600 dark:text-slate-300">Total Interest</span>
                      </div>
                      <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                        {formatINR(totalInterest)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">Total Payable</span>
                      <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {formatINR(totalPayment)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4">
                <button
                  onClick={() => onApply(`${formatINR(amount)} (${tenure} ${tenureUnit} @ ${rate}%)`)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for This Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onTalkToExpert}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  <span>Talk to an Expert</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
