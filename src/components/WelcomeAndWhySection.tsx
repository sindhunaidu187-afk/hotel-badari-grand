import React from 'react';
import { BedDouble, Utensils, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { HOTEL_CONFIG, HOTEL_IMAGES } from '../config/hotelConfig';
import { HotelImage } from './HotelImage';

interface WelcomeAndWhySectionProps {
  onDiscoverClick: () => void;
}

const ICON_MAP = [BedDouble, Utensils, Sparkles, HeartHandshake];

export const WelcomeAndWhySection: React.FC<WelcomeAndWhySectionProps> = ({
  onDiscoverClick,
}) => {
  return (
    <>
      {/* 8. WELCOME SECTION */}
      <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Hotel Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative border border-[#111111]/10 bg-[#F8F6F1] p-3 sm:p-4">
                <HotelImage
                  src={HOTEL_IMAGES.welcomeInterior}
                  alt="Reception and lounge interior at Hotel Badari Grand"
                  containerClassName="aspect-[4/3] w-full overflow-hidden bg-[#111111]"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-[#222222]/70 px-1">
                  <span className="uppercase tracking-[0.14em] font-bold text-[#B8860B]">
                    HOTEL BADARI GRAND
                  </span>
                  <span>Warm Hospitality &amp; Comfort</span>
                </div>
              </div>
            </div>

            {/* Right: Welcome Copy */}
            <div className="lg:col-span-6">
              <div className="w-12 h-[2px] bg-[#B8860B] mb-6" aria-hidden="true" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-bold mb-3">
                ABOUT US
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15] mb-6">
                WELCOME TO HOTEL BADARI GRAND
              </h2>

              <div className="space-y-5 text-base sm:text-lg text-[#222222]/85 leading-relaxed font-normal">
                <p>
                  At Hotel Badari Grand, we believe a great hotel experience is about more than just a room.
                </p>
                <p>
                  It is about a warm welcome after a long journey, a comfortable stay, delicious food and celebrations that become lasting memories.
                </p>
                <p>
                  With comfortable accommodation, inviting dining spaces and versatile banquet facilities, Hotel Badari Grand brings together everything you need for a memorable stay or special occasion.
                </p>
              </div>

              <div className="mt-9">
                <button
                  type="button"
                  onClick={onDiscoverClick}
                  className="inline-flex items-center gap-3 px-7 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-[#B8860B] text-xs tracking-[0.16em] font-bold uppercase transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>DISCOVER HOTEL BADARI GRAND</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="py-20 lg:py-24 bg-[#F8F6F1] border-y border-[#111111]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="w-12 h-[2px] bg-[#B8860B] mb-5" aria-hidden="true" />
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15]">
              EVERYTHING YOU NEED.
              <span className="block mt-1">ALL IN ONE PLACE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {HOTEL_CONFIG.whyChooseUs.map((item, idx) => {
              const IconComponent = ICON_MAP[idx] || BedDouble;
              return (
                <div
                  key={item.number}
                  className="bg-[#FFFFFF] border border-[#111111]/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#B8860B] transition-colors duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#111111]/8">
                      <span className="font-serif-display text-2xl font-semibold text-[#B8860B] tabular-nums">
                        {item.number}
                      </span>
                      <IconComponent
                        className="w-5 h-5 text-[#111111]/70"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-serif-display text-xl font-semibold text-[#111111] tracking-wide mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#222222]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
