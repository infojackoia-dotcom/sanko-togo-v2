import React, { useState, useEffect } from 'react';
import { FAIcon } from './FAIcon';

export interface PartnerItem {
  id: string;
  logo: string;
  alt: string;
  bg?: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LOGOS DES PARTENAIRES SANKO TOGO
 * Les logos occupent tout l'espace de la carte, sans aucune écriture ajoutée.
 * Photos et logos exacts fournis par le client : WiLDAF-AO, Ericsson, Huawei, Moov Africa
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const PARTNERS_LIST: PartnerItem[] = [
  {
    id: 'wildaf-ao',
    logo: '/logos/wildaf-ao.jpg',
    alt: 'Logo WiLDAF-AO',
    bg: 'bg-white',
  },
  {
    id: 'ericsson',
    logo: '/logos/ericsson.jpg',
    alt: 'Logo Ericsson',
    bg: 'bg-white',
  },
  {
    id: 'huawei',
    logo: '/logos/huawei.jpg',
    alt: 'Logo Huawei',
    bg: 'bg-white',
  },
  {
    id: 'moov-africa',
    logo: '/logos/moov-africa.jpg',
    alt: 'Logo Moov Africa',
    bg: 'bg-[#0062BD]',
  },
  {
    id: 'wildaf-ao-2',
    logo: '/logos/wildaf-ao.jpg',
    alt: 'Logo WiLDAF-AO',
    bg: 'bg-white',
  },
  {
    id: 'ericsson-2',
    logo: '/logos/ericsson.jpg',
    alt: 'Logo Ericsson',
    bg: 'bg-white',
  },
  {
    id: 'huawei-2',
    logo: '/logos/huawei.jpg',
    alt: 'Logo Huawei',
    bg: 'bg-white',
  },
  {
    id: 'moov-africa-2',
    logo: '/logos/moov-africa.jpg',
    alt: 'Logo Moov Africa',
    bg: 'bg-[#0062BD]',
  },
];

export const PartnersCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const total = PARTNERS_LIST.length;

  // Responsive: 3 cards visible on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, total - itemsPerView);

  // Auto-scroll from right to left every 3.5 seconds
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Percentage translation
  const translateX = currentIndex * (100 / itemsPerView);

  return (
    <div
      className="w-full relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          <span>Défilement automatique {isPaused ? '(En pause)' : 'actif'}</span>
        </div>

        {/* Chevron Navigation */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Partenaires précédents"
            className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1A3A6A] flex items-center justify-center shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <FAIcon name="fa-solid fa-chevron-left" size={12} color="#1A3A6A" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Partenaires suivants"
            className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1A3A6A] flex items-center justify-center shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <FAIcon name="fa-solid fa-chevron-right" size={12} color="#1A3A6A" />
          </button>
        </div>
      </div>

      {/* Track Container: exactly 3 cards visible side-by-side on desktop */}
      <div className="overflow-hidden py-4 -my-4 px-1 -mx-1">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${translateX}%)`,
          }}
        >
          {PARTNERS_LIST.map((partner) => (
            <div
              key={partner.id}
              className="shrink-0 px-3 sm:px-4"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {/* Carte partenaire arrondie : le logo occupe tout l'espace, sans aucune autre écriture */}
              <div
                className={`group relative rounded-3xl overflow-hidden h-[230px] sm:h-[270px] ${partner.bg || 'bg-white'} border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex items-center justify-center p-3 sm:p-5 cursor-pointer`}
              >
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Afficher le groupe ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? 'w-8 bg-[#1A3A6A]'
                : 'w-2.5 bg-slate-200 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
