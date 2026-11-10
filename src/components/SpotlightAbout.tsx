import React from 'react';
import { FAIcon } from './FAIcon';
import { PageId } from '../types';

interface SpotlightAboutProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const SpotlightAbout: React.FC<SpotlightAboutProps> = ({ onNavigate }) => {
  return (
    <section id="a-propos-apercu" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deep Curved Dark Container in strict Navy Blue (#1A3A6A) & White */}
        <div className="bg-[#1A3A6A] rounded-3xl lg:rounded-[36px] p-6 sm:p-10 lg:p-12 xl:p-14 text-white overflow-hidden relative shadow-xl">
          {/* Subtle decorative background circles */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-xl" />
          <div className="absolute left-1/3 -top-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 xl:gap-14 items-center relative z-10">
            {/* Left Column: Visual card model with attached Hilux fleet photo, widened for equal left/right margins */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-t-[32px] sm:rounded-t-[40px] overflow-hidden shadow-2xl border border-white/10 group">
                {/* Hilux Fleet photo intact in background */}
                <img
                  src="/flotte-hilux.jpg"
                  alt="Flotte Sanko Togo - Notre Histoire"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Refined gradient overlay for contrast and focus on text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/35 to-slate-900/25" />

                {/* Subtle top editorial accent line matching reference */}
                <div className="absolute top-6 left-8 w-16 h-[1.5px] bg-white/40" />

                {/* Center "Notre Histoire" with fine line and center dot */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 select-none">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                    Notre Histoire
                  </h3>

                  {/* Decorative horizontal line with central accent dot */}
                  <div className="w-44 sm:w-56 mt-4 flex items-center justify-center relative">
                    <div className="w-full h-[1.5px] bg-white/60" />
                    <span className="absolute w-3.5 h-3.5 rounded-full bg-[#38bdf8] border-2 border-white shadow-sm" />
                  </div>
                </div>

                {/* Sculpted organic wave cutout at bottom matching reference */}
                <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10">
                  <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-10 sm:h-14 text-[#1A3A6A]"
                    fill="currentColor"
                  >
                    <path d="M0,0 C180,80 380,-30 600,40 C820,110 1020,10 1200,35 L1200,120 Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Text centered as requested */}
            <div className="lg:col-span-6 space-y-6 text-center flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest font-bold text-white/80 bg-white/10 px-3.5 py-1 rounded-full inline-block">
                  À Propos de Nous
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight">
                  Bienvenue a SANKO TOGO
                </h2>
              </div>

              {/* Text updated according to user instructions */}
              <div className="space-y-3.5 text-white/90 text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto">
                <p>
                  Implanté au Togo depuis +13 ans, SANKO TOGO a une conviction simple : les organisations qui opèrent au Togo méritent un partenaire de mobilité à la hauteur de leurs exigences de rigueur, de ponctualité et de sécurité.
                </p>
                <p className="text-white/80">
                  Nous nous positionnons comme le tiers de confiance logistique des institutions, ambassades, ONG et entreprises, en proposant une offre clé en main alliant modernité de la flotte et excellence opérationnelle.
                </p>
              </div>
            </div>
          </div>

          {/* Centered CTA Button in the horizontal center of the site */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center items-center relative z-10">
            <button
              type="button"
              onClick={() => onNavigate('a-propos')}
              className="inline-flex items-center gap-3.5 bg-white hover:bg-slate-100 text-[#1A3A6A] px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <span>Découvrir Notre Histoire</span>
              <span className="w-6 h-6 rounded-full bg-[#1A3A6A] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <FAIcon name="fa-solid fa-arrow-right" size={10} color="#FFFFFF" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
