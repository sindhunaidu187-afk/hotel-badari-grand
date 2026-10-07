import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { HOTEL_CONFIG } from '../config/hotelConfig';

export interface PrefillEnquiryData {
  enquiryType?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
  prefillNote?: string;
  timestamp?: number;
}

interface ContactSectionProps {
  prefillData: PrefillEnquiryData | null;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const ENQUIRY_TYPES = [
  'Room Booking',
  'Dining',
  'Banquet / Event',
  'Corporate Event',
  'General Enquiry',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ prefillData }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Room Booking');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [roomType, setRoomType] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [prefillBanner, setPrefillBanner] = useState('');

  // Populate fields when triggered from Quick Enquiry Bar, Room Cards, or Banquet Cards
  useEffect(() => {
    if (!prefillData) return;

    if (prefillData.enquiryType && ENQUIRY_TYPES.includes(prefillData.enquiryType)) {
      setEnquiryType(prefillData.enquiryType);
    }
    if (prefillData.checkIn !== undefined) {
      setCheckIn(prefillData.checkIn);
    }
    if (prefillData.checkOut !== undefined) {
      setCheckOut(prefillData.checkOut);
    }
    if (prefillData.guests !== undefined) {
      setGuests(prefillData.guests);
    }
    if (prefillData.roomType !== undefined) {
      setRoomType(prefillData.roomType);
    }
    if (prefillData.prefillNote) {
      setPrefillBanner(prefillData.prefillNote);
      if (!message.trim()) {
        setMessage(prefillData.prefillNote);
      }
    }

    setSubmitState('idle');
    setFeedbackMessage('');
    setFieldErrors({});

    // Focus Full Name input smoothly after scroll
    const timer = setTimeout(() => {
      fullNameInputRef.current?.focus({ preventScroll: true });
    }, 350);

    return () => clearTimeout(timer);
  }, [prefillData]);

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const phoneTrimmed = phone.trim();
    const digitsOnly = phoneTrimmed.replace(/\D/g, '');
    const phoneFormatRegex = /^[+\d\s\-()]{7,22}$/;
    if (!phoneTrimmed) {
      errors.phone = 'Please enter your phone number.';
    } else if (!phoneFormatRegex.test(phoneTrimmed) || digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.phone = 'Please enter a valid phone number (7–15 digits).';
    }

    const emailTrimmed = email.trim();
    if (emailTrimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(emailTrimmed)) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (!enquiryType || !ENQUIRY_TYPES.includes(enquiryType)) {
      errors.enquiryType = 'Please select an enquiry type.';
    }

