import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, X } from 'lucide-react';
import { HOTEL_CONFIG } from '../config/hotelConfig';

interface FooterAndFloatingContactProps {
  onFloatingEnquireFallback: (channel: 'WhatsApp' | 'Call') => void;
}

export const FooterAndFloatingContact: React.FC<FooterAndFloatingContactProps> = ({
  onFloatingEnquireFallback,
}) => {
  const [floatingNotice, setFloatingNotice] = useState<string | null>(null);

  const isPhoneConfigured =
    HOTEL_CONFIG.contact.phone &&
    HOTEL_CONFIG.contact.phone !== '[Phone Number]' &&
    /\d{7,}/.test(HOTEL_CONFIG.contact.phone.replace(/\D/g, ''));

  const isWhatsAppConfigured =
    HOTEL_CONFIG.contact.whatsappNumber &&
    /\d{7,}/.test(HOTEL_CONFIG.contact.whatsappNumber.replace(/\D/g, ''));

  const handleWhatsAppClick = () => {
    if (isWhatsAppConfigured) {
      const cleanNum = HOTEL_CONFIG.contact.whatsappNumber.replace(/\D/g, '');
      window.location.href = `https://wa.me/${cleanNum}?text=${encodeURIComponent(
        'Hello Hotel Badari Grand, I would like to make an enquiry.'
      )}`;
    } else {
      setFloatingNotice(
        'WhatsApp number is currently set to placeholder [Phone Number]. Directing you to our enquiry form.'
      );
      onFloatingEnquireFallback('WhatsApp');
    }
  };

  const handleCallClick = () => {
    if (isPhoneConfigured) {
      const cleanTel = HOTEL_CONFIG.contact.phone.replace(/[^\d+]/g, '');
      window.location.href = `tel:${cleanTel}`;
    } else {
      setFloatingNotice(
        'Phone number is currently set to placeholder [Phone Number]. Directing you to our enquiry form.'
      );
      onFloatingEnquireFallback('Call');
    }
  };

  return (
    <>
      {/* 26. PREMIUM FOOTER */}
      <footer className="bg-[#111111] text-[#F8F6F1] border-t border-[#B8860B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#FFFFFF]/10">
            {/* Column 1: Brand & Short Description */}
            <div className="lg:col-span-5">
              <a
                href="#home"
                className="inline-block font-serif-display text-2xl sm:text-3xl font-semibold tracking-[0.12em] text-[#FFFFFF] hover:text-[#C9A227] transition-colors mb-4"
              >
                HOTEL BADARI GRAND
              </a>
              <p className="text-sm sm:text-base text-[#F8F6F1]/75 leading-relaxed max-w-md mb-6">
                {HOTEL_CONFIG.shortDescription}
              </p>

              {/* Social Icons (Instagram, Facebook, Google) */}
              <div className="flex items-center gap-3">
                <a
                  href={HOTEL_CONFIG.socialLinks.instagram}
                  aria-label="Hotel Badari Grand on Instagram (Placeholder)"
                  className="w-10 h-10 border border-[#FFFFFF]/20 hover:border-[#C9A227] text-[#F8F6F1] hover:text-[#C9A227] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={HOTEL_CONFIG.socialLinks.facebook}
                  aria-label="Hotel Badari Grand on Facebook (Placeholder)"
                  className="w-10 h-10 border border-[#FFFFFF]/20 hover:border-[#C9A227] text-[#F8F6F1] hover:text-[#C9A227] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>

                <a
                  href={HOTEL_CONFIG.socialLinks.google}
                  aria-label="Hotel Badari Grand on Google Maps (Placeholder)"
                  className="w-10 h-10 border border-[#FFFFFF]/20 hover:border-[#C9A227] text-[#F8F6F1] hover:text-[#C9A227] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="lg:col-span-3">
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#C9A227] font-bold mb-5">
                Navigation
              </h3>
              <ul className="space-y-3 text-sm text-[#F8F6F1]/85">
                <li>
                  <a href="#home" className="hover:text-[#C9A227] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#rooms" className="hover:text-[#C9A227] transition-colors">
                    Rooms
                  </a>
                </li>
                <li>
                  <a href="#dining" className="hover:text-[#C9A227] transition-colors">
                    Dining
                  </a>
                </li>
                <li>
                  <a href="#banquet" className="hover:text-[#C9A227] transition-colors">
                    Banquet
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#C9A227] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-[#C9A227] transition-colors">
                    Location
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#C9A227] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Placeholders */}
            <div className="lg:col-span-4">
              <h3 className="text-xs tracking-[0.2em] uppercase text-[#C9A227] font-bold mb-5">
                Contact
              </h3>
              <ul className="space-y-4 text-sm text-[#F8F6F1]/85">
                <li className="flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 text-[#C9A227] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#F8F6F1]/55">
                      Phone
                    </span>
                    <span className="tabular-nums">{HOTEL_CONFIG.contact.phone}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail
                    className="w-4 h-4 text-[#C9A227] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#F8F6F1]/55">
                      Email
                    </span>
                    <span>{HOTEL_CONFIG.contact.email}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-[#C9A227] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#F8F6F1]/55">
                      Address
                    </span>
                    <span>[Address] · {HOTEL_CONFIG.contact.address}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F6F1]/60">
            <p>© 2026 Hotel Badari Grand. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#rooms" className="hover:text-[#C9A227] transition-colors">
                Stay
              </a>
              <span aria-hidden="true">·</span>
              <a href="#dining" className="hover:text-[#C9A227] transition-colors">
                Dining
              </a>
              <span aria-hidden="true">·</span>
              <a href="#banquet" className="hover:text-[#C9A227] transition-colors">
                Banquet
              </a>
              <span aria-hidden="true">·</span>
              <a href="#contact" className="hover:text-[#C9A227] transition-colors">
                Enquire
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 27. SUBTLE FLOATING CONTACT OPTIONS (WhatsApp & Call) */}
      <div
        aria-label="Quick Contact Actions"
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5"
      >
        {floatingNotice && (
          <div
            role="status"
            className="max-w-xs bg-[#111111] text-[#F8F6F1] border border-[#B8860B] p-3.5 text-xs shadow-xl flex items-start justify-between gap-3 mb-1"
          >
            <span>{floatingNotice}</span>
            <button
              type="button"
              onClick={() => setFloatingNotice(null)}
              aria-label="Dismiss notification"
              className="text-[#C9A227] hover:text-[#FFFFFF] shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            aria-label="Contact Hotel Badari Grand on WhatsApp"
            className="h-11 px-4 bg-[#111111] text-[#FFFFFF] border border-[#B8860B]/60 hover:bg-[#B8860B] hover:border-[#B8860B] shadow-lg flex items-center gap-2 text-xs tracking-[0.12em] font-bold uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCallClick}
            aria-label="Call Hotel Badari Grand"
            className="h-11 px-4 bg-[#B8860B] text-[#FFFFFF] hover:bg-[#111111] shadow-lg flex items-center gap-2 text-xs tracking-[0.12em] font-bold uppercase transition-colors cursor-pointer whitespace-nowrap"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Call</span>
          </button>
        </div>
      </div>
    </>
  );
};
