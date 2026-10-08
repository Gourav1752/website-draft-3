import pnbLogo from '../assets/images/regenerated_image_1791457744510.jpg';

export interface PartnerConfig {
  code: string;
  name: string;
  category: 'govt' | 'private' | 'nbfc' | 'mutual_funds' | 'insurance';
  type: string;
  defaultImageUrl?: string;
}

export const PARTNER_LIST: PartnerConfig[] = [
  // Public Sector & Housing
  { code: 'SBI', name: 'State Bank of India', category: 'govt', type: 'Public Sector Bank' },
  { code: 'PNB', name: 'Punjab National Bank', category: 'govt', type: 'Public Sector Bank', defaultImageUrl: pnbLogo },
  { code: 'BOI', name: 'Bank of India', category: 'govt', type: 'Public Sector Bank' },
  { code: 'GIC HF', name: 'GIC Housing Finance', category: 'govt', type: 'Housing Finance' },

  // Private Banking
  { code: 'HDFC', name: 'HDFC Bank', category: 'private', type: 'Premier Private Bank' },
  { code: 'IDFC', name: 'IDFC FIRST Bank', category: 'private', type: 'Private Commercial Bank' },

  // NBFCs & Housing Finance
  { code: 'ABC', name: 'Aditya Birla Capital', category: 'nbfc', type: 'NBFC / Conglomerate' },
  { code: 'TATA', name: 'Tata Capital Housing Finance', category: 'nbfc', type: 'Housing Finance' },
  { code: 'CHOLA', name: 'Cholamandalam Finance', category: 'nbfc', type: 'NBFC Vehicle & Mortgages' },
  { code: 'FLEXI', name: 'FlexiLoans', category: 'nbfc', type: 'MSME Business Lending' },
  { code: 'SAMMAAN', name: 'Sammaan Capital', category: 'nbfc', type: 'Mortgages & Housing' },
  { code: 'GRIHUM', name: 'Grihum Housing Finance', category: 'nbfc', type: 'Affordable Housing' },
  { code: 'FATAAK', name: 'Fataak Pay', category: 'nbfc', type: 'Fintech Credit Partner' },
  { code: 'WERIZE', name: 'WeRize', category: 'nbfc', type: 'Socio-economic Lending' },

  // Mutual Funds & AMCs
  { code: 'SBI MF', name: 'SBI Mutual Fund', category: 'mutual_funds', type: 'Asset Management' },
  { code: 'HDFC MF', name: 'HDFC Mutual Fund', category: 'mutual_funds', type: 'Asset Management' },
  { code: 'ICICI PRU MF', name: 'ICICI Prudential Mutual Fund', category: 'mutual_funds', type: 'Asset Management' },
  { code: 'ABSL MF', name: 'Aditya Birla Sun Life MF', category: 'mutual_funds', type: 'Asset Management' },

  // Insurance Partners
  { code: 'ICICI LIFE', name: 'ICICI Prudential Life', category: 'insurance', type: 'Life Insurance' },
  { code: 'CENTRAL', name: 'Central Life', category: 'insurance', type: 'Life Insurance' },
  { code: 'ICICI LOMBARD', name: 'ICICI Lombard General', category: 'insurance', type: 'General & Health' },
  { code: 'INDUSIND', name: 'IndusInd General', category: 'insurance', type: 'General Insurance' },
  { code: 'NIPPON LIFE', name: 'Nippon Life Insurance', category: 'insurance', type: 'Life Insurance' },
];

export const CATEGORIES_CONFIG = [
  { id: 'all', name: 'All Partners' },
  { id: 'govt', name: 'Public Sector & Housing' },
  { id: 'private', name: 'Private Banking' },
  { id: 'nbfc', name: 'NBFCs & Housing Finance' },
  { id: 'mutual_funds', name: 'Mutual Funds & AMCs' },
  { id: 'insurance', name: 'Insurance Partners' },
];
