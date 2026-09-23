import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { WHATSAPP_CONFIG, FAQ_ITEMS } from '../data/content';
import { FAIcon } from '../components/FAIcon';
import { Simulator } from '../components/Simulator';

interface ServicesPageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
  targetAnchor?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  targetAnchor,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (targetAnchor) {
      const el = document.getElementById(targetAnchor);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [targetAnchor]);

  const whatsappGestionUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    'Bonjour Sanko Togo, je souhaite discuter de la gestion de parc automobile pour notre organisation.'
  )}`;

  const scrollToSimulator = () => {
    const el = document.getElementById('simulateur');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 3.1 — HERO avec image en fond, informations centrées & boutons */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 text-white overflow-hidden border-b border-[#122849]">
        {/* Image de fond avec overlay bleu marine translucide */}
        <div className="absolute inset-0 z-0">
          <img
            src="/offres-hero.jpg"
            alt="Flotte Toyota Corolla Cross Sanko Togo - Solutions professionnelles"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0F2444]/45 bg-gradient-to-t from-[#0F2444]/75 via-[#1A3A6A]/40 to-[#0F2444]/55 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs uppercase tracking-wider font-bold text-white bg-[#0F2444]/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 mb-4">
              Solutions professionnelles
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Des solutions de mobilité adaptées à chaque organisation
            </h1>
            <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed mb-8 max-w-2xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Location longue, courte et moyenne durée, gestion de parc automobile ; nous nous adaptons à la réalité de votre mission.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={scrollToSimulator}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-100 text-[#1A3A6A] px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-[1.02]"
              >
                <FAIcon name="fa-solid fa-calculator" size={15} color="#1A3A6A" />
                <span>Accéder directement au simulateur</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 — SERVICE 1 : Location Longue, Moyenne et Courte Durée */}
      <section id="service-lld" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <span id="service-courte" className="block -mt-24 pt-24 invisible" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full mb-3">
            Service 1
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Location Longue, Moyenne et Courte Durée
          </h2>
          <p className="text-base sm:text-lg font-semibold text-[#1A3A6A] mb-4">
            Une mobilité flexible et stable, sans les contraintes de la propriété.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
            Que votre mission s'étende sur quelques jours, plusieurs mois ou plusieurs années, nous mettons à votre disposition des véhicules récents et parfaitement entretenus, sous contrat flexible et adapté à votre durée d'engagement. Vous bénéficiez d'une mobilité clé en main, sans immobiliser de capital ni gérer la logistique d'entretien.
          </p>

          <div className="w-full max-w-xl bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 mb-8 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 text-center">
              Bénéfices clés :
            </h3>
            <div className="space-y-3">
              {[
                'Chauffeur professionnel dédié obligatoire et inclus',
                'Maîtrise budgétaire totale sans coûts cachés',
                'Aucun investissement en capital requis',
                'Véhicules entretenus, révisés et remplacés selon vos besoins',
                'Assurance tous risques, assistance 24/7 et véhicule relais garanti',
                'Idéal pour missions durables (UN, ONG, ambassades) et déplacements ponctuels',
              ].map((benef, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center shrink-0 mt-0.5">
                    <FAIcon name="fa-solid fa-check" size={11} color="#1A3A6A" />
                  </span>
                  <span className="text-sm text-slate-700">{benef}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verbatim CTA: Simuler cette offre */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={scrollToSimulator}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
            >
              <FAIcon name="fa-solid fa-calculator" size={14} color="#FFFFFF" />
              <span>Simuler cette offre</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3.3 — SERVICE 2 : Gestion de Parc Automobile */}
      <section id="service-gestion" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full mb-3">
            Service 2
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Gestion de Parc Automobile
          </h2>
          <p className="text-base sm:text-lg font-semibold text-[#1A3A6A] mb-4">
            Votre flotte, notre expertise.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
            Nous prenons en charge tout ou partie de la gestion de votre parc automobile : entretien préventif et curatif, suivi administratif, mise à disposition de chauffeurs professionnels qualifiés, suivi télématique du carburant et reporting mensuel transparent.
          </p>

          <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 mb-8 text-left shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 text-center">
              Bénéfices clés :
            </h3>
            <div className="space-y-3">
              {[
                'Gain de temps précieux pour vos équipes internes',
                'Réduction tangible des coûts cachés de gestion',
                'Expertise technique déléguée à des professionnels',
                'Suivi télématique et reporting mensuel pour vos audits',
                'Gestion complète de la maintenance et des assurances',
              ].map((benef, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center shrink-0 mt-0.5">
                    <FAIcon name="fa-solid fa-check" size={11} color="#1A3A6A" />
                  </span>
                  <span className="text-sm text-slate-700">{benef}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verbatim CTA: Discuter de mon besoin sur WhatsApp */}
          <div className="flex justify-center">
            <a
              href={whatsappGestionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
            >
              <FAIcon name="fa-brands fa-whatsapp" size={16} color="#FFFFFF" />
              <span>Discuter de mon besoin sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3.5 — TABLEAU COMPARATIF */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full">
              Comparatif des formules
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Tableau comparatif
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Vue d'ensemble synthétique pour faciliter votre décision.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-900 text-sm">
                  <th className="p-4 sm:p-5 font-bold">Critère</th>
                  <th className="p-4 sm:p-5 font-bold text-[#1A3A6A]">Longue / Moyenne durée</th>
                  <th className="p-4 sm:p-5 font-bold">Gestion de parc</th>
                  <th className="p-4 sm:p-5 font-bold">Courte durée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/30">Durée typique</td>
                  <td className="p-4 sm:p-5 font-medium">Plusieurs mois à plusieurs années</td>
                  <td className="p-4 sm:p-5">Contrat continu</td>
                  <td className="p-4 sm:p-5">Quelques jours à quelques semaines</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/30">Idéal pour</td>
                  <td className="p-4 sm:p-5 font-medium">Missions durables</td>
                  <td className="p-4 sm:p-5">Organisations avec flotte existante</td>
                  <td className="p-4 sm:p-5">Missions ponctuelles</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/30">Chauffeur professionnel</td>
                  <td className="p-4 sm:p-5 font-semibold text-[#1A3A6A]">Obligatoire & inclus</td>
                  <td className="p-4 sm:p-5">Sur mesure (selon parc)</td>
                  <td className="p-4 sm:p-5 font-semibold text-[#1A3A6A]">Obligatoire & inclus</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/30">Gestion de l'entretien</td>
                  <td className="p-4 sm:p-5 font-medium">Assurée par Sanko Togo</td>
                  <td className="p-4 sm:p-5">Assurée par Sanko Togo</td>
                  <td className="p-4 sm:p-5">Assurée par Sanko Togo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3.6 — SIMULATEUR INTÉGRÉ ICI */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Simulator id="simulateur" />
        </div>
      </section>

      {/* 3.7 — FAQ SERVICES (accordéon, icônes plus/moins fines) */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full">
              Foire aux questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              FAQ Services
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Réponses aux interrogations fréquentes des responsables logistique et achats.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200/80 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-[#1A3A6A] cursor-pointer"
                  >
                    <span className="text-sm sm:text-base pr-4">
                      {index + 1}. {item.question}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#1A3A6A] flex items-center justify-center shrink-0">
                      <FAIcon
                        name={isOpen ? 'fa-solid fa-minus' : 'fa-solid fa-plus'}
                        size={12}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/40">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
