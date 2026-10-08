import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is a DSA?',
      a: 'A Direct Selling Associate (DSA) is an authorized intermediary channel partner associated with Banks, Non-Banking Financial Companies (NBFCs), and Housing Finance Companies (HFCs). DSAs help consumers identify suitable loan products, facilitate documentation, and assist throughout the submission and processing stages.'
    },
    {
      q: 'Does Phoenix Financial Services directly provide loans?',
      a: 'No. Phoenix Financial Services operates strictly as a financial services intermediary and Direct Selling Associate (DSA). We do not directly lend money or issue credit. All loan underwriting, interest rate determinations, sanctions, and fund disbursements are handled solely by the respective partner Banks and NBFCs.'
    },
    {
      q: 'What types of loans are available?',
      a: 'Through our partner network, we facilitate 9+ categories of credit: Personal Loans, Business Loans, Home Loans, Loan Against Property (LAP), Mortgage Loans, Pension Loans, Working Capital Loans, OD/CC Limits, and Balance Transfer Facilities.'
    },
    {
      q: 'What documents are generally required?',
      a: 'Standard documentation typically includes: (1) Identity & Address Proof (Aadhaar, PAN, Passport/Voter ID), (2) Income Proof (Latest salary slips & Form 16 for salaried; ITR with computation & audited balance sheets for self-employed), and (3) Bank statements for the last 6 to 12 months. Additional property papers or business registration certificates apply for secured or MSME loans.'
    },
    {
      q: 'How is loan eligibility determined?',
      a: 'Lenders evaluate several factors including your monthly net income, current fixed obligation-to-income ratio (FOIR), CIBIL/credit score, employment stability, business vintage, existing liabilities, and collateral valuation (for secured facilities).'
    },
    {
      q: 'How long does loan processing take?',
      a: 'Turnaround time varies by loan type and lender policies. Unsecured Personal Loans may be sanctioned in 24 to 72 hours upon complete documentation, whereas secured loans like Home Loans or LAP typically take 7 to 15 working days due to legal and technical property verification.'
    },
    {
      q: 'Can self-employed customers apply?',
      a: 'Yes. Self-employed professionals (doctors, CAs, architects) and non-professional business owners can apply for both retail loans and dedicated business facilities, subject to fulfilling partner bank turnover and income tax guidelines.'
    },
    {
      q: 'Can businesses apply for financing?',
      a: 'Yes. Proprietorships, partnerships, LLPs, and private limited companies can apply for Business Loans, Working Capital Loans, and OD/CC limits based on GST returns, audited financials, and operational cash flows.'
    },
    {
      q: 'What is a Balance Transfer?',
      a: 'A Balance Transfer allows you to transfer the outstanding principal balance of an existing high-interest loan (such as a home or personal loan) from your current lender to another financial institution offering a lower interest rate, potentially saving significant interest or providing top-up liquidity.'
    },
    {
      q: 'What is an OD/CC facility?',
      a: 'An Overdraft (OD) or Cash Credit (CC) limit is a revolving credit facility sanctioned by a bank against business assets or collateral. You can withdraw funds up to the sanctioned limit as needed, and interest is charged only on the exact amount used for the number of days utilized.'
    },
    {
      q: 'What is a SIP?',
      a: 'A Systematic Investment Plan (SIP) is a disciplined method of investing a fixed sum into a selected mutual fund scheme at regular intervals (typically monthly). It enables rupee cost averaging and compounds wealth over long investment horizons.'
    },
    {
      q: 'Are mutual fund returns guaranteed?',
      a: 'No. Mutual funds are market-linked instruments and do not offer guaranteed returns. Returns fluctuate with market movements and fund performance. Investors should read all scheme information documents carefully before investing.'
    },
    {
      q: 'Are loan approvals guaranteed?',
      a: 'No. Phoenix Financial Services does not and cannot guarantee loan approvals. Final approval, sanctioned amount, applicable interest rate, processing charges, and disbursement remain exclusively under the discretion of the partner bank or NBFC in accordance with their regulatory and credit underwriting norms.'
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Understand how our DSA model works, lender policies, and financial product parameters.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/40 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
