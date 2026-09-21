import React from 'react';

/**
 * Official AgriSarthi Logo & Wordmark Component
 * Renders the authentic botanical branding featuring:
 * - Curved leaf nestled inside the capital 'A'
 * - Stylized upward-angled leaf dotting the 'i'
 * - Deep botanical green typography
 * - Optional "— FARM SMARTER TOGETHER" tagline
 */
export default function AgriSarthiLogo({ 
  className = 'h-8 sm:h-9', 
  withTagline = false,
  onDark = false,
  showBadge = false,
  badgeText = 'ROBOTICS'
}) {
  const logoSrc = withTagline 
    ? '/images/agrisarthi_logo_full.png' 
    : '/images/agrisarthi_wordmark.png';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${onDark ? 'filter drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]' : ''}`}>
      <img
        src={logoSrc}
        alt="AgriSarthi Logo"
        className={`${className} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
        loading="eager"
      />
      {showBadge && (
        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 uppercase">
          {badgeText}
        </span>
      )}
    </div>
  );
}
