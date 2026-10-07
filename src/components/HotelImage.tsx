import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface HotelImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export const HotelImage: React.FC<HotelImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#111111]',
  loading = 'lazy',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#111111] via-[#1C1A16] to-[#222222] border border-[#B8860B]/30"
          role="img"
          aria-label={alt}
        >
          <Building2 className="w-8 h-8 text-[#C9A227] mb-3 opacity-80" aria-hidden="true" />
          <p className="font-serif-display text-lg text-[#F8F6F1] tracking-wide">
            {fallbackTitle || 'HOTEL BADARI GRAND'}
          </p>
          <p className="text-xs text-[#C9A227]/80 mt-1 tracking-widest uppercase">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
};
