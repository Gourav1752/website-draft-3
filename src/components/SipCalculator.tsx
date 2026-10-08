import React, { useState, useMemo } from 'react';
import { ArrowRight, TrendingUp, AlertCircle, PieChart, Sparkles } from 'lucide-react';
import { formatINR, formatINRShort } from '../lib/api';

interface SipCalculatorProps {
  onStartJourney: (mode: string, amount: string) => void;
}

export const SipCalculator: React.FC<SipCalculatorProps> = ({ onStartJourney }) => {
  const [calcMode, setCalcMode] = useState<'sip' | 'lumpsum'>('sip');

  // SIP inputs
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000); // ₹10,000/mo
  const [sipRate, setSipRate] = useState<number>(12); // 12% p.a.
  const [sipYears, setSipYears] = useState<number>(10); // 10 years

  // Lumpsum inputs
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(500000); // ₹5 Lakhs
  const [lumpsumRate, setLumpsumRate] = useState<number>(12); // 12% p.a.
  const [lumpsumYears, setLumpsumYears] = useState<number>(10); // 10 years

  // SIP Calculation
  // M = P × ({[1 + i]^n - 1} / i) × (1 + i)
  const sipResult = useMemo(() => {
    const n = sipYears * 12;
    const i = sipRate / 12 / 100;
    const invested = monthlyAmount * n;

    if (i <= 0 || n <= 0) {
      return { invested, returns: 0, total: invested, investedPct: 100, returnsPct: 0 };
    }

    const futureValue = monthlyAmount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const returns = futureValue - invested;
    const investedPct = Math.round((invested / futureValue) * 100);
    const returnsPct = 100 - investedPct;

    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(futureValue),
      investedPct,
      returnsPct
    };
  }, [monthlyAmount, sipRate, sipYears]);

  // Lumpsum Calculation
  // A = P × (1 + r/100)^n
  const lumpsumResult = useMemo(() => {
    const invested = lumpsumAmount;
    const total = lumpsumAmount * Math.pow(1 + lumpsumRate / 100, lumpsumYears);
    const returns = total - invested;
    const investedPct = Math.round((invested / total) * 100);
    const returnsPct = 100 - investedPct;

    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(total),
      investedPct,
      returnsPct
    };
  }, [lumpsumAmount, lumpsumRate, lumpsumYears]);

  const activeResult = calcMode === 'sip' ? sipResult : lumpsumResult;

  // Chart proportions
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const investedStroke = (activeResult.investedPct / 100) * circumference;
  const returnsStroke = (activeResult.returnsPct / 100) * circumference;

  return (
    <section id="sip-calculator" className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Wealth Projection Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            {calcMode === 'sip' ? 'SIP Calculator' : 'Mutual Fund / Lumpsum Calculator'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Visualize the exponential power of compounding over time with disciplined periodic or one-time investments.
          </p>

          {/* SIP | Lumpsum Segmented Toggle */}
          <div className="inline-flex p-1 mt-6 bg-slate-200/70 dark:bg-slate-800 rounded-2xl border border-slate-300/60 dark:border-slate-700">
            <button
              onClick={() => setCalcMode('sip')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                calcMode === 'sip'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              SIP (Monthly)
            </button>
            <button
              onClick={() => setCalcMode('lumpsum')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                calcMode === 'lumpsum'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lumpsum (One-Time)
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Input Controls (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
              
              {calcMode === 'sip' ? (
                <>
                  {/* Monthly Investment */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Monthly Investment Amount
                      </label>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-semibold text-slate-500">₹</span>
                        <input
                          type="number"
                          min={500}
                          max={500000}
                          step={500}
                          value={monthlyAmount}
                          onChange={(e) => setMonthlyAmount(Math.max(500, Number(e.target.value)))}
                          className="w-24 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={100000}
                      step={500}
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                      <span>₹500 / mo</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{formatINR(monthlyAmount)} per month</span>
                      <span>₹1,00,000 / mo</span>
                    </div>
                  </div>

                  {/* Expected Return Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Expected Annual Return (% p.a.)
                      </label>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          step={0.5}
                          min={1}
                          max={30}
                          value={sipRate}
                          onChange={(e) => setSipRate(Math.max(1, Number(e.target.value)))}
                          className="w-16 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                        />
                        <span className="text-sm font-semibold text-slate-500">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      step={0.5}
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                      <span>1%</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{sipRate}% CAGR</span>
                      <span>25%</span>
                    </div>
                  </div>

                  {/* Duration Years */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Investment Duration (Years)
                      </label>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          min={1}
                          max={35}
                          value={sipYears}
                          onChange={(e) => setSipYears(Math.max(1, Number(e.target.value)))}
                          className="w-14 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                        />
                        <span className="text-xs font-semibold text-slate-500">Yrs</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                      <span>1 Year</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{sipYears} Years ({sipYears * 12} Installments)</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Lumpsum Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Initial One-Time Investment
                      </label>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-semibold text-slate-500">₹</span>
                        <input
                          type="number"
                          min={5000}
                          max={50000000}
                          step={5000}
                          value={lumpsumAmount}
                          onChange={(e) => setLumpsumAmount(Math.max(5000, Number(e.target.value)))}
                          className="w-28 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={5000000}
                      step={10000}
                      value={lumpsumAmount}
                      onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                      <span>₹10,000</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{formatINRShort(lumpsumAmount)}</span>
                      <span>₹50 Lakhs</span>
                    </div>
                  </div>

                  {/* Lumpsum Return Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Expected Annual Return (% p.a.)
                      </label>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          step={0.5}
                          min={1}
                          max={30}
                          value={lumpsumRate}
                          onChange={(e) => setLumpsumRate(Math.max(1, Number(e.target.value)))}
                          className="w-16 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                        />
                        <span className="text-sm font-semibold text-slate-500">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      step={0.5}
                      value={lumpsumRate}
                      onChange={(e) => setLumpsumRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                      <span>1%</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{lumpsumRate}% CAGR</span>
                      <span>25%</span>
                    </div>
                  </div>

                  {/* Lumpsum Years */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Investment Period (Years)
                      </label>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={lumpsumYears}
                          onChange={(e) => setLumpsumYears(Math.max(1, Number(e.target.value)))}
                          className="w-14 text-right font-bold text-slate-900 dark:text-white text-sm bg-transparent focus:outline-hidden tabular-nums"
                        />
                        <span className="text-xs font-semibold text-slate-500">Yrs</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={lumpsumYears}
                      onChange={(e) => setLumpsumYears(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                      <span>1 Year</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{lumpsumYears} Years Horizon</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </>
              )}

              {/* Informative Compounding Indicator */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  Compound growth accrues progressively. Higher tenures typically magnify wealth creation via the multiplier effect.
                </span>
              </div>
            </div>

            {/* Output & Visual Breakdown (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50/80 dark:bg-slate-800/40 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              
              <div>
                {/* Future Expected Value Highlight */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-300/40 dark:border-rose-700/30 text-center mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Expected Future Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums font-display">
                    {formatINR(activeResult.total)}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                    in {calcMode === 'sip' ? sipYears : lumpsumYears} years
                  </span>
                </div>

                {/* Donut Chart: Invested vs Returns */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-6">
                  {/* SVG Donut */}
                  <div className="relative w-36 h-36 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#e2e8f0"
                        strokeWidth="16"
                        fill="none"
                        className="dark:stroke-slate-700"
                      />
                      {/* Invested segment */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#f97316"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${investedStroke} ${circumference}`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      {/* Returns segment */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#10b981"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${returnsStroke} ${circumference}`}
                        strokeDashoffset={-investedStroke}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-slate-400 font-medium">Gain</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+{activeResult.returnsPct}%</span>
                    </div>
                  </div>

                  {/* Breakdown Legend */}
                  <div className="space-y-3 w-full">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-slate-600 dark:text-slate-300">Total Invested</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {formatINR(activeResult.invested)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-slate-600 dark:text-slate-300">Estimated Returns</span>
                      </div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {formatINR(activeResult.returns)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">Total Maturity Value</span>
                      <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {formatINR(activeResult.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => onStartJourney(
                    calcMode === 'sip' ? 'Mutual Funds (SIP)' : 'Mutual Funds (Lumpsum)',
                    `${formatINR(calcMode === 'sip' ? monthlyAmount : lumpsumAmount)} (${calcMode === 'sip' ? 'Monthly' : 'One-time'})`
                  )}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Your SIP Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Required Mutual Fund Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
            <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Historical returns are illustrative and do not guarantee future performance.
          </p>
        </div>

      </div>
    </section>
  );
};
