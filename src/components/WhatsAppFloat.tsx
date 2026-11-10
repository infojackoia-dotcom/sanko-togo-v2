import React, { useState } from 'react';
import { WHATSAPP_CONFIG } from '../data/content';
import { FAIcon } from './FAIcon';

export const WhatsAppFloat: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    WHATSAPP_CONFIG.defaultMessage
  )}`;

  return (
    <aside
      aria-label="Contact WhatsApp rapide"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover: strictly "Discuter avec nous directement." */}
      <div
        id="whatsapp-tooltip"
        role="tooltip"
        className={`flex items-center bg-white text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-xl border border-slate-100 transition-all duration-300 pointer-events-none whitespace-nowrap ${
          isHovered
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
        }`}
      >
        <span>Discuter avec nous directement.</span>
        <span className="w-2.5 h-2.5 bg-white rotate-45 border-r border-b border-slate-100 absolute -right-1 top-1/2 -translate-y-1/2"></span>
      </div>

      {/* Floating Button permanently visible on phone, tablet, and desktop */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter avec nous directement."
        title="Discuter avec nous directement."
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white ring-2 ring-[#25D366]/25 cursor-pointer shrink-0"
      >
        <FAIcon name="fa-brands fa-whatsapp" size={28} color="#FFFFFF" />
      </a>
    </aside>
  );
};

