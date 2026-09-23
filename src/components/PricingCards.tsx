import React from 'react';
import { FAIcon } from './FAIcon';
import { PageId } from '../types';
import { WHATSAPP_CONFIG } from '../data/content';

interface PricingCardsProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const PricingCards: React.FC<PricingCardsProps> = ({ onNavigate }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    'Bonjour Sanko Togo, je souhaite obtenir un devis pour vos formules de location de véhicules.'
  )}`;

  const pricingPlans = [
    {
      id: 'courte',
      tag: 'Ponctuel',
      name: 'Courte Durée',
      period: '/ Jour',
      price: '35 000',
      currency: 'FCFA',
      description: 'Idéal pour missions de quelques jours, ateliers, visites terrain ou délégations temporaires.',
      features: [
        'Mise à disposition rapide à Lomé',
        'Assurance tous risques incluse',
        'Assistance dépannage 24/7',
        'Chauffeur professionnel inclus (obligatoire)',
        'Contrôle technique et nettoyage pré-départ',
        'Véhicule relais garanti',
      ],
      isPopular: false,
      btnLabel: 'Simuler cette formule',
      targetAnchor: 'service-courte',
    },
    {
      id: 'moyenne',
      tag: 'Le Plus Demandé',
      name: 'Moyenne Durée',
      period: '/ Mois',
      price: '650 000',
      currency: 'FCFA',
      description: 'Pour projets de développement de 1 à 6 mois, missions semestrielles ou programmes d\'urgence.',
      features: [
        'Tarifs dégressifs avec remise de volume',
        'Entretien préventif régulier inclus',
        'Assurance complète et vignettes',
        'Chauffeur professionnel dédié inclus (obligatoire)',
        'Véhicule relais en moins de 2h à Lomé',
        'Facturation conforme aux audits bailleurs',
      ],
      isPopular: true,
      btnLabel: 'Simuler cette formule',
      targetAnchor: 'simulateur',
    },
    {
      id: 'longue',
      tag: 'Pérenne',
      name: 'Longue Durée (LLD)',
      period: '/ Contrat Annuel',
      price: 'Sur Mesure',
      currency: '',
      description: 'Pour agences des Nations Unies, ambambassades et grandes entreprises (1 à 3 ans renouvelables).',
      features: [
        'Véhicules neufs ou très récents',
        'Gestion intégrale de l\'entretien et des pièces',
        'Zéro immobilisation de capital',
        'Reporting mensuel et suivi télématique',
        'Gestion administrative totale (taxes, assurances)',
        'Gestion des chauffeurs et planning clé en main',
      ],
      isPopular: false,
      btnLabel: 'Discuter d\'un contrat LLD',
      targetAnchor: 'service-lld',
    },
  ];

  return (
    <section id="tarifs" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header in strict Navy Blue & White */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-white/80 bg-white/10 px-3.5 py-1 rounded-full">
              Formules Flexibles
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3">
              Nos Formules de Mobilité
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-lg">
              Une clarté budgétaire totale, sans coûts cachés, adaptée aux exigences de chaque organisation.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              type="button"
              onClick={() => onNavigate('services', 'simulateur')}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#1A3A6A] px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer group"
            >
              <span>Accéder au Simulateur</span>
              <span className="w-6 h-6 rounded-full bg-[#1A3A6A] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <FAIcon name="fa-solid fa-arrow-right" size={10} color="#FFFFFF" />
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards in strict Navy Blue & White */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? 'bg-[#1A3A6A] text-white shadow-2xl scale-100 lg:-translate-y-2 border-2 border-white/40'
                    : 'bg-slate-800/80 text-white border border-slate-700/60 hover:border-slate-500'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <span className="absolute -top-3.5 right-8 bg-white text-[#1A3A6A] text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    {plan.tag}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-white">
                      {plan.name}
                    </h3>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-white/10 text-white">
                      <FAIcon
                        name={plan.isPopular ? 'fa-solid fa-crown' : 'fa-solid fa-arrow-up-right-from-square'}
                        size={12}
                        color="#FFFFFF"
                      />
                    </span>
                  </div>

                  <p className="text-xs mb-6 text-slate-300">
                    {plan.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-white/15">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {plan.price}
                      </span>
                      {plan.currency && (
                        <span className="text-xs font-bold ml-1 text-white/90">{plan.currency}</span>
                      )}
                      <span className="text-xs font-medium text-slate-300">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white text-[#1A3A6A]">
                          <FAIcon name="fa-solid fa-check" size={9} color="#1A3A6A" />
                        </span>
                        <span className="text-slate-200">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (plan.id === 'longue') {
                        window.open(whatsappUrl, '_blank');
                      } else {
                        onNavigate('services', 'simulateur');
                      }
                    }}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      plan.isPopular
                        ? 'bg-white text-[#1A3A6A] hover:bg-slate-100'
                        : 'bg-[#1A3A6A] text-white hover:bg-[#234c89] border border-white/20'
                    }`}
                  >
                    <span>{plan.btnLabel}</span>
                    <FAIcon
                      name="fa-solid fa-arrow-right"
                      size={12}
                      color={plan.isPopular ? '#1A3A6A' : '#FFFFFF'}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
