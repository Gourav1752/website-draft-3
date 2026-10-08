import React from 'react';

interface LogoProps {
  className?: string;
  code: string;
  imageUrl?: string;
}

export const PartnerLogoBadge: React.FC<LogoProps> = ({ code, className = 'w-10 h-10', imageUrl }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${code} logo`}
        className={`${className} object-contain rounded-lg`}
        referrerPolicy="no-referrer"
      />
    );
  }

  switch (code) {
    case 'SBI':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* SBI Signature Royal Blue Disc & Keyhole */}
          <circle cx="24" cy="24" r="22" fill="#00539B" />
          <circle cx="24" cy="20" r="8" fill="#FFFFFF" />
          <rect x="22" y="20" width="4" height="15" fill="#FFFFFF" rx="1" />
        </svg>
      );

    case 'PNB':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* PNB Maroon & Gold Emblem */}
          <rect width="48" height="48" rx="10" fill="#8B0029" />
          <circle cx="24" cy="24" r="14" stroke="#FFBF00" strokeWidth="3.5" fill="none" />
          <circle cx="24" cy="24" r="7" fill="#FFBF00" />
          <rect x="22" y="10" width="4" height="14" fill="#FFBF00" />
        </svg>
      );

    case 'BOI':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Bank of India Star Emblem */}
          <rect width="48" height="48" rx="10" fill="#E63946" />
          <path
            d="M24 8L27.5 19H39L29.5 26L33 37L24 30L15 37L18.5 26L9 19H20.5L24 8Z"
            fill="#FFD166"
          />
        </svg>
      );

    case 'GIC HF':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* GIC Housing Finance */}
          <rect width="48" height="48" rx="10" fill="#0F2C59" />
          <path d="M24 10L36 21V36H12V21L24 10Z" stroke="#F8B133" strokeWidth="3" fill="none" />
          <rect x="20" y="25" width="8" height="11" fill="#F8B133" />
        </svg>
      );

    case 'HDFC':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* HDFC Bank Signature Red & Blue Grid */}
          <rect width="48" height="48" rx="10" fill="#004C8F" />
          <rect x="10" y="10" width="28" height="28" fill="#ED1C24" />
          <rect x="18" y="6" width="12" height="36" fill="#004C8F" />
          <rect x="6" y="18" width="36" height="12" fill="#004C8F" />
          <rect x="18" y="18" width="12" height="12" fill="#FFFFFF" />
        </svg>
      );

    case 'IDFC':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* IDFC FIRST Maroon Block */}
          <rect width="48" height="48" rx="10" fill="#9E1B32" />
          <path d="M14 14H24C29.5 14 34 18.5 34 24C34 29.5 29.5 34 24 34H14V14Z" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
          <path d="M22 20H24C26.2 20 28 21.8 28 24C28 26.2 26.2 28 24 28H22V20Z" fill="#F37021" />
        </svg>
      );

    case 'ABC':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Aditya Birla Capital Radiant Sun */}
          <rect width="48" height="48" rx="10" fill="#990000" />
          <circle cx="24" cy="24" r="8" fill="#FDB813" />
          <path d="M24 10V14M24 34V38M10 24H14M34 24H38M14 14L17 17M31 31L34 34M14 34L17 31M31 17L34 14" stroke="#FDB813" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'TATA':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Tata Capital Signature Royal Blue 'T' Motif */}
          <rect width="48" height="48" rx="10" fill="#00508F" />
          <path
            d="M13 15H35M24 15V35M17 21C21 21 24 26 24 35M31 21C27 21 24 26 24 35"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'CHOLA':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Cholamandalam Finance Murugappa Crimson & Gold */}
          <rect width="48" height="48" rx="10" fill="#A00C30" />
          <path d="M34 18C31 14 26 13 22 15C16 17 14 24 16 30C18 35 24 37 29 35C33 33 35 29 35 29" stroke="#FFC72C" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'FLEXI':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* FlexiLoans Teal & Violet */}
          <rect width="48" height="48" rx="10" fill="#00A896" />
          <path d="M16 14L28 24L16 34" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 14L36 24L24 34" stroke="#6C5CE7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'SAMMAAN':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Sammaan Capital Royal Blue & Gold */}
          <rect width="48" height="48" rx="10" fill="#0F4C81" />
          <circle cx="24" cy="24" r="13" stroke="#D4AF37" strokeWidth="3" fill="none" />
          <path d="M19 19L29 29M29 19L19 29" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'GRIHUM':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Grihum Housing Finance Green & Orange */}
          <rect width="48" height="48" rx="10" fill="#1B4D3E" />
          <path d="M24 12L37 23H32V35H16V23H11L24 12Z" fill="#E67E22" />
          <circle cx="24" cy="27" r="3" fill="#FFFFFF" />
        </svg>
      );

    case 'FATAAK':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Fataak Pay Electric Flash */}
          <rect width="48" height="48" rx="10" fill="#111827" />
          <path d="M26 8L14 26H24L20 40L34 22H24L26 8Z" fill="#F59E0B" />
        </svg>
      );

    case 'WERIZE':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* WeRize Cyan Gradient */}
          <rect width="48" height="48" rx="10" fill="#0A2540" />
          <path d="M13 16L18 32L24 20L30 32L35 16" stroke="#00D4B2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'SBI MF':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* SBI Mutual Fund */}
          <rect width="48" height="48" rx="10" fill="#00539B" />
          <circle cx="24" cy="22" r="10" fill="#FFFFFF" />
          <rect x="22" y="22" width="4" height="12" fill="#FFFFFF" />
          <path d="M12 36L22 26L28 32L36 24" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'HDFC MF':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* HDFC Mutual Fund */}
          <rect width="48" height="48" rx="10" fill="#004C8F" />
          <rect x="14" y="14" width="20" height="20" fill="#ED1C24" />
          <path d="M18 28L23 23L27 27L32 20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'ICICI PRU MF':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* ICICI Prudential Mutual Fund Crimson & Orange */}
          <rect width="48" height="48" rx="10" fill="#9C1C26" />
          <circle cx="20" cy="24" r="8" fill="#F58220" />
          <circle cx="28" cy="24" r="8" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      );

    case 'ABSL MF':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Aditya Birla Sun Life Mutual Fund */}
          <rect width="48" height="48" rx="10" fill="#8B0000" />
          <circle cx="24" cy="24" r="10" fill="#FDB813" />
          <path d="M24 16V32M16 24H32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'ICICI LIFE':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* ICICI Prudential Life Insurance Shield */}
          <rect width="48" height="48" rx="10" fill="#9C1C26" />
          <path d="M24 10L36 15V25C36 32 24 38 24 38C24 38 12 32 12 25V15L24 10Z" fill="#F58220" />
          <path d="M24 16V32" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    case 'CENTRAL':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Central Life Insurance */}
          <rect width="48" height="48" rx="10" fill="#0A369D" />
          <circle cx="24" cy="24" r="12" stroke="#48CAE4" strokeWidth="3" fill="none" />
          <circle cx="24" cy="24" r="5" fill="#48CAE4" />
        </svg>
      );

    case 'ICICI LOMBARD':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* ICICI Lombard General Insurance */}
          <rect width="48" height="48" rx="10" fill="#9C1C26" />
          <path d="M24 12L35 17V26C35 32 24 36 24 36C24 36 13 32 13 26V17L24 12Z" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M19 24L23 28L29 20" stroke="#F58220" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'INDUSIND':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* IndusInd General Insurance Crimson & Gold */}
          <rect width="48" height="48" rx="10" fill="#861F41" />
          <path d="M16 18C16 18 20 14 26 14C31 14 34 18 34 23C34 28 29 33 22 34" stroke="#E5A823" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'NIPPON LIFE':
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          {/* Nippon Life Insurance Red Sun & Arc */}
          <rect width="48" height="48" rx="10" fill="#0F172A" />
          <circle cx="24" cy="20" r="8" fill="#E60012" />
          <path d="M12 34C16 29 32 29 36 34" stroke="#E60012" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#1E293B" />
          <circle cx="24" cy="24" r="10" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
          <text x="24" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
            {code.slice(0, 3)}
          </text>
        </svg>
      );
  }
};
