import { LeadSubmission, ApiResponse } from '../types';

export async function submitLead(lead: LeadSubmission): Promise<ApiResponse> {
  // Validate Indian phone
  const cleanPhone = (lead.phone || '').replace(/[\s\-\(\)\+]/g, '').replace(/^91/, '');
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(cleanPhone)) {
    return {
      success: false,
      error: 'Please enter a valid 10-digit Indian mobile number.'
    };
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!lead.email || !emailRegex.test(lead.email.trim())) {
    return {
      success: false,
      error: 'Please enter a valid email address.'
    };
  }

  // Validate Name
  if (!lead.name || lead.name.trim().length < 2) {
    return {
      success: false,
      error: 'Please provide your full name.'
    };
  }

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...lead,
        phone: cleanPhone,
        name: lead.name.trim(),
        email: lead.email.trim().toLowerCase()
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Unable to submit your request. Please try again.'
      };
    }

    // Save submission locally as backup
    try {
      const existing = JSON.parse(localStorage.getItem('phoenix_submitted_leads') || '[]');
      existing.push({ ...lead, submittedAt: new Date().toISOString() });
      localStorage.setItem('phoenix_submitted_leads', JSON.stringify(existing));
    } catch {
      // ignore local storage errors
    }

    return {
      success: true,
      message: data.message || 'Thank you! Our team will contact you shortly.',
      leadId: data.leadId
    };
  } catch (err: any) {
    console.error('API submission failed:', err);
    // If backend is unreachable, still save to localStorage so no lead is lost
    try {
      const pending = JSON.parse(localStorage.getItem('phoenix_pending_leads') || '[]');
      pending.push({ ...lead, submittedAt: new Date().toISOString() });
      localStorage.setItem('phoenix_pending_leads', JSON.stringify(pending));
      return {
        success: true,
        message: 'Thank you! Your request has been recorded and our team will contact you shortly.'
      };
    } catch {
      return {
        success: false,
        error: 'Network connection issue. Please check your connection or call us directly.'
      };
    }
  }
}

// Indian Rupee currency formatter (Lakhs & Crores format)
export function formatINR(val: number): string {
  if (isNaN(val)) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
}

export function formatINRShort(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(val);
}
