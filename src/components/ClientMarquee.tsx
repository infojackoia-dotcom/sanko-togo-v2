import React from 'react';

export const ClientMarquee: React.FC = () => {
  const organizations = [
    { title: 'Système des Nations Unies', type: 'Agences Onusiennes' },
    { title: 'ONG Internationales Humanitaires', type: 'Secours & Développement' },
    { title: 'Institutions Financières & Banques', type: 'Afrique de l\'Ouest' },
    { title: 'Opérateurs Télécommunications', type: 'Réseaux & Infrastructures' },
    { title: 'Ambassades & Corps Diplomatiques', type: 'Représentations Officielles' },
    { title: 'Universités & Centres de Recherche', type: 'Enseignement Supérieur' },
    { title: 'Programmes de Coopération Bilatérale', type: 'Aide Publique au Développement' },
  ];

  // Repeat array twice for seamless infinite scroll
  const marqueeItems = [...organizations, ...organizations];

  return (
    <div className="w-full bg-slate-50/80 border-y border-slate-100 py-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 text-center">
        <p className="text-xs sm:text-sm font-medium text-slate-600">
          Ils nous ont fait confiance : agences du Système des Nations Unies, ONG internationales, télécommunications et institutions financières.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Subtle gradient edges for professional fading */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 py-2">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white border border-slate-200/70 px-4 py-2.5 rounded-lg shadow-2xs whitespace-nowrap opacity-75 hover:opacity-100 transition-opacity"
            >
              <div className="w-2 h-2 rounded-full bg-[#1A3A6A]"></div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-700 tracking-tight">
                  {item.title}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
