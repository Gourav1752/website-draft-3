import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import phoenixLogo from '../assets/images/phoenix_financial_logo_1791453365893.jpg';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenApply: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenApply }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Loans', href: '#loans' },
    { name: 'Insurance', href: '#insurance' },
    { name: 'Investments', href: '#investments' },
    { name: 'Calculators', href: '#calculators' },
    { name: 'Partners', href: '#partners' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: { name: string; href: string }) => {
    if (link.name === 'Insurance') {
      e.preventDefault();
      onOpenApply('Insurance Solutions');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80'
          : 'py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-100 dark:border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-hidden"
            aria-label="Phoenix Financial Services Home"
          >
            {/* Phoenix Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-all flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-slate-900 rounded-[10px] overflow-hidden flex items-center justify-center">
                <img
                  src={phoenixLogo}
                  alt="Phoenix Financial Services"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-display">
                Phoenix <span className="text-orange-500">Financial</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">
                Services · PAN India DSA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Apply Now Primary CTA */}
            <button
              onClick={() => onOpenApply('Personal Loan')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link);
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenApply('Personal Loan');
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-xl shadow-sm cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
