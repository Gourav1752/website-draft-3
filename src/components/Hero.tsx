import React from 'react';
import { ArrowRight, CheckCircle2, Building2, MapPin, Handshake, Users, Shield, TrendingUp, IndianRupee, FileCheck2 } from 'lucide-react';
import heroImage from '../assets/images/hero_financial_growth_1791443738688.jpg';
import { PartnerLogoBadge } from './PartnerLogos';

interface HeroProps {
  onOpenApply: (service?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background Ambient Glows (Orange / Coral / Amber) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-400/15 via-orange-500/10 to-rose-500/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300/80 dark:border-amber-700/50 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>PAN India DSA · Associated with Leading Banks & NBFCs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] font-display text-balance">
              Your Financial Goals.{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Our Trusted Solutions.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 text-balance">
              Loans, Insurance, Investments & Financial Solutions — Simplified for You.
            </p>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Phoenix Financial Services connects individuals, salaried professionals, business owners, and MSMEs with premier banking and NBFC partners across India for seamless end-to-end processing.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenApply('Personal Loan')}
                className="py-3.5 px-7 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Apply for a Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#loans"
                className="py-3.5 px-6 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-colors text-sm sm:text-base inline-flex items-center gap-2"
              >
                <span>Explore Solutions</span>
              </a>
            </div>

            {/* Quick Micro-Features */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Competitive Interest Rates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero Hidden Fees Guidance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>End-to-End Assistance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Illustration & Photo Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Gradient Border Container */}
              <div className="relative p-2 rounded-3xl bg-gradient-to-b from-amber-400/40 via-orange-500/20 to-rose-500/30 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 aspect-4/3 sm:aspect-16/10">
                  <img
                    src={heroImage}
                    alt="Phoenix Financial Services Executive Advisory"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* On-image caption badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Structured Financial Solutions</div>
                        <div className="text-[10px] text-slate-400">Personal · MSME · Housing · Wealth</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400">9+ Products</span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: Multi-Bank Network */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 max-w-[240px] animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-xs">
                    <PartnerLogoBadge code="HDFC" className="w-full h-full" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-xs">
                    <PartnerLogoBadge code="SBI" className="w-full h-full" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-xs">
                    <PartnerLogoBadge code="TATA" className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Partnered Banks</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">SBI · HDFC · Tata & More</div>
                </div>
              </div>

              {/* Floating Stat Card 2: Transparent Processing */}
              <div className="absolute -top-5 -right-3 sm:-right-5 bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 max-w-[210px] animate-in slide-in-from-top-2 duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Fast Processing</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Multi-Bank Comparisons</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Indicators below Hero */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">PAN India Presence</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Nationwide Network</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Multiple Banking Partners</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Banks, NBFCs & HFCs</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Experienced Professionals</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Advisory at Every Step</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Client-First Approach</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Customized Suitability</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
