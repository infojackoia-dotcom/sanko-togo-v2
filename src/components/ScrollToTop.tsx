import React, { useState, useEffect } from 'react';
import { FAIcon } from './FAIcon';

interface ScrollToTopProps {
  currentPage?: string;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ currentPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const main = document.querySelector('main');
      if (!main) {
        setIsVisible(false);
        return;
      }

      // Identify the last section of the page content before the footer
      const sections = main.querySelectorAll('section');
      const lastSection =
        sections.length > 0
          ? (sections[sections.length - 1] as HTMLElement)
          : (main.lastElementChild as HTMLElement | null);

      if (!lastSection) {
        setIsVisible(false);
        return;
      }

      const lastSectionRect = lastSection.getBoundingClientRect();

      // Trigger: Dès que l'utilisateur arrive sur la dernière section avant le pied de page,
      // le bouton s'affiche et RESTE visible jusqu'au bas de page (y compris dans le footer).
      // Il ne disparaît que lorsque l'utilisateur remonte au-dessus de cette dernière section.
      const isTriggered = lastSectionRect.top <= window.innerHeight * 0.85;

      setIsVisible(isTriggered);
    };

    // Run check after render & mount
    const timeoutId = setTimeout(checkVisibility, 80);

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-22 right-5.5 sm:bottom-25 sm:right-6.5 z-40 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover */}
      <div
        role="tooltip"
        className={`hidden sm:flex items-center absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 whitespace-nowrap transition-all duration-200 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span>Haut de page</span>
        <span className="w-2 h-2 bg-slate-900 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2 border-r border-t border-slate-700"></span>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Retourner en haut de la page"
        title="Retourner en haut de la page"
        className="w-12 h-12 rounded-full bg-white hover:bg-[#1A3A6A] text-[#1A3A6A] hover:text-white shadow-xl hover:shadow-2xl border border-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
      >
        <FAIcon
          name="fa-solid fa-arrow-up"
          size={16}
          className="group-hover:-translate-y-0.5 transition-transform"
        />
      </button>
    </div>
  );
};
