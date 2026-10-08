import React from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      initials: 'RS',
      name: 'R. Sharma [Client Name Placeholder]',
      role: 'Salaried Professional',
      location: 'New Delhi',
      service: 'Home Loan Assistance',
      quote:
        'Phoenix Financial Services helped me compare home loan offers across two leading housing finance companies. Their team guided me through the property verification documentation and follow-ups professionally.',
    },
    {
      initials: 'AM',
      name: 'A. Mehta [Client Name Placeholder]',
      role: 'Business Owner',
      location: 'Mumbai, Maharashtra',
      service: 'Working Capital & OD Facility',
      quote:
        'Managing cash flow during seasonal stock purchases was critical for our manufacturing firm. The Phoenix team evaluated our balance sheet and helped us apply for an appropriate OD facility with our preferred bank.',
    },
    {
      initials: 'VK',
      name: 'V. Kulkarni [Client Name Placeholder]',
      role: 'IT Consultant',
      location: 'Bengaluru, Karnataka',
      service: 'Balance Transfer Loan',
      quote:
        'I was paying a higher interest rate on an existing loan. Phoenix Financial Services evaluated my repayment history and helped transfer the balance to an institution offering more competitive terms.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Client Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Customer Testimonials
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Feedback from individuals and enterprises who have utilized our DSA facilitation services.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-orange-600 dark:text-amber-400 flex items-center justify-center">
                    <Quote className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-md">
                    {item.service}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-bold text-sm flex items-center justify-center shrink-0">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role} · {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Note */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            * Representative client feedback slots. Approvals, sanctioned rates, and disbursal timelines depend strictly on institutional credit policy and applicant eligibility.
          </p>
        </div>

      </div>
    </section>
  );
};
