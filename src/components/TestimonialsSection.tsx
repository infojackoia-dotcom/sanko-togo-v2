import React, { useState } from 'react';
import { FAIcon } from './FAIcon';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Kofi Mensah',
    role: 'Coordonnateur des Opérations & Logistique',
    organization: 'Agence du Système des Nations Unies (Lomé)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content:
      'Dans le cadre de nos missions humanitaires et de suivi dans la région des Savanes et de Kara, la fiabilité des véhicules 4x4 de Sanko Togo a été exemplaire. Leur réactivité pour la maintenance et la mise à disposition de chauffeurs expérimentés répond en tout point aux standards rigoureux exigés par nos protocoles.',
    rating: 5.0,
  },
  {
    id: '2',
    name: 'Amina Lawson',
    role: 'Directrice Administrative & Financière',
    organization: 'ONG Internationale de Coopération Sanitaire',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content:
      'La formule Location Longue Durée (LLD) de Sanko Togo a transformé notre gestion budgétaire. Plus aucun imprévu de réparations, des factures conformes à nos audits bailleurs et un véhicule relais disponible en moins de deux heures à Lomé. Un véritable partenaire de confiance.',
    rating: 5.0,
  },
  {
    id: '3',
    name: 'Benoît D\'Almeida',
    role: 'Responsable des Achats & Moyens Généraux',
    organization: 'Groupe Bancaire & Institution Financière Régionale',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    content:
      'Nous confions l’ensemble de notre parc de direction et de transport protocolaire à Sanko Togo. Leur suivi préventif régulier et la propreté irréprochable des véhicules font honneur à l’image de marque de notre institution auprès de nos délégations.',
    rating: 5.0,
  },
  {
    id: '4',
    name: 'Sarah Adjovi',
    role: 'Chargée du Protocole & Relations Extérieures',
    organization: 'Délégation de Coopération Internationale',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content:
      'Pour l’accueil de personnalités diplomatiques et les visites de délégations officielles, la ponctualité, la tenue irréprochable des chauffeurs professionnels et l’état neuf des SUV garantissent une image sans faille.',
    rating: 5.0,
  },
  {
    id: '5',
    name: 'Marc Kodjovi',
    role: 'Directeur Logistique Projets BTP & Infrastructures',
    organization: 'Société d’Ingénierie & Travaux Publics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    content:
      'Sur les axes difficiles et les pistes des Plateaux, les pick-up 4x4 robustes avec chauffeurs formés à la conduite préventive ont permis un suivi de nos chantiers sans interruption technique ni retard logistique.',
    rating: 5.0,
  },
  {
    id: '6',
    name: 'Dr. Elom Amouzou',
    role: 'Responsable des Missions Terrain',
    organization: 'Programme Régional de Développement Sanitaire',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    content:
      'L’assistance 24h/24 et la qualification des chauffeurs professionnels dédiés apportent une sécurité totale à nos équipes médicales lors de leurs déplacements dans les zones reculées du pays.',
    rating: 5.0,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items to make the horizontal marquee continuous and seamless
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Header section in strict Navy Blue & White */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
            Témoignages Clients
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
            La Confiance De Nos Partenaires
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Ce que disent les responsables logistiques, directeurs administratifs et chefs de mission au Togo.
          </p>

          {/* Status hint pill */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Défilement continu de droite à gauche • Survolez une carte pour figer la lecture</span>
          </div>
        </div>
      </div>

      {/* Single-line horizontal continuous carousel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left gradient fade overlay */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

        {/* Right gradient fade overlay */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Infinite scrolling track on a single line */}
        <div
          className="flex items-stretch gap-6 py-4 animate-marquee"
          style={{
            animationDuration: '55s',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedTestimonials.map((testi, idx) => (
            <div
              key={`${testi.id}-${idx}`}
              className="w-[320px] sm:w-[400px] md:w-[450px] shrink-0 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#1A3A6A]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header of the card: Rating & Verified tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#1A3A6A]">
                    {[...Array(5)].map((_, i) => (
                      <FAIcon key={i} name="fa-solid fa-star" size={13} color="#1A3A6A" />
                    ))}
                    <span className="text-xs font-black text-[#1A3A6A] ml-1.5">
                      {testi.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#1A3A6A] bg-[#1A3A6A]/5 px-2.5 py-1 rounded-full border border-[#1A3A6A]/15 flex items-center gap-1">
                    <FAIcon name="fa-solid fa-check" size={10} color="#1A3A6A" />
                    Partenaire certifié
                  </span>
                </div>

                {/* Content quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{testi.content}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 mt-auto">
                <img
                  src={testi.avatar}
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{testi.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{testi.role}</p>
                  <p className="text-xs font-bold text-[#1A3A6A] truncate">{testi.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action button to pause / resume manual control */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <FAIcon
            name={isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause'}
            size={11}
            color="#1A3A6A"
          />
          <span>{isPaused ? 'Reprendre le défilement automatique' : 'Mettre le défilement en pause'}</span>
        </button>
      </div>
    </section>
  );
};
