/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection, QuickEnquiryPayload } from './components/HeroSection';
import { WelcomeAndWhySection } from './components/WelcomeAndWhySection';
import { RoomsSection } from './components/RoomsSection';
import { DiningAndBanquetSection } from './components/DiningAndBanquetSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ContactSection, PrefillEnquiryData } from './components/ContactSection';
import { FooterAndFloatingContact } from './components/FooterAndFloatingContact';

export default function App() {
  const [prefillData, setPrefillData] = useState<PrefillEnquiryData | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerEnquiryWithPrefill = (data: PrefillEnquiryData) => {
    setPrefillData({
      ...data,
      timestamp: Date.now(),
    });
    scrollToSection('contact');
  };

  const handleQuickEnquirySubmit = (payload: QuickEnquiryPayload) => {
    const dateDetails =
      payload.checkIn && payload.checkOut
        ? `from ${payload.checkIn} to ${payload.checkOut}`
        : payload.checkIn
        ? `checking in on ${payload.checkIn}`
        : 'for upcoming dates';

    triggerEnquiryWithPrefill({
      enquiryType: 'Room Booking',
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      guests: payload.guests,
      roomType: payload.roomType,
      prefillNote: `Room availability enquiry ${dateDetails} for ${payload.guests} (${payload.roomType}).`,
    });
  };

  const handleRoomEnquiry = (roomName: string) => {
    triggerEnquiryWithPrefill({
      enquiryType: 'Room Booking',
      roomType: roomName,
      prefillNote: `Enquiring about room availability and details for ${roomName}.`,
    });
  };

  const handleDiningEnquiry = () => {
    triggerEnquiryWithPrefill({
      enquiryType: 'Dining',
      prefillNote: 'Enquiring about table reservations and dining at Hotel Badari Grand.',
    });
  };

  const handleBanquetEnquiry = (eventCategory?: string) => {
    const isCorporate = eventCategory === 'CORPORATE EVENTS';
    triggerEnquiryWithPrefill({
      enquiryType: isCorporate ? 'Corporate Event' : 'Banquet / Event',
      prefillNote: eventCategory
        ? `Enquiring about banquet availability and arrangements for ${eventCategory}.`
        : 'Enquiring about banquet venue availability and event arrangements.',
    });
  };

  const handleDirectionsEnquiry = () => {
    triggerEnquiryWithPrefill({
      enquiryType: 'General Enquiry',
      prefillNote: 'Requesting directions and travel assistance to reach Hotel Badari Grand.',
    });
  };

  const handleFloatingFallback = (channel: 'WhatsApp' | 'Call') => {
    triggerEnquiryWithPrefill({
      enquiryType: 'General Enquiry',
      prefillNote: `Requesting a ${channel} callback from the Hotel Badari Grand front desk.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#222222]">
      {/* 5. Sticky Header / Navigation */}
      <Navbar
        onBookEnquireClick={() =>
          triggerEnquiryWithPrefill({
            enquiryType: 'Room Booking',
          })
        }
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 6. Hero Section & 7. Quick Enquiry Bar */}
        <HeroSection
          onBookStayClick={() =>
            triggerEnquiryWithPrefill({
              enquiryType: 'Room Booking',
              prefillNote: 'I would like to book a stay at Hotel Badari Grand.',
            })
          }
          onExploreHotelClick={() => scrollToSection('about')}
          onQuickEnquirySubmit={handleQuickEnquirySubmit}
        />

        {/* 8. Welcome Section & 9. Why Choose Us */}
        <WelcomeAndWhySection onDiscoverClick={() => scrollToSection('rooms')} />

        {/* 10. Rooms Section */}
        <RoomsSection onEnquireRoom={handleRoomEnquiry} />

        {/* 11. Dining Section & 12. Banquet Section */}
        <DiningAndBanquetSection
          onExploreDiningClick={handleDiningEnquiry}
          onPlanEventClick={handleBanquetEnquiry}
        />

        {/* 13. Gallery Section */}
        <GallerySection />

        {/* 14. Location Section */}
        <LocationSection onEnquireDirectionsClick={handleDirectionsEnquiry} />

        {/* 15. Contact / Enquiry Section */}
        <ContactSection prefillData={prefillData} />
      </main>

      {/* 26. Footer & 27. Floating Contact Options */}
      <FooterAndFloatingContact onFloatingEnquireFallback={handleFloatingFallback} />
    </div>
  );
}
