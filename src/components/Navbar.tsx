import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookEnquireClick: () => void;
}

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ROOMS', href: '#rooms' },
  { label: 'DINING', href: '#dining' },
  { label: 'BANQUET', href: '#banquet' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'LOCATION', href: '#location' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onBookEnquireClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#FFFFFF] text-[#111111] border-b border-[#111111]/10 shadow-xs'
          : 'bg-transparent text-[#FFFFFF] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element as required by Top Bar Contract) */}
        <a
          href="#home"
          onClick={handleNavClick}
          className={`font-serif-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.12em] whitespace-nowrap shrink-0 transition-colors ${
            isScrolled || mobileMenuOpen
              ? 'text-[#111111] hover:text-[#B8860B]'
              : 'text-[#FFFFFF] hover:text-[#C9A227]'
          }`}
        >
          HOTEL BADARI GRAND
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs tracking-[0.14em] font-normal py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent transition-colors duration-150 ${
                isScrolled
                  ? 'text-[#222222] hover:text-[#B8860B] hover:border-[#B8860B]'
                  : 'text-[#FFFFFF]/90 hover:text-[#C9A227] hover:border-[#C9A227]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onBookEnquireClick();
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.14em] font-bold whitespace-nowrap shrink-0 bg-[#B8860B] text-[#FFFFFF] hover:bg-[#C9A227] hover:text-[#111111] transition-colors duration-150 cursor-pointer"
          >
            BOOK / ENQUIRE
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`lg:hidden inline-flex items-center justify-center w-11 h-11 transition-colors cursor-pointer ${
              isScrolled || mobileMenuOpen
                ? 'text-[#111111] hover:text-[#B8860B]'
                : 'text-[#FFFFFF] hover:text-[#C9A227]'
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#FFFFFF] border-b border-[#111111]/15 px-4 pt-3 pb-6 shadow-lg"
        >
          <ul className="flex flex-col divide-y divide-[#111111]/8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="block py-3.5 text-xs tracking-[0.16em] font-bold text-[#111111] hover:text-[#B8860B] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookEnquireClick();
              }}
              className="w-full py-3.5 px-6 text-xs tracking-[0.16em] font-bold bg-[#B8860B] text-[#FFFFFF] hover:bg-[#C9A227] hover:text-[#111111] transition-colors cursor-pointer"
            >
              BOOK / ENQUIRE
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
