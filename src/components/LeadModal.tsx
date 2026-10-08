import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Phone, Mail, User, Briefcase } from 'lucide-react';
import { submitLead } from '../lib/api';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialAmount?: string;
  title?: string;
  subtitle?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  initialService = 'General Financial Advisory',
  initialAmount,
  title = "Let's Help You Find the Right Financial Solution",
  subtitle = 'Share your details and our financial expert will contact you.'
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService);
  const [amount, setAmount] = useState(initialAmount || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialAmount) setAmount(initialAmount);
  }, [initialService, initialAmount]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setServerError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '').replace(/^91/, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your 10-digit mobile number';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);
    const result = await submitLead({
      name,
      phone,
      email,
      service,
      amount,
      source: 'Lead Modal'
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error || 'Failed to submit. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Thank you!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium mb-6">
                Our team will contact you shortly.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                A dedicated loan advisor from Phoenix Financial Services has received your request and will assist you with eligibility and bank product options.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 font-semibold rounded-xl transition-colors"
              >
                Close & Continue Exploring
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                  Phoenix Financial Services · Direct Selling Associate
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
                  {subtitle}
                </p>
              </div>

              {serverError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number (10 Digits) *
                  </label>
                  <div className="relative flex">
                    <div className="flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                      +91
                    </div>
                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ''));
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="9876543210"
                        className={`w-full pl-9 pr-4 py-2.5 rounded-r-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                          errors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="rahul.sharma@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.email}</p>}
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Service Required
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
                    >
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Loan Against Property (LAP)">Loan Against Property (LAP)</option>
                      <option value="Mortgage Loan">Mortgage Loan</option>
                      <option value="Pension Loan">Pension Loan</option>
                      <option value="Working Capital Loan">Working Capital Loan</option>
                      <option value="OD / CC Limit">OD / CC Limit</option>
                      <option value="Balance Transfer Loan">Balance Transfer Loan</option>
                      <option value="Mutual Funds & SIP">Mutual Funds & SIP</option>
                      <option value="Insurance Solutions">Insurance Solutions</option>
                      <option value="Retirement Planning">Retirement Planning</option>
                      <option value="Financial Advisory">Financial Advisory</option>
                      <option value="Business Advisory">Business Advisory</option>
                    </select>
                  </div>
                </div>

                {amount && (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                    Calculated Loan Request: <span className="font-semibold">{amount}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Expert Assistance</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Spam · Associated with Leading Banks & NBFCs</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
