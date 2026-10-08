import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { submitLead } from '../lib/api';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Personal Loan');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your full name';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '').replace(/^91/, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your 10-digit mobile number';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Please provide an email address';
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
    const res = await submitLead({
      name,
      phone,
      email,
      service,
      notes: message,
      source: 'Contact Section Form'
    });
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } else {
      setServerError(res.error || 'Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            Contact Phoenix Financial Services
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            PAN India Financial Services & DSA · Ready to assist your borrowing and investment requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Placeholders & Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Corporate Helpdesk
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Connect directly with our customer advisory cell across India.
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Phone Support</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    +91 98000 00000 <span className="text-xs font-normal text-slate-400">[Placeholder]</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Toll-free / Direct Callback Line</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Email Inquiries</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    support@phoenixfinancial.example.com <span className="text-xs font-normal text-slate-400">[Placeholder]</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Response within 24 business hours</div>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Registered Office</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    Financial District, Central Plaza, India <span className="text-xs font-normal text-slate-400">[Placeholder]</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Doorstep pickup available across all major cities</div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Business Hours</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    Mon – Sat: 9:30 AM – 6:30 PM IST
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Closed on National Holidays</div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20loan%20solutions%20with%20Phoenix%20Financial%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp [Placeholder Channel]</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right: Lead Capture Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  Request a Dedicated Callback
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Share your requirements and an experienced loan specialist will evaluate partner bank eligibility for you.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Thank you! Our team will contact you shortly.
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    Your request has been routed to our DSA desk. We will evaluate lending options with our partner Banks and NBFCs.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-6 rounded-xl bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 text-xs font-semibold"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {serverError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vikram Malhotra"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                          errors.name ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="9876543210"
                          className={`w-full px-4 py-2.5 rounded-r-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                            errors.phone ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vikram@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all ${
                          errors.email ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    {/* Service Required */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
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
                        <option value="Insurance Solutions">Insurance Solutions</option>
                        <option value="Mutual Funds & SIP">Mutual Funds & SIP</option>
                        <option value="Financial Advisory">Financial Advisory</option>
                        <option value="Business Advisory">Business Advisory</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Message / Loan Requirement (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required loan amount, preferred tenure, or specific banking institution..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request a Callback</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Your data is strictly confidential · No third-party spamming</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
