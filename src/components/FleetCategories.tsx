import React from 'react';
import { FAIcon } from './FAIcon';
import { PageId } from '../types';

interface FleetCategoriesProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const FleetCategories: React.FC<FleetCategoriesProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'suv',
      name: 'SUV',
      subtitle: 'Polyvalence & Confort',
      icon: 'fa-solid fa-car',
    },
    {
      id: 'berline',
      name: 'Berline',
      subtitle: 'Protocole & Direction',
      icon: 'fa-solid fa-car-side',
    },
    {
      id: '4x4',
      name: '4x4',
      subtitle: 'Missions Terrain & Pistes',
      icon: 'fa-solid fa-truck-pickup',
    },
    {
      id: 'minibus',
      name: 'Minibus',
      subtitle: 'Équipes & Ateliers',
      icon: 'fa-solid fa-van-shuttle',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full">
            Notre Flotte
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
            Des Véhicules Rigoureusement Contrôlés
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Une gamme complète répondant aux normes de confort et de sécurité des institutions au Togo.
          </p>
        </div>

        {/* 4 Tool/Category Capsules in strict White & Navy Blue */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('a-propos', `flotte-${cat.id}`)}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-[#1A3A6A] card-hover flex flex-col items-center text-center cursor-pointer shadow-2xs group"
            >
              {/* Top circle with icon in Navy Blue & White */}
              <div className="w-14 h-14 rounded-2xl bg-[#1A3A6A]/10 text-[#1A3A6A] group-hover:bg-[#1A3A6A] group-hover:text-white flex items-center justify-center mb-4 transition-all duration-300 shadow-2xs">
                <FAIcon name={cat.icon} size={22} />
              </div>

              <h4 className="font-bold text-base text-slate-900 group-hover:text-[#1A3A6A] leading-snug transition-colors">
                {cat.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {cat.subtitle}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#1A3A6A] group-hover:underline">
                <span>Voir les modèles</span>
                <FAIcon name="fa-solid fa-arrow-right" size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
