import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  const getContent = () => {
    switch (title) {
      case 'Privacy Policy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Phoenix Financial Services is committed to protecting your personal data and privacy. We collect customer contact and financial requirement information exclusively for the purpose of assessing eligibility, processing loan applications, and connecting you with appropriate partner Banks, NBFCs, and financial institutions.
            </p>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Data Handling & Security</h4>
            <p>
              We implement industry-standard encryption and operational safeguards to protect your records. Your contact details are never traded, sold, or shared with unauthorized third-party marketing entities. Information is transmitted to partner lending institutions only with your affirmative consent for loan sourcing.
            </p>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Customer Rights</h4>
            <p>
              You may request access to, correction of, or deletion of your contact records from our active lead repository at any time by contacting our corporate helpdesk.
            </p>
          </div>
        );
      case 'Terms & Conditions':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              By accessing the Phoenix Financial Services website, using our financial calculators, or submitting an inquiry form, you agree to these Terms and Conditions.
            </p>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Intermediary Capacity</h4>
            <p>
              Phoenix Financial Services acts purely as a Direct Selling Associate (DSA) and channel distributor. We are not a bank, non-banking financial company (NBFC), or deposit-taking entity. We do not issue credit directly.
            </p>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Independent Lender Terms</h4>
            <p>
              All loan approvals, sanction letters, interest rate tiers, processing fees, documentation requirements, and fund disbursements are strictly subject to the respective partner lender’s internal credit guidelines and regulatory directives.
            </p>
          </div>
        );
      case 'Cookie Policy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Our website uses essential browser cookies and local storage tokens to remember your preferences (such as Light/Dark mode preference and lead submission statuses) and to ensure smooth performance across sessions.
            </p>
            <p>
              We do not utilize invasive advertising trackers. You can disable cookies in your browser settings at any time without impacting core informational access on our website.
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Phoenix Financial Services operates as a Direct Selling Associate/financial services intermediary and facilitates loan and financial product applications through its associated financial institutions.
            </p>
            <p>
              Phoenix Financial Services does not guarantee loan approval, interest rates, processing time or disbursement. All approvals, rates, fees, eligibility criteria and terms are determined solely by the respective lender/institution and are subject to their policies and applicable regulations.
            </p>
            <p>
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not guarantee future returns.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
        
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {getContent()}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-semibold text-xs cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
