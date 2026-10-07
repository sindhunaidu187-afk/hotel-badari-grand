import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight } from 'lucide-react';
import { HOTEL_IMAGES } from '../config/hotelConfig';
import { HotelImage } from './HotelImage';

export interface QuickEnquiryPayload {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
}

interface HeroSectionProps {
  onBookStayClick: () => void;
  onExploreHotelClick: () => void;
  onQuickEnquirySubmit: (payload: QuickEnquiryPayload) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookStayClick,
  onExploreHotelClick,
  onQuickEnquirySubmit,
}) => {
  // Default tomorrow / day after tomorrow in YYYY-MM-DD format for convenience
  const todayStr = new Date().toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [roomType, setRoomType] = useState('[ROOM NAME]');
  const [dateError, setDateError] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
      setDateError('Check-out date must be on or after the check-in date.');
      return;
    }
    setDateError('');
    onQuickEnquirySubmit({
      checkIn,
      checkOut,
      guests,
      roomType,
    });
  };

  return (
    <section id="home" className="relative bg-[#111111]">
      {/* Hero Viewport Area (85vh) */}
      <div className="relative min-h-[82vh] lg:min-h-[86vh] flex items-center justify-center overflow-hidden pt-20 pb-28 lg:pb-36">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <HotelImage
            src={HOTEL_IMAGES.heroExterior}
            alt="Hotel Badari Grand premium hotel exterior"
            loading="eager"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-700"
          />
          {/* Measured Contrast Scrim for 4.5:1+ legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#111111]/75 via-[#111111]/55 to-[#111111]/90"
            aria-hidden="true"
          />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FFFFFF]">
          <p className="text-xs sm:text-sm tracking-[0.26em] uppercase text-[#C9A227] mb-5 font-normal">
            HOTEL BADARI GRAND
          </p>

          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.03em] leading-[1.1] text-[#FFFFFF] mb-6">
            A GRAND STAY.
            <span className="block mt-1.5 text-[#F8F6F1]">A MEMORABLE EXPERIENCE.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#F8F6F1]/90 font-light leading-relaxed mb-10">
            Welcome to Hotel Badari Grand, where comfort, hospitality and memorable moments come together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onBookStayClick}
              className="w-full sm:w-auto min-w-[210px] px-8 py-4 text-xs sm:text-sm tracking-[0.16em] font-bold uppercase bg-[#B8860B] text-[#FFFFFF] hover:bg-[#C9A227] hover:text-[#111111] transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              BOOK YOUR STAY
            </button>

            <button
              type="button"
              onClick={onExploreHotelClick}
              className="w-full sm:w-auto min-w-[210px] px-8 py-4 text-xs sm:text-sm tracking-[0.16em] font-bold uppercase bg-transparent text-[#FFFFFF] border border-[#FFFFFF]/60 hover:border-[#C9A227] hover:text-[#C9A227] transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              EXPLORE HOTEL
            </button>
          </div>
        </div>
      </div>

      {/* Quick Enquiry / Booking Bar overlapping Hero bottom */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 lg:-mt-20">
        <div className="bg-[#FFFFFF] border border-[#111111]/12 shadow-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-5 border-b border-[#111111]/10">
            <div>
              <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#111111]">
                Quick Stay &amp; Availability Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#222222]/75 mt-0.5">
                Select your preferred dates and room preference to generate a direct booking enquiry with our front desk.
              </p>
            </div>
            <span className="text-xs tracking-[0.14em] uppercase text-[#B8860B] font-bold whitespace-nowrap">
              DIRECT FRONT DESK ENQUIRY
            </span>
          </div>

          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Check-in */}
            <div>
              <label
                htmlFor="quick-checkin"
                className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
              >
                Check-in
              </label>
              <div className="relative">
                <Calendar
                  className="w-4 h-4 text-[#B8860B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="quick-checkin"
                  type="date"
                  min={todayStr}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setDateError('');
                  }}
                  className="w-full h-12 pl-10 pr-3 text-sm text-[#111111] bg-[#F8F6F1] border border-[#111111]/15 focus:border-[#B8860B] focus:bg-[#FFFFFF] transition-colors tabular-nums"
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="quick-checkout"
                className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
              >
                Check-out
              </label>
              <div className="relative">
                <Calendar
                  className="w-4 h-4 text-[#B8860B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="quick-checkout"
                  type="date"
                  min={checkIn || todayStr}
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setDateError('');
                  }}
                  className="w-full h-12 pl-10 pr-3 text-sm text-[#111111] bg-[#F8F6F1] border border-[#111111]/15 focus:border-[#B8860B] focus:bg-[#FFFFFF] transition-colors tabular-nums"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="quick-guests"
                className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
              >
                Guests
              </label>
              <div className="relative">
                <Users
                  className="w-4 h-4 text-[#B8860B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  id="quick-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 text-sm text-[#111111] bg-[#F8F6F1] border border-[#111111]/15 focus:border-[#B8860B] focus:bg-[#FFFFFF] transition-colors"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5+ Guests">5+ Guests</option>
                </select>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label
                htmlFor="quick-room-type"
                className="block text-xs tracking-[0.12em] uppercase font-bold text-[#111111] mb-2"
              >
                Room Type
              </label>
              <div className="relative">
                <BedDouble
                  className="w-4 h-4 text-[#B8860B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  id="quick-room-type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 text-sm text-[#111111] bg-[#F8F6F1] border border-[#111111]/15 focus:border-[#B8860B] focus:bg-[#FFFFFF] transition-colors"
                >
                  <option value="[ROOM NAME]">[ROOM NAME]</option>
                  <option value="[ROOM NAME] - Category 2">[ROOM NAME] (Option 2)</option>
                  <option value="[ROOM NAME] - Category 3">[ROOM NAME] (Option 3)</option>
                  <option value="Standard / Any Available Room">Any Available Room</option>
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full h-12 px-5 bg-[#111111] text-[#FFFFFF] hover:bg-[#B8860B] hover:text-[#FFFFFF] text-xs tracking-[0.14em] font-bold uppercase flex items-center justify-center gap-2 transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                <span>CHECK AVAILABILITY</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </form>

          {dateError && (
            <p role="alert" className="mt-3 text-xs text-red-700 font-medium">
              {dateError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
