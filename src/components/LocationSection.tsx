import React, { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, ArrowRight } from 'lucide-react';
import { HOTEL_CONFIG } from '../config/hotelConfig';

interface LocationSectionProps {
  onEnquireDirectionsClick: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onEnquireDirectionsClick,
}) => {
  const [showDirectionsNotice, setShowDirectionsNotice] = useState(false);

  const handleGetDirections = () => {
    if (HOTEL_CONFIG.contact.googleMapsDirectionsUrl) {
      window.location.href = HOTEL_CONFIG.contact.googleMapsDirectionsUrl;
    } else {
      setShowDirectionsNotice(true);
    }
  };

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#F8F6F1] border-t border-[#111111]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left: Location Information & Contact Details */}
          <div className="lg:col-span-5">
            <div className="w-12 h-[2px] bg-[#B8860B] mb-5" aria-hidden="true" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-bold mb-3">
              LOCATION &amp; ACCESS
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15] mb-5">
              CONVENIENTLY LOCATED.
              <span className="block mt-1">EASY TO REACH.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#222222]/85 leading-relaxed mb-8">
              Hotel Badari Grand is conveniently located for guests travelling for business, leisure, family visits and special occasions.
            </p>

            {/* Address, Phone, Email Card */}
            <div className="bg-[#FFFFFF] border border-[#111111]/10 p-6 sm:p-8 space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F6F1] border border-[#B8860B]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#B8860B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.14em] uppercase font-bold text-[#111111] mb-1">
                    Hotel Address
                  </p>
                  <p className="text-sm sm:text-base text-[#222222] leading-relaxed">
                    {HOTEL_CONFIG.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-[#111111]/8">
                <div className="w-10 h-10 bg-[#F8F6F1] border border-[#B8860B]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#B8860B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.14em] uppercase font-bold text-[#111111] mb-1">
                    Phone
                  </p>
                  <p className="text-sm sm:text-base text-[#222222] tabular-nums">
                    {HOTEL_CONFIG.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-[#111111]/8">
                <div className="w-10 h-10 bg-[#F8F6F1] border border-[#B8860B]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#B8860B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.14em] uppercase font-bold text-[#111111] mb-1">
                    Email
                  </p>
                  <p className="text-sm sm:text-base text-[#222222]">
                    {HOTEL_CONFIG.contact.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleGetDirections}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-[#B8860B] text-xs tracking-[0.16em] font-bold uppercase transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>GET DIRECTIONS</span>
              </button>
            </div>

            {showDirectionsNotice && (
              <div
                role="status"
                className="mt-4 p-4 bg-[#FFFFFF] border-l-4 border-[#B8860B] text-sm text-[#222222] shadow-xs"
              >
                <p className="font-bold text-[#111111] mb-1">
                  Address Placeholder Active: {HOTEL_CONFIG.contact.address}
                </p>
                <p className="text-xs text-[#222222]/80 leading-relaxed mb-3">
                  Once the official Google Maps URL is configured in{' '}
                  <code className="text-[#111111] font-mono">hotelConfig.ts</code>, this button will open turn-by-turn directions directly.
                </p>
                <button
                  type="button"
                  onClick={onEnquireDirectionsClick}
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] font-bold uppercase text-[#B8860B] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <span>Contact Front Desk for Travel Assistance</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Google Maps Embed Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#111111]/12 p-3 sm:p-4">
              {HOTEL_CONFIG.contact.googleMapsEmbedUrl ? (
                <iframe
                  title="Hotel Badari Grand Google Maps Location"
                  src={HOTEL_CONFIG.contact.googleMapsEmbedUrl}
                  className="w-full h-[420px] sm:h-[460px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="relative w-full h-[420px] sm:h-[460px] bg-[#111111] overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                  {/* Architectural Map Grid Pattern */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #C9A227 1px, transparent 1px), linear-gradient(to bottom, #C9A227 1px, transparent 1px)',
                      backgroundSize: '48px 48px',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 max-w-md bg-[#222222]/95 border border-[#B8860B]/40 p-7 sm:p-8">
                    <div className="w-12 h-12 mx-auto mb-4 bg-[#B8860B]/15 border border-[#B8860B] flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#C9A227]" aria-hidden="true" />
                    </div>
                    <p className="text-xs tracking-[0.18em] uppercase text-[#C9A227] font-bold mb-2">
                      GOOGLE MAPS EMBED PLACEHOLDER
                    </p>
                    <h3 className="font-serif-display text-2xl text-[#FFFFFF] font-semibold mb-2">
                      HOTEL BADARI GRAND
                    </h3>
                    <p className="text-sm text-[#F8F6F1]/85 mb-4">
                      {HOTEL_CONFIG.contact.address}
                    </p>
                    <p className="text-xs text-[#F8F6F1]/65 leading-relaxed">
                      Replace <code className="text-[#C9A227]">googleMapsEmbedUrl</code> and{' '}
                      <code className="text-[#C9A227]">[HOTEL COMPLETE ADDRESS]</code> in{' '}
                      <code className="text-[#C9A227]">src/config/hotelConfig.ts</code> with your official Google Maps embed link.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
