import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutUs } from './components/AboutUs';
import { ServicesSection } from './components/ServicesSection';
import { LoanSolutions } from './components/LoanSolutions';
import { LoanCalculator } from './components/LoanCalculator';
import { InvestmentSection } from './components/InvestmentSection';
import { SipCalculator } from './components/SipCalculator';
import { PartnerNetwork } from './components/PartnerNetwork';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ISOCertification } from './components/ISOCertification';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinancialDisclaimer } from './components/FinancialDisclaimer';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { LeadPopup } from './components/LeadPopup';
import { LegalModal } from './components/LegalModal';

export default function App() {
  // Dark mode state management with localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('phoenix_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('phoenix_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('phoenix_theme', 'light');
    }
  }, [darkMode]);

  // Lead modal state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadService, setLeadService] = useState('Personal Loan');
  const [leadAmount, setLeadAmount] = useState<string | undefined>(undefined);

  // Legal modal state
  const [legalTitle, setLegalTitle] = useState('');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  const handleOpenApply = (service?: string, amount?: string) => {
    if (service) setLeadService(service);
    if (amount) setLeadAmount(amount);
    setIsLeadModalOpen(true);
  };

  const handleOpenLegal = (title: string) => {
    setLegalTitle(title);
    setIsLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-orange-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenApply={() => handleOpenApply('Personal Loan')}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenApply={(srv) => handleOpenApply(srv || 'Personal Loan')} />

        {/* 2. Trust & Metrics Section */}
        <TrustStats />

        {/* 3. About Us Section */}
        <AboutUs />

        {/* 4. Complete Services Section (6 Offerings) */}
        <ServicesSection onSelectService={(srv) => handleOpenApply(srv)} />

        {/* 5. Dedicated Loan Solutions (9 Products) */}
        <LoanSolutions onCheckEligibility={(loanName) => handleOpenApply(loanName)} />

        {/* 6. Interactive Loan EMI Calculator */}
        <LoanCalculator
          onApply={(amountStr) => handleOpenApply('Loan EMI Application', amountStr)}
          onTalkToExpert={() => handleOpenApply('Loan Advisory Enquiry')}
        />

        {/* 7. Investment Wealth Section */}
        <InvestmentSection onOpenLead={(srv) => handleOpenApply(srv)} />

        {/* 8. SIP & Lumpsum Mutual Fund Calculator */}
        <SipCalculator
          onStartJourney={(mode, amountStr) => handleOpenApply(mode, amountStr)}
        />

        {/* 9. Banking & Financial Partners Network */}
        <PartnerNetwork />

        {/* 10. Why Choose Us */}
        <WhyChooseUs />

        {/* 11. 4-Step Process Flow */}
        <HowItWorks />

        {/* 12. ISO 9001:2015 Certification Section */}
        <ISOCertification />

        {/* 13. Client Testimonials */}
        <Testimonials />

        {/* 14. Interactive FAQ Accordion (13 Questions) */}
        <FAQSection />

        {/* 15. Contact Us & Callback Request */}
        <ContactSection />

        {/* 16. Regulatory & Financial Disclaimers */}
        <FinancialDisclaimer />
      </main>

      {/* 17. Multi-column Footer */}
      <Footer
        onSelectService={(srv) => handleOpenApply(srv)}
        onOpenPolicy={handleOpenLegal}
      />

      {/* Polite First-Visit Lead Generation Popup */}
      <LeadPopup />

      {/* Interactive Modal triggered by Buttons */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setLeadAmount(undefined);
        }}
        initialService={leadService}
        initialAmount={leadAmount}
      />

      {/* Legal & Compliance Disclosures Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        title={legalTitle}
      />
    </div>
  );
}
