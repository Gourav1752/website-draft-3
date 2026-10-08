import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import phoenixLogo from '../assets/images/phoenix_financial_logo_1791453365893.jpg';

interface FooterProps {
  onSelectService: (service: string) => void;
  onOpenPolicy: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenPolicy }) => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Loans', href: '#loans' },
    { name: 'Insurance', href: '#services' },
    { name: 'Investments', href: '#investments' },
    { name: 'Calculators', href: '#calculators' },
    { name: 'Partners', href: '#partners' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'Personal Loan', key: 'Personal Loan' },
    { name: 'Business Loan', key: 'Business Loan' },
    { name: 'Home Loan', key: 'Home Loan' },
    { name: 'Loan Against Property (LAP)', key: 'Loan Against Property (LAP)' },
    { name: 'Mortgage Loan', key: 'Mortgage Loan' },
    { name: 'Insurance Solutions', key: 'Insurance Solutions' },
    { name: 'Mutual Funds', key: 'Mutual Funds & SIP' },
    { name: 'Systematic Investment Plan (SIP)', key: 'Mutual Funds & SIP' },
  ];

  const legalLinks = [
    'Privacy Policy',
    'Terms & Conditions',
    'Disclaimer',
    'Cookie Policy'
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-slate-900 rounded-[10px] overflow-hidden flex items-center justify-center">
                  <img
                    src={phoenixLogo}
                    alt="Phoenix Financial Services"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Phoenix <span className="text-orange-500">Financial</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Phoenix Financial Services is a premier Direct Selling Associate (DSA) company associated with multiple Banks, NBFCs, and Housing Finance Companies across India. Providing end-to-end financial solutions for individuals, professionals, and MSMEs.
            </p>

            {/* Direct Contact Details */}
            <div className="pt-1 space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-1.5">
                <span className="text-amber-400 font-semibold">Phone:</span>
                <a href="tel:+918670843143" className="hover:text-white transition-colors">+91 86708 43143</a>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-amber-400 font-semibold">Email:</span>
                <a href="mailto:servicesphoenixfinancial@gmail.com" className="hover:text-white transition-colors break-all">servicesphoenixfinancial@gmail.com</a>
              </p>
              <p className="text-[11px] text-slate-400 leading-normal pt-1">
                <span className="text-amber-400 font-semibold">Office:</span> 10th Floor, 10ES2, EAST TOWER, Mani Casadona, International Financial Hub(CBD), New Town, Chakpachuria, West Bengal 700160
              </p>
            </div>

            {/* Social Media Placeholders */}
            <div className="pt-2 flex items-center gap-3">
              {['LinkedIn', 'Twitter/X', 'Facebook', 'Instagram'].map((network) => (
                <span
                  key={network}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
                  title={`${network} Official Channel Placeholder`}
                >
                  {network}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Financial Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => onSelectService(service.key)}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Policy (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {legalLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onOpenPolicy(item)}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4 text-[11px] text-slate-500 leading-relaxed">
              PAN India Intermediation · ISO 9001:2015 QMS Standard Compliant Procedures
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Phoenix Financial Services. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
            <span>PAN India DSA · Partnered with Leading Indian Banks & NBFCs</span>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('phoenix_toggle_admin'));
                  const partnersEl = document.getElementById('partners');
                  if (partnersEl) partnersEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              title="Toggle Partner Logo Admin Tool (or press Cmd+Shift+E / Ctrl+Shift+E)"
              className="text-slate-600 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-[11px] underline underline-offset-2 cursor-pointer"
            >
              Partner Admin Tool
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
