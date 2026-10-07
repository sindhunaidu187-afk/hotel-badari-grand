import React, { useState } from 'react';
import { ArrowRight, X, Check } from 'lucide-react';
import { HOTEL_CONFIG, RoomItem } from '../config/hotelConfig';
import { HotelImage } from './HotelImage';

interface RoomsSectionProps {
  onEnquireRoom: (roomName: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onEnquireRoom }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="w-12 h-[2px] bg-[#B8860B] mb-5" aria-hidden="true" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-bold mb-3">
              ACCOMMODATION
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15]">
              STAY IN COMFORT.
              <span className="block mt-1">WAKE UP REFRESHED.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-3 text-base text-[#222222]/85 leading-relaxed">
            <p>
              After a busy day of travel, work or celebrations, your room should be a place to unwind.
            </p>
            <p>
              Our rooms are designed to provide a comfortable and relaxing environment, giving you the space to rest, refresh and enjoy your stay.
            </p>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOTEL_CONFIG.rooms.map((room, index) => (
            <article
              key={room.id}
              className="bg-[#F8F6F1] border border-[#111111]/10 flex flex-col justify-between group hover:border-[#B8860B] transition-colors duration-200"
            >
              <div>
                {/* Large Room Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-[#111111]">
                  <HotelImage
                    src={room.image}
                    alt={room.imageAlt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/30 to-transparent px-4 py-3 flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.16em] uppercase text-[#F8F6F1]/90 font-normal tabular-nums">
                      0{index + 1} · {room.placeholderSlot}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif-display text-2xl font-semibold text-[#111111] mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#222222]/80 leading-relaxed mb-5">
                    {room.description}
                  </p>

                  {/* Key Amenities (Clean unboxed list with subtle hairline divider) */}
                  <div className="pt-4 border-t border-[#111111]/10">
                    <p className="text-xs tracking-[0.14em] uppercase text-[#B8860B] font-bold mb-2.5">
                      KEY AMENITIES
                    </p>
                    <ul className="space-y-1.5 text-sm text-[#222222]/85">
                      {room.amenities.map((amenity, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#B8860B] font-bold" aria-hidden="true">
                            ·
                          </span>
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.14em] font-bold uppercase text-[#111111] hover:text-[#B8860B] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>VIEW ROOMS</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onEnquireRoom(`${room.name} (${room.placeholderSlot})`)}
                  className="px-4 py-2.5 text-xs tracking-[0.12em] font-bold uppercase bg-[#111111] text-[#FFFFFF] hover:bg-[#B8860B] transition-colors whitespace-nowrap cursor-pointer"
                >
                  BOOK / ENQUIRE
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onEnquireRoom('[ROOM NAME]')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#B8860B] text-[#FFFFFF] hover:bg-[#111111] text-xs tracking-[0.16em] font-bold uppercase transition-colors duration-150 whitespace-nowrap cursor-pointer"
          >
            <span>VIEW ROOMS &amp; CHECK AVAILABILITY</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Accessible Room Details Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="room-modal-title"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="bg-[#FFFFFF] border border-[#B8860B]/40 max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-[#111111]">
              <HotelImage
                src={selectedRoom.image}
                alt={selectedRoom.imageAlt}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                aria-label="Close room details"
                className="absolute top-4 right-4 w-10 h-10 bg-[#111111]/80 text-[#FFFFFF] hover:bg-[#B8860B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs tracking-[0.16em] uppercase text-[#B8860B] font-bold mb-1">
                HOTEL BADARI GRAND · {selectedRoom.placeholderSlot}
              </p>
              <h3
                id="room-modal-title"
                className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#111111] mb-3"
              >
                {selectedRoom.name}
              </h3>
              <p className="text-base text-[#222222]/85 leading-relaxed mb-6">
                {selectedRoom.description}
              </p>

              <div className="bg-[#F8F6F1] border border-[#111111]/10 p-4 mb-6">
                <p className="text-xs tracking-[0.14em] uppercase text-[#111111] font-bold mb-3">
                  ROOM AMENITIES PLACEHOLDERS
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-sm text-[#222222]">
                  {selectedRoom.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#B8860B] shrink-0" aria-hidden="true" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRoom(null)}
                  className="w-full sm:w-auto px-6 py-3 text-xs tracking-[0.14em] font-bold uppercase border border-[#111111]/20 text-[#222222] hover:border-[#111111] transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedRoom.name;
                    setSelectedRoom(null);
                    onEnquireRoom(name);
                  }}
                  className="w-full sm:w-auto px-7 py-3 text-xs tracking-[0.14em] font-bold uppercase bg-[#B8860B] text-[#FFFFFF] hover:bg-[#111111] transition-colors cursor-pointer"
                >
                  BOOK YOUR STAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
