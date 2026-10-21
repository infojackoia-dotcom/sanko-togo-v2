import React from 'react';
import { FAIcon } from './FAIcon';
import { PageId } from '../types';

interface FleetCategoriesProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const FleetCategories: React.FC<FleetCategoriesProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'berline',
      name: 'Berline',
      subtitle: 'Protocole & Direction',
      icon: 'fa-solid fa-car-side',
      image: '/gallery/corolla-champagne-side.jpg',
    },
    {
      id: 'suv',
      name: 'SUV',
      subtitle: 'Polyvalence & Confort',
      icon: 'fa-solid fa-car',
      image: '/gallery/corolla-cross-road.jpg',
    },
    {
      id: '4x4',
      name: '4x4',
      subtitle: 'Missions Terrain & Pistes',
      icon: 'fa-solid fa-truck-pickup',
      image: '/gallery/landcruiser-prado-250-togo.jpg',
    },
    {
      id: 'minibus',
      name: 'Minibus',
      subtitle: 'Équipes & Ateliers',
      icon: 'fa-solid fa-van-shuttle',
      image: '/gallery/parc-automobile-sanko.jpg',
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

        {/* 4 Tool/Category Capsules with Real Gallery Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('a-propos', `flotte-${cat.id}`)}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-[#1A3A6A] card-hover flex flex-col justify-between cursor-pointer shadow-2xs group"
            >
              <div>
                {/* Photo réelle du véhicule issue de la galerie */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs text-[#1A3A6A] flex items-center justify-center shadow-xs">
                    <FAIcon name={cat.icon} size={14} />
                  </div>
                </div>

                <div className="text-center px-1">
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-[#1A3A6A] leading-snug transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

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
