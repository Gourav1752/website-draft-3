import React, { useState } from 'react';
import { PartnerLogoBadge } from './PartnerLogos';

export interface PartnerLogoImageProps {
  src?: string;
  code: string;
  partnerName: string;
  className?: string;
}

/**
 * PartnerLogoImage displays partner institutional logos with:
 * - Proper native lazy-loading (loading="lazy", decoding="async")
 * - Descriptive alt text
 * - Grayscale-to-color hover effect
 * - Resilient vector fallback if the image URL is not provided or fails to load
 */
export const PartnerLogoImage: React.FC<PartnerLogoImageProps> = ({
  src,
  code,
  partnerName,
  className = 'w-full h-full max-h-16 sm:max-h-20 object-contain'
}) => {
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  // If an image URL is provided and has not failed, display the image in vibrant original color
  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={`${partnerName} official logo`}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className={`${className} object-contain filter-none opacity-100 transition-all duration-300 ease-out`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Resilient fallback: render crisp vector SVG badge in authentic brand colors
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="transition-all duration-300 ease-out flex items-center justify-center">
        <PartnerLogoBadge
          code={code}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
    </div>
  );
};
