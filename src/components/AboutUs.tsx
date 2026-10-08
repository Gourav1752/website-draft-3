import React from 'react';
import { ShieldCheck, HeartHandshake, Award, Sliders, CheckCircle } from 'lucide-react';
import aboutImage from '../assets/images/hero_financial_growth_1791443738688.jpg';

export const AboutUs: React.FC = () => {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Trust & Integrity',
      desc: 'We believe in transparent communication and responsible financial guidance across every interaction.',
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      icon: HeartHandshake,
      title: 'Client-First Approach',
      desc: "We focus on understanding the customer's financial requirements before recommending suitable solutions.",
      color: 'text-orange-500 bg-orange-500/10'
    },
    {
      icon: Award,
      title: 'Experienced Professionals',
      desc: 'Our seasoned team provides personalized assistance throughout the entire financial journey.',
      color: 'text-rose-500 bg-rose-500/10'
    },
    {
      icon: Sliders,
      title: 'Customized Solutions',
      desc: 'Financial solutions are tailored according to unique customer requirements and banking eligibility criteria.',
      color: 'text-emerald-500 bg-emerald-500/10'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            About Phoenix Financial Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Phoenix Financial Services is a trusted financial solutions provider dedicated to empowering individuals and businesses to achieve their financial goals. With a client-first approach and a team of experienced professionals, we provide customized financial services designed to create lasting value and help customers make informed financial decisions.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 4 Highlights Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all duration-200 shadow-xs group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Visual Illustration & Credibility Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
              <img
                src={aboutImage}
                alt="Phoenix Financial Services Consultation Team"
                className="w-full h-72 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  PAN India Financial Intermediary
                </div>
                <div className="text-lg font-bold">
                  Empowering Financial Decisions
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Connecting eligible borrowers with the most competitive institutional lenders in India.
                </p>
              </div>
            </div>

            {/* Credibility points */}
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-3">
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Our Core Operating Principle</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                As a Direct Selling Associate (DSA), our mission is to simplify complex financial paperwork, evaluate multi-bank eligibility, and ensure customers receive competitive terms without visiting multiple bank branches.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
