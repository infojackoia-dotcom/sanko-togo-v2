import React from 'react';

interface SankoLogoProps {
  size?: number | string;
  className?: string;
  ariaLabel?: string;
  variant?: 'navy' | 'light' | 'white';
}

export const SankoLogo: React.FC<SankoLogoProps> = ({
  size = 36,
  className = '',
  ariaLabel = 'Logo SANKO TOGO',
  variant = 'navy',
}) => {
  const widthVal = typeof size === 'number' ? size : size;
  const heightVal = typeof size === 'number' ? Math.round(size * (60 / 66)) : size;

  const isLight = variant === 'light' || variant === 'white';

  return (
    <svg
      width={widthVal}
      height={heightVal}
      viewBox="17 21.5 66 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 block ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        {/* Face 1 (Top-Right) Gradient */}
        <linearGradient id={isLight ? "sanko-light-face-1" : "sanko-navy-face-1"} x1="40%" y1="20%" x2="80%" y2="65%">
          <stop offset="0%" stopColor={isLight ? "#FFFFFF" : "#2D548F"} />
          <stop offset="55%" stopColor={isLight ? "#E2E8F0" : "#1A3A6A"} />
          <stop offset="100%" stopColor={isLight ? "#CBD5E1" : "#112442"} />
        </linearGradient>

        {/* Face 2 (Bottom) Gradient */}
        <linearGradient id={isLight ? "sanko-light-face-2" : "sanko-navy-face-2"} x1="80%" y1="60%" x2="30%" y2="80%">
          <stop offset="0%" stopColor={isLight ? "#94A3B8" : "#0E1E36"} />
          <stop offset="45%" stopColor={isLight ? "#CBD5E1" : "#1A3A6A"} />
          <stop offset="100%" stopColor={isLight ? "#E2E8F0" : "#24477A"} />
        </linearGradient>

        {/* Face 3 (Left) Gradient */}
        <linearGradient id={isLight ? "sanko-light-face-3" : "sanko-navy-face-3"} x1="20%" y1="75%" x2="50%" y2="30%">
          <stop offset="0%" stopColor={isLight ? "#CBD5E1" : "#142B4E"} />
          <stop offset="50%" stopColor={isLight ? "#F1F5F9" : "#1A3A6A"} />
          <stop offset="100%" stopColor={isLight ? "#FFFFFF" : "#325D9B"} />
        </linearGradient>

        {/* Depth filter */}
        <filter id={isLight ? "sanko-light-depth" : "sanko-navy-depth"} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.7" floodColor={isLight ? "#000000" : "#0A1526"} floodOpacity={isLight ? "0.25" : "0.4"} />
        </filter>
      </defs>

      {/* Face 3: Left Slanted Band */}
      <polygon
        points="30,79 19,61 40,24 50,42 39,61"
        fill={isLight ? "url(#sanko-light-face-3)" : "url(#sanko-navy-face-3)"}
      />

      {/* Face 2: Bottom Horizontal Band */}
      <polygon
        points="81,61 70,79 30,79 39,61 61,61"
        fill={isLight ? "url(#sanko-light-face-2)" : "url(#sanko-navy-face-2)"}
        filter={isLight ? "url(#sanko-light-depth)" : "url(#sanko-navy-depth)"}
      />

      {/* Face 1: Top-Right Overlapping Band */}
      <polygon
        points="40,24 60,24 81,61 61,61 50,42"
        fill={isLight ? "url(#sanko-light-face-1)" : "url(#sanko-navy-face-1)"}
        filter={isLight ? "url(#sanko-light-depth)" : "url(#sanko-navy-depth)"}
      />
    </svg>
  );
};

