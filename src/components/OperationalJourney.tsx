import React from 'react';
import { FAIcon } from './FAIcon';

export const OperationalJourney: React.FC = () => {
  const compliancePoints = [
    {
      title: 'Registre de commerce (RCCM) & NIF certifiés',
      desc: 'Entreprise de droit togolais enregistrée, en conformité fiscale et sociale totale.',
    },
    {
      title: 'Facturation aux normes bailleurs internationaux',
      desc: 'Documents conformes pour vos audits financiers (USAID, UE, AFD, Système ONU, Ambassades).',
    },
    {
      title: 'Assurances tous risques professionnelles',
      desc: 'Couverture complète passagers, tiers et véhicule avec attestation délivrée pour chaque mission.',
    },
    {
      title: 'Contrôles techniques semestriels rigoureux',
      desc: 'Audit de sécurité avant chaque départ terrain : pneumatiques, freinage, climatisation et équipement de secours.',
    },
  ];

  const operationalPoints = [
    {
      title: 'Véhicule relais garanti en moins de 2h',
      desc: 'À Lomé et sur les principaux axes, continuité immédiate de vos missions sans interruption.',
    },
    {
      title: 'Chauffeurs formés à la conduite défensive',
      desc: 'Personnel habilité, discret, respectant scrupuleusement les protocoles de sécurité institutionnels.',
    },
    {
      title: 'Télématique & maintenance préventive',
      desc: 'Suivi rigoureux du kilométrage, vidanges et pièces d\'usure avant toute apparition de défaillance.',
    },
    {
      title: 'Assistance 24/7 partout au Togo',
      desc: 'Ligne directe WhatsApp et permanence téléphonique pour une intervention rapide à toute heure.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header in strict Navy Blue & White */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full">
            Organisation & Rigueur
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
            Notre Démarche Qualité & Sécurité
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Une méthodologie structurée pour répondre aux exigences les plus strictes de nos partenaires B2B et institutionnels.
          </p>
        </div>

        {/* 2 Column Cards in strict Navy Blue & White */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Normes & Conformité */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1A3A6A] text-white flex items-center justify-center font-bold shadow-xs">
                  <FAIcon name="fa-solid fa-file-shield" size={20} color="#FFFFFF" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1A3A6A] uppercase tracking-wider">
                    Conformité Institutionnelle
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Normes & Législation
                  </h3>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                {compliancePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Support Opérationnel 24/7 */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1A3A6A] text-white flex items-center justify-center font-bold shadow-xs">
                  <FAIcon name="fa-solid fa-shield-halved" size={20} color="#FFFFFF" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1A3A6A] uppercase tracking-wider">
                    Réactivité Terrain
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Support Opérationnel 24/7
                  </h3>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                {operationalPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      <FAIcon name="fa-solid fa-check" size={10} color="#1A3A6A" />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
