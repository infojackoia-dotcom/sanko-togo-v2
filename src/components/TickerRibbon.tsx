import React from 'react';
import { FAIcon } from './FAIcon';

interface TickerRibbonProps {
  variant?: 'navy' | 'white';
  className?: string;
}

export const TickerRibbon: React.FC<TickerRibbonProps> = ({ variant = 'navy', className = '' }) => {
  const items = [
    'Location Longue Durée (LLD)',
    'Gestion de Flotte Automobile',
    'Partenaire Agences ONU & ONG',
    'Véhicules 4x4',
    'Assistance 24/7 Partout au Togo',
    'Chauffeurs Professionnels Habilités',
    'Véhicule Relais Garanti en 2h',
    'Facturation Normée Bailleurs',
    'Lomé & Intérieur du Pays',
  ];

  const bgStyle =
    variant === 'white'
      ? 'bg-white text-[#1A3A6A] border-y border-slate-200'
      : 'bg-[#1A3A6A] text-white border-y border-[#122849]';

  const starColor = variant === 'white' ? '#1A3A6A' : '#FFFFFF';

  return (
    <div
      className={`w-full overflow-hidden py-3.5 ${bgStyle} ${className}`}
    >
      <div className="flex w-max animate-marquee space-x-8 items-center text-xs sm:text-sm font-extrabold uppercase tracking-wider select-none">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-6 shrink-0">
            <span>{text}</span>
            <span className="opacity-80">
              <FAIcon name="fa-solid fa-asterisk" size={10} color={starColor} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
