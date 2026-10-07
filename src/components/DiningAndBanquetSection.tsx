import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HOTEL_CONFIG, HOTEL_IMAGES } from '../config/hotelConfig';
import { HotelImage } from './HotelImage';

interface DiningAndBanquetSectionProps {
  onExploreDiningClick: () => void;
  onPlanEventClick: (eventCategory?: string) => void;
}

export const DiningAndBanquetSection: React.FC<DiningAndBanquetSectionProps> = ({
  onExploreDiningClick,
  onPlanEventClick,
}) => {
  return (
    <>
      {/* 11. DINING SECTION */}
      <section id="dining" className="py-20 lg:py-28 bg-[#111111] text-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Dining Copy */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="w-12 h-[2px] bg-[#C9A227] mb-6" aria-hidden="true" />
              <p className="text-xs tracking-[0.22em] uppercase text-[#C9A227] font-bold mb-3">
                DINING AT HOTEL BADARI GRAND
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FFFFFF] leading-[1.15] mb-6">
                GOOD FOOD.
                <span className="block mt-1 text-[#F8F6F1]">GREAT MOMENTS.</span>
              </h2>

              <div className="space-y-5 text-base sm:text-lg text-[#F8F6F1]/85 leading-relaxed font-light">
                <p>
                  Dining is more than just a meal—it is part of the experience.
                </p>
                <p>
                  Enjoy delicious food in a comfortable setting, whether you're joining family and friends, meeting over a meal or simply taking a break from a busy day.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#FFFFFF]/12 flex flex-wrap items-center gap-y-2 text-xs tracking-[0.14em] uppercase text-[#C9A227]">
                <span>FAMILY &amp; FRIENDS</span>
                <span className="mx-3 text-[#FFFFFF]/30" aria-hidden="true">·</span>
                <span>WELCOMING SETTING</span>
                <span className="mx-3 text-[#FFFFFF]/30" aria-hidden="true">·</span>
                <span>ATTENTIVE HOSPITALITY</span>
              </div>

              <div className="mt-9">
                <button
                  type="button"
                  onClick={onExploreDiningClick}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#B8860B] text-[#FFFFFF] hover:bg-[#C9A227] hover:text-[#111111] text-xs tracking-[0.16em] font-bold uppercase transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>EXPLORE DINING</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right: Large Dining Photography */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative border border-[#C9A227]/30 bg-[#222222] p-3 sm:p-4">
                <HotelImage
                  src={HOTEL_IMAGES.diningRestaurant}
                  alt="Welcoming dining space at Hotel Badari Grand"
                  containerClassName="aspect-[16/10] w-full overflow-hidden bg-[#111111]"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-[#F8F6F1]/75 px-1">
                  <span className="uppercase tracking-[0.14em] text-[#C9A227] font-bold">
                    DINING EXPERIENCE
                  </span>
                  <span>Comfortable &amp; Welcoming Setting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BANQUET SECTION */}
      <section id="banquet" className="py-20 lg:py-28 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <div className="w-12 h-[2px] bg-[#B8860B] mb-5" aria-hidden="true" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-bold mb-3">
                BANQUET &amp; CELEBRATIONS
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15]">
                CELEBRATE YOUR MOMENTS
                <span className="block mt-1">IN GRAND STYLE.</span>
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-3 text-base text-[#222222]/85 leading-relaxed">
              <p>
                Some moments deserve more than an ordinary venue.
              </p>
              <p>
                From family functions and special celebrations to corporate gatherings, Hotel Badari Grand provides a welcoming setting for occasions that matter.
              </p>
            </div>
          </div>

          {/* Featured Banquet Hall Banner */}
          <div className="mb-10 bg-[#FFFFFF] border border-[#111111]/10 p-3 sm:p-4">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#111111]">
              <HotelImage
                src={HOTEL_IMAGES.banquetHall}
                alt="Banquet hall at Hotel Badari Grand"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/30 to-transparent flex items-end p-6 sm:p-10">
                <div className="max-w-2xl text-[#FFFFFF]">
                  <p className="text-xs tracking-[0.18em] uppercase text-[#C9A227] font-bold mb-2">
                    VERSATILE EVENT SPACES
                  </p>
                  <p className="font-serif-display text-2xl sm:text-3xl text-[#FFFFFF]">
                    Designed for seamless gatherings, attentive hospitality and lasting memories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Visual Categories: WEDDINGS, FAMILY FUNCTIONS, CORPORATE EVENTS, SPECIAL CELEBRATIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOTEL_CONFIG.banquetCategories.map((cat, index) => (
              <article
                key={cat.id}
                className="bg-[#FFFFFF] border border-[#111111]/10 flex flex-col justify-between group hover:border-[#B8860B] transition-colors duration-200"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                    <HotelImage
                      src={cat.image}
                      alt={cat.imageAlt}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 font-serif-display text-lg text-[#C9A227] font-semibold tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif-display text-xl font-semibold text-[#111111] tracking-wide mb-2.5">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-[#222222]/80 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onPlanEventClick(cat.title)}
                    className="inline-flex items-center gap-2 text-xs tracking-[0.14em] font-bold uppercase text-[#111111] hover:text-[#B8860B] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>ENQUIRE FOR {cat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Primary Banquet CTA */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => onPlanEventClick()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-[#FFFFFF] hover:bg-[#B8860B] text-xs tracking-[0.16em] font-bold uppercase transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              <span>PLAN YOUR EVENT</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
