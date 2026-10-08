export interface LeadSubmission {
  name: string;
  phone: string;
  email: string;
  service?: string;
  amount?: string;
  city?: string;
  notes?: string;
  source?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  leadId?: string;
}

export interface LoanProduct {
  id: string;
  title: string;
  tagline: string;
  description: string;
  minAmount: string;
  maxAmount: string;
  tenure: string;
  interestStartsFrom: string;
  features: string[];
  category: 'retail' | 'business' | 'property';
}

export interface PartnerCategory {
  category: string;
  description: string;
  partners: {
    name: string;
    type: string;
    highlight?: string;
  }[];
}
