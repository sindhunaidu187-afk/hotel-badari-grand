import React, { useState, useEffect } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { HOTEL_CONFIG, GalleryItem } from '../config/hotelConfig';
import { HotelImage } from './HotelImage';

type FilterCategory = 'ALL' | 'HOTEL' | 'ROOMS' | 'DINING' | 'BANQUET';

const CATEGORIES: FilterCategory[] = ['ALL', 'HOTEL', 'ROOMS', 'DINING', 'BANQUET'];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery =
    activeCategory === 'ALL'
      ? HOTEL_CONFIG.gallery
      : HOTEL_CONFIG.gallery.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredGallery.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredGallery.length) % filteredGallery.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const activeLightboxItem: GalleryItem | null =
    lightboxIndex !== null && filteredGallery[lightboxIndex]
      ? filteredGallery[lightboxIndex]
      : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="w-12 h-[2px] bg-[#B8860B] mb-5" aria-hidden="true" />
            <p className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-bold mb-3">
              VISUAL GALLERY
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] leading-[1.15]">
              GLIMPSES OF HOTEL BADARI GRAND
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="flex flex-wrap items-center gap-2 bg-[#F8F6F1] p-1.5 border border-[#111111]/10"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 text-xs tracking-[0.14em] font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'text-[#222222]/80 hover:text-[#B8860B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 auto-rows-[240px]">
          {filteredGallery.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`Open ${item.title} (${item.category}) in lightbox`}
              className={`group relative overflow-hidden bg-[#111111] border border-[#111111]/10 text-left focus:outline-none cursor-pointer ${
                activeCategory === 'ALL' ? item.aspectClass : 'md:col-span-1 md:row-span-1'
              }`}
            >
              <HotelImage
                src={item.image}
                alt={item.imageAlt}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Subtle Overlay & Hover Reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-200 flex flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.16em] uppercase text-[#C9A227] font-bold">
                    {item.category} · {item.placeholderSlot}
                  </span>
                  <span className="w-8 h-8 bg-[#111111]/70 text-[#FFFFFF] group-hover:bg-[#B8860B] flex items-center justify-center transition-colors">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-display text-xl text-[#FFFFFF] font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F8F6F1]/80 mt-0.5 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/95 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery Lightbox: ${activeLightboxItem.title}`}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#111111] border border-[#B8860B]/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#111111] border-b border-[#FFFFFF]/10 text-[#FFFFFF]">
              <div className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase">
                <span className="text-[#C9A227] font-bold">
                  {activeLightboxItem.category}
                </span>
                <span className="text-[#FFFFFF]/40" aria-hidden="true">·</span>
                <span className="text-[#F8F6F1]/80 tabular-nums">
                  {lightboxIndex + 1} / {filteredGallery.length}
                </span>
                <span className="text-[#FFFFFF]/40" aria-hidden="true">·</span>
                <span className="text-[#F8F6F1]/70">
                  {activeLightboxItem.placeholderSlot}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close gallery lightbox"
                className="w-9 h-9 bg-[#222222] text-[#FFFFFF] hover:bg-[#B8860B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[16/10] max-h-[70vh] w-full bg-[#111111] flex items-center justify-center">
              <HotelImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.imageAlt}
                loading="eager"
                containerClassName="w-full h-full"
                className="w-full h-full object-contain"
              />

              {filteredGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredGallery.length) %
                          filteredGallery.length
                      )
                    }
                    aria-label="Previous gallery image"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#111111]/80 text-[#FFFFFF] hover:bg-[#B8860B] border border-[#FFFFFF]/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)
                    }
                    aria-label="Next gallery image"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#111111]/80 text-[#FFFFFF] hover:bg-[#B8860B] border border-[#FFFFFF]/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Caption Footer */}
            <div className="px-6 py-4 bg-[#111111] border-t border-[#FFFFFF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif-display text-xl text-[#FFFFFF] font-semibold">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F8F6F1]/75">
                  {activeLightboxItem.caption}
                </p>
              </div>
              <span className="text-xs text-[#C9A227] tracking-wider uppercase whitespace-nowrap">
                Replaceable in hotelConfig.ts
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