    if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
      errors.checkOut = 'Check-out date must be on or after the check-in date.';
    }

    if (!message.trim() || message.trim().length < 5) {
      errors.message = 'Please enter your enquiry message (at least 5 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage('');

    if (!validateClientSide()) {
      setSubmitState('error');
      setFeedbackMessage('Please check the highlighted fields below and try again.');
      return;
    }

    setSubmitState('loading');

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const isTestTransport = searchParams.get('smtpTest') === '1';

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (isTestTransport) {
        headers['x-smtp-test-transport'] = 'true';
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          enquiryType,
          checkIn,
          checkOut,
          guests: guests.trim(),
          roomType: roomType.trim(),
          message: message.trim(),
          website_url: honeypot, // Honeypot spam protection field
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitState('success');
        setFeedbackMessage(
          data.message ||
            'Thank you for contacting Hotel Badari Grand. Our team will get back to you shortly.'
        );
        setPrefillBanner('');
        // Reset form fields after successful submission
        setFullName('');
        setPhone('');
        setEmail('');
        setEnquiryType('Room Booking');
        setCheckIn('');
        setCheckOut('');
        setGuests('');
        setRoomType('');
        setMessage('');
        setHoneypot('');
        setFieldErrors({});
      } else {
        setSubmitState('error');
        if (data.errors && typeof data.errors === 'object') {
          setFieldErrors(data.errors);
        }
        setFeedbackMessage(
          data.message ||
            'Email service is currently unavailable. Please contact us directly.'
        );
      }
    } catch {
      setSubmitState('error');
      setFeedbackMessage(
        'Email service is currently unavailable. Please contact us directly.'
      );
    }
  };

  // Button label strictly matches Section 20 specification
  const getButtonText = () => {
    switch (submitState) {
      case 'loading':
        return 'SENDING...';
      case 'success':
        return 'ENQUIRY SENT';
      case 'error':
        return 'TRY AGAIN';
      default:
        return 'SEND ENQUIRY';
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FFFFFF] border-t border-[#111111]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subheading, & Direct Contact Reassurance */}
          <div className="lg:col-span-5">
            <div className="w-12 h-[2px] bg-[#B8860B] mb-5" aria-hidden="true" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-bold mb-3">
              RESERVATIONS &amp; ENQUIRIES
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15] mb-5">
              LET&apos;S MAKE YOUR STAY
              <span className="block mt-1">A MEMORABLE ONE.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#222222]/85 leading-relaxed mb-8">
              Have a question about your stay, dining experience or upcoming event? Get in touch with Hotel Badari Grand.
            </p>

            {/* Hospitality Reassurance Block */}
            <div className="bg-[#F8F6F1] border border-[#111111]/10 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#111111] mb-2">
                  Direct Assistance
                </h3>
                <p className="text-sm text-[#222222]/80 leading-relaxed">
                  Whether you are planning a room stay, a family dinner or a grand celebration, our team is here to assist you with availability and arrangements.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#111111]/10 text-sm">
                <div className="flex items-center gap-3 text-[#222222]">
                  <Phone className="w-4 h-4 text-[#B8860B] shrink-0" aria-hidden="true" />
                  <span className="font-bold text-[#111111]">Phone:</span>
                  <span className="tabular-nums">{HOTEL_CONFIG.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[#222222]">
                  <Mail className="w-4 h-4 text-[#B8860B] shrink-0" aria-hidden="true" />
                  <span className="font-bold text-[#111111]">Email:</span>
                  <span>{HOTEL_CONFIG.contact.email}</span>
                </div>
                <div className="flex items-start gap-3 text-[#222222]">
                  <MapPin className="w-4 h-4 text-[#B8860B] shrink-0 mt-1" aria-hidden="true" />
                  <span className="font-bold text-[#111111]">Address:</span>
                  <span>{HOTEL_CONFIG.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8F6F1] border border-[#111111]/12 p-6 sm:p-10">
              {prefillBanner && (
                <div
                  role="status"
                  className="mb-6 p-4 bg-[#FFFFFF] border-l-4 border-[#B8860B] text-xs sm:text-sm text-[#111111]"
                >
                  <p className="font-bold text-[#B8860B] uppercase tracking-wider mb-1">
                    Enquiry Details Pre-Filled
                  </p>
                  <p className="text-[#222222]/85">{prefillBanner}</p>
                </div>
              )}

              {submitState === 'success' && feedbackMessage && (
                <div
                  role="alert"
                  className="mb-6 p-5 bg-[#FFFFFF] border-2 border-[#B8860B] flex items-start gap-3.5"
                >
                  <CheckCircle2
                    className="w-6 h-6 text-[#B8860B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-serif-display text-xl font-semibold text-[#111111] mb-1">
                      Enquiry Received
                    </h3>
                    <p className="text-sm sm:text-base text-[#222222]">
                      {feedbackMessage}
                    </p>
                  </div>
                </div>
              )}

              {submitState === 'error' && feedbackMessage && (
                <div
                  role="alert"
                  className="mb-6 p-5 bg-[#FFFFFF] border-l-4 border-red-700 flex items-start gap-3.5"
                >
                  <AlertCircle
                    className="w-5 h-5 text-red-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-red-800 mb-1">
                      Unable to Complete Submission
                    </h3>
                    <p className="text-sm text-[#222222]">{feedbackMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot Spam Protection (Hidden from real users and screen readers) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_url">Website URL (Leave blank)</label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Row 1: Full Name * & Phone Number * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-fullName"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Full Name <span className="text-[#B8860B]">*</span>
                    </label>
                    <input
                      ref={fullNameInputRef}
                      id="contact-fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (fieldErrors.fullName) {
                          setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                        }
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? 'error-fullName' : undefined}
                      className={`w-full h-12 px-4 text-sm text-[#111111] bg-[#FFFFFF] border transition-colors ${
                        fieldErrors.fullName
                          ? 'border-red-700'
                          : 'border-[#111111]/18 focus:border-[#B8860B]'
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p id="error-fullName" className="mt-1.5 text-xs text-red-700">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Phone Number <span className="text-[#B8860B]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) {
                          setFieldErrors((prev) => ({ ...prev, phone: '' }));
                        }
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'error-phone' : undefined}
                      className={`w-full h-12 px-4 text-sm text-[#111111] bg-[#FFFFFF] border transition-colors tabular-nums ${
                        fieldErrors.phone
                          ? 'border-red-700'
                          : 'border-[#111111]/18 focus:border-[#B8860B]'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p id="error-phone" className="mt-1.5 text-xs text-red-700">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email Address & Enquiry Type * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) {
                          setFieldErrors((prev) => ({ ...prev, email: '' }));
                        }
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'error-email' : undefined}
                      className={`w-full h-12 px-4 text-sm text-[#111111] bg-[#FFFFFF] border transition-colors ${
                        fieldErrors.email
                          ? 'border-red-700'
                          : 'border-[#111111]/18 focus:border-[#B8860B]'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="error-email" className="mt-1.5 text-xs text-red-700">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-enquiryType"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Enquiry Type <span className="text-[#B8860B]">*</span>
                    </label>
                    <select
                      id="contact-enquiryType"
                      name="enquiryType"
                      required
                      value={enquiryType}
                      onChange={(e) => {
                        setEnquiryType(e.target.value);
                        if (fieldErrors.enquiryType) {
                          setFieldErrors((prev) => ({ ...prev, enquiryType: '' }));
                        }
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      aria-invalid={Boolean(fieldErrors.enquiryType)}
                      className="w-full h-12 px-4 text-sm text-[#111111] bg-[#FFFFFF] border border-[#111111]/18 focus:border-[#B8860B] transition-colors"
                    >
                      {ENQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.enquiryType && (
                      <p className="mt-1.5 text-xs text-red-700">
                        {fieldErrors.enquiryType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Check-in Date, Check-out Date, Number of Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label
                      htmlFor="contact-checkIn"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Check-in Date
                    </label>
                    <input
                      id="contact-checkIn"
                      name="checkIn"
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (fieldErrors.checkOut) {
                          setFieldErrors((prev) => ({ ...prev, checkOut: '' }));
                        }
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      className="w-full h-12 px-3.5 text-sm text-[#111111] bg-[#FFFFFF] border border-[#111111]/18 focus:border-[#B8860B] transition-colors tabular-nums"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-checkOut"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Check-out Date
                    </label>
                    <input
                      id="contact-checkOut"
                      name="checkOut"
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        if (fieldErrors.checkOut) {
                          setFieldErrors((prev) => ({ ...prev, checkOut: '' }));
                        }
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      aria-invalid={Boolean(fieldErrors.checkOut)}
                      className={`w-full h-12 px-3.5 text-sm text-[#111111] bg-[#FFFFFF] border transition-colors tabular-nums ${
                        fieldErrors.checkOut
                          ? 'border-red-700'
                          : 'border-[#111111]/18 focus:border-[#B8860B]'
                      }`}
                    />
                    {fieldErrors.checkOut && (
                      <p className="mt-1.5 text-xs text-red-700">
                        {fieldErrors.checkOut}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-guests"
                      className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                    >
                      Number of Guests
                    </label>
                    <input
                      id="contact-guests"
                      name="guests"
                      type="text"
                      placeholder="e.g. 2 Adults / 50 Guests"
                      value={guests}
                      onChange={(e) => {
                        setGuests(e.target.value);
                        if (submitState !== 'idle') setSubmitState('idle');
                      }}
                      className="w-full h-12 px-4 text-sm text-[#111111] bg-[#FFFFFF] border border-[#111111]/18 focus:border-[#B8860B] transition-colors tabular-nums"
                    />
                  </div>
                </div>

                {/* Message * */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
                  >
                    Message <span className="text-[#B8860B]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Share your stay requirements, dining preferences or event details..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (fieldErrors.message) {
                        setFieldErrors((prev) => ({ ...prev, message: '' }));
                      }
                      if (submitState !== 'idle') setSubmitState('idle');
                    }}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'error-message' : undefined}
                    className={`w-full p-4 text-sm text-[#111111] bg-[#FFFFFF] border transition-colors resize-y ${
                      fieldErrors.message
                        ? 'border-red-700'
                        : 'border-[#111111]/18 focus:border-[#B8860B]'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="error-message" className="mt-1.5 text-xs text-red-700">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#222222]/70">
                    Fields marked with <span className="text-[#B8860B] font-bold">*</span> are required.
                  </p>

                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className={`w-full sm:w-auto min-w-[220px] px-8 py-4 text-xs tracking-[0.16em] font-bold uppercase flex items-center justify-center gap-2.5 transition-colors duration-150 whitespace-nowrap cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed ${
                      submitState === 'success'
                        ? 'bg-[#111111] text-[#C9A227] border border-[#B8860B]'
                        : 'bg-[#B8860B] text-[#FFFFFF] hover:bg-[#111111] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {submitState === 'loading' && (
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
                    )}
                    <span>{getButtonText()}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
