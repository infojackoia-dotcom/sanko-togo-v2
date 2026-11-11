import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { WHATSAPP_CONFIG, FAQ_ITEMS } from '../data/content';
import { FAIcon } from '../components/FAIcon';
import { Simulator } from '../components/Simulator';
import { FleetShowcase } from '../components/FleetShowcase';
import { BrochureLeadModule } from '../components/BrochureLeadModule';

interface ServicesPageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
  targetAnchor?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  targetAnchor,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [comparisonView, setComparisonView] = useState<'cards' | 'table'>('cards');

  useEffect(() => {
    if (targetAnchor) {
      const tryScroll = (attemptsLeft: number) => {
        const el = document.getElementById(targetAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attemptsLeft > 0) {
          setTimeout(() => tryScroll(attemptsLeft - 1), 80);
        }
      };

      const timer1 = setTimeout(() => tryScroll(5), 100);
      const timer2 = setTimeout(() => tryScroll(3), 450);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
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
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/offres-hero.jpg"
            alt="Flotte Toyota Corolla Cross Sanko Togo - Solutions professionnelles"
            className="w-full h-full object-cover object-center hero-bg-img"
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
            Que votre mission s'étende sur quelques jours, plusieurs mois ou plusieurs années, nous mettons à votre disposition des véhicules neufs et parfaitement entretenus, sous contrat flexible et adapté à votre durée d'engagement. Vous bénéficiez d'une mobilité clé en main, sans immobiliser de capital ni gérer la logistique d'entretien.
          </p>

          <div className="w-full max-w-xl mx-auto bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 mb-8 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-5 text-center">
              Bénéfices clés :
            </h3>
            <div className="flex justify-center">
              <div className="space-y-3.5 inline-flex flex-col items-start w-full max-w-lg">
                {[
                  'Chauffeur professionnel dédié obligatoire et inclus',
                  'Maîtrise budgétaire totale sans coûts cachés',
                  'Aucun investissement en capital requis',
                  'Véhicules entretenus, révisés et remplacés selon vos besoins',
                  'Assurance tous risques, assistance 24/7 et véhicule relais garanti',
                  'Idéal pour missions durables (UN, ONG, ambassades) et déplacements ponctuels',
                ].map((benef, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <span className="w-5 h-5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center shrink-0 mt-0.5">
                      <FAIcon name="fa-solid fa-check" size={11} color="#1A3A6A" />
                    </span>
                    <span className="text-sm text-slate-700 leading-snug">{benef}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verbatim CTA: Simuler cette offre */}
          <div className="w-full flex justify-center">
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
        <span id="service-2" className="block -mt-24 pt-24 invisible pointer-events-none" />
        <span id="gestion-parc" className="block -mt-24 pt-24 invisible pointer-events-none" />
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

          <div className="w-full max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 mb-8 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-5 text-center">
              Bénéfices clés :
            </h3>
            <div className="flex justify-center">
              <div className="space-y-3.5 inline-flex flex-col items-start w-full max-w-lg">
                {[
                  'Gain de temps précieux pour vos équipes internes',
                  'Réduction tangible des coûts cachés de gestion',
                  'Expertise technique déléguée à des professionnels',
                  'Suivi télématique et reporting mensuel pour vos audits',
                  'Gestion complète de la maintenance et des assurances',
                ].map((benef, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <span className="w-5 h-5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center shrink-0 mt-0.5">
                      <FAIcon name="fa-solid fa-check" size={11} color="#1A3A6A" />
                    </span>
                    <span className="text-sm text-slate-700 leading-snug">{benef}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verbatim CTA: Discuter de mon besoin sur WhatsApp */}
          <div className="w-full flex justify-center">
            <a
              href={whatsappGestionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
            >
              <FAIcon name="fa-brands fa-whatsapp" size={16} color="#FFFFFF" />
              <span>Discuter de mon besoin sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3.4 — NOTRE FLOTTE & GALERIE DES MODÈLES AVEC PHOTOS */}
      <FleetShowcase onNavigate={onNavigate} targetAnchor={targetAnchor} />

      {/* 3.5 — SECTION COMPARATIVE HAUT DE GAMME & BIEN PRÉSENTABLE */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-slate-50/50 to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête centré */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
              Comparatif des formules
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
              Quelle formule correspond à votre besoin ?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Trois solutions claires et sans surprise pour répondre aux exigences des organisations au Togo.
            </p>

            {/* Sélecteur de vue (Cartes vs Tableau) */}
            <div className="mt-6 inline-flex p-1 bg-slate-200/70 rounded-2xl border border-slate-300/50">
              <button
                type="button"
                onClick={() => setComparisonView('cards')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  comparisonView === 'cards'
                    ? 'bg-white text-[#1A3A6A] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FAIcon name="fa-solid fa-table-cells-large" size={13} color={comparisonView === 'cards' ? '#1A3A6A' : '#64748b'} />
                <span>Vue Cartes de Synthèse</span>
              </button>

              <button
                type="button"
                onClick={() => setComparisonView('table')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  comparisonView === 'table'
                    ? 'bg-white text-[#1A3A6A] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FAIcon name="fa-solid fa-table-list" size={13} color={comparisonView === 'table' ? '#1A3A6A' : '#64748b'} />
                <span>Vue Tableau Détaillé</span>
              </button>
            </div>
          </div>

          {/* VUE 1 : CARTES COMPARATIVES HAUTEMENT PRÉSENTABLES */}
          {comparisonView === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {/* CARTE 1 : COURTE DURÉE */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                      Ponctuel & urgent
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      1 à 30 jours
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                    Courte Durée
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                    Pour vos ateliers, délégations temporaires, séminaires ou urgences de terrain.
                  </p>

                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mb-6 text-center">
                    <span className="text-xs text-slate-500 font-medium block">Mode de facturation</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">Forfait journalier clair</span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Véhicule récent</strong> prêt au départ
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Chauffeur professionnel</strong> inclus d'office
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Entretien & réparations</strong> 100% pris en charge
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Remplacement possible</strong> en cas de panne
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-slate-900 hover:bg-[#1A3A6A] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs text-center"
                >
                  Demander un devis rapide →
                </button>
              </div>

              {/* CARTE 2 : LONGUE DURÉE (LLD) - MISE EN AVANT RECOMMANDÉE */}
              <div className="bg-white rounded-3xl border-2 border-[#1A3A6A] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative lg:-translate-y-2">
                {/* Badge statutaire flottant */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A3A6A] text-amber-300 text-xs font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                  ★ Formule la plus choisie
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3A6A] bg-[#1A3A6A]/10 px-3 py-1 rounded-full">
                      Pérenne & économique
                    </span>
                    <span className="text-xs font-semibold text-[#1A3A6A]">
                      1 à 36 mois
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A3A6A] mb-2">
                    Longue Durée (LLD)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    Une flotte permanente pour ONG, ambassades et sociétés, sans immobiliser de capital à l'achat.
                  </p>

                  <div className="bg-[#1A3A6A]/8 rounded-2xl p-4 border border-[#1A3A6A]/15 mb-6 text-center">
                    <span className="text-xs text-[#1A3A6A] font-medium block">Mode de facturation</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#1A3A6A]">Loyer mensuel fixe tout compris</span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800">
                        <strong className="text-[#1A3A6A]">Véhicule neuf ou très récent</strong> réservé à votre mission
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800">
                        <strong className="text-[#1A3A6A]">Chauffeur permanent dédié</strong> en tenue officielle
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800">
                        <strong className="text-[#1A3A6A]">Entretien complet, pièces & pneus</strong> 100% inclus
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800">
                        <strong className="text-[#1A3A6A]">Véhicule relais garanti</strong> de catégorie équivalente
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800">
                        <strong className="text-[#1A3A6A]">Zéro capital immobilisé</strong> & loyer 100% déductible
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToSimulator}
                  className="w-full bg-[#1A3A6A] hover:bg-[#234c89] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:scale-[1.02] text-center flex items-center justify-center gap-2"
                >
                  <FAIcon name="fa-solid fa-calculator" size={13} color="#FFFFFF" />
                  <span>Simuler mon budget en direct</span>
                </button>
              </div>

              {/* CARTE 3 : GESTION DE PARC */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      Flotte existante
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Contrat continu
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                    Gestion de Parc
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                    Vous possédez déjà vos véhicules : SANKO prend en charge vos chauffeurs et la maintenance.
                  </p>

                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mb-6 text-center">
                    <span className="text-xs text-slate-500 font-medium block">Mode de facturation</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">Forfait mensuel par véhicule</span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Conservation intégrale</strong> de vos véhicules actuels
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Chauffeurs SANKO</strong> ou encadrement des vôtres
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Suivi d'entretien, pièces & audits</strong> rigoureux
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Assistance 24/7</strong> & option véhicule relais
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={10} color="#047857" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700">
                        <strong className="text-slate-900">Réduction prouvée</strong> des coûts cachés de gestion
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappGestionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs text-center flex items-center justify-center gap-2"
                >
                  <FAIcon name="fa-brands fa-whatsapp" size={14} color="#FFFFFF" />
                  <span>Échanger sur WhatsApp →</span>
                </a>
              </div>
            </div>
          )}

          {/* VUE 2 : TABLEAU COMPARATIF DÉTAILLÉ ET STYLISÉ */}
          {comparisonView === 'table' && (
            <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-900">
                    <th className="p-5 sm:p-6 w-[26%] bg-slate-50/70 align-top">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Vos critères
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-800">
                        Ce qui change pour vous
                      </span>
                    </th>

                    <th className="p-5 sm:p-6 w-[25%] bg-white border-l border-slate-100 align-top">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-2">
                        Ponctuel
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Courte Durée
                      </h3>
                      <p className="text-xs text-slate-500 font-normal mt-1 leading-snug">
                        1 à 30 jours
                      </p>
                    </th>

                    <th className="p-5 sm:p-6 w-[25%] bg-white border-l border-slate-100 align-top">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-2">
                        Pérenne
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Longue Durée (LLD)
                      </h3>
                      <p className="text-xs text-slate-500 font-normal mt-1 leading-snug">
                        1 à 36 mois
                      </p>
                    </th>

                    <th className="p-5 sm:p-6 w-[25%] bg-white border-l border-slate-100 align-top">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-2">
                        Flotte existante
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Gestion de Parc
                      </h3>
                      <p className="text-xs text-slate-500 font-normal mt-1 leading-snug">
                        Contrat continu
                      </p>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <FAIcon name="fa-solid fa-bullseye" size={13} color="#1A3A6A" />
                        <span>C'est fait pour qui ?</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-slate-600 border-l border-slate-100">
                      Missions ponctuelles, séminaires, consultants ou invités temporaires.
                    </td>
                    <td className="p-5 sm:p-6 text-slate-600 border-l border-slate-100">
                      ONG, ambassades et sociétés voulant une flotte permanente sans l'acheter.
                    </td>
                    <td className="p-5 sm:p-6 text-slate-600 border-l border-slate-100">
                      Organisations qui possèdent déjà des voitures et veulent déléguer la gestion.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <FAIcon name="fa-solid fa-car" size={13} color="#1A3A6A" />
                        <span>La voiture</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-bold text-slate-800">Fournie par SANKO</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Véhicule récent prêt à partir</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-bold text-slate-800">Fournie par SANKO</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Véhicule neuf ou très récent réservé pour vous</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-bold text-slate-800">Votre voiture actuelle</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Vous conservez vos véhicules existants</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <FAIcon name="fa-solid fa-user-tie" size={13} color="#1A3A6A" />
                        <span>Chauffeur</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md text-xs">
                        <FAIcon name="fa-solid fa-check" size={11} color="#047857" />
                        <span>Inclus d'office</span>
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">Chauffeur professionnel dédié</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md text-xs">
                        <FAIcon name="fa-solid fa-check" size={11} color="#047857" />
                        <span>Inclus d'office</span>
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">Chauffeur titulaire dédié à votre mission</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-[#1A3A6A] font-bold bg-[#1A3A6A]/10 px-2.5 py-1 rounded-md text-xs">
                        <span>Au choix</span>
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">Chauffeurs SANKO ou encadrement des vôtres</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <FAIcon name="fa-solid fa-wrench" size={13} color="#1A3A6A" />
                        <span>Entretien & réparations</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-semibold text-slate-800">100% pris en charge</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Aucune mauvaise surprise</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-semibold text-slate-800">100% pris en charge</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Vidanges, révisions, pièces et pneus inclus</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-semibold text-slate-800">Supervisé par SANKO</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Suivi rigoureux et devis négociés</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <FAIcon name="fa-solid fa-shield-halved" size={13} color="#1A3A6A" />
                        <span>En cas de panne</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-semibold text-slate-800">Remplacement possible</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Selon disponibilité</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-semibold text-slate-800">Véhicule relais garanti</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Véhicule de même catégorie mis à disposition</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-semibold text-slate-800">Assistance 24/7</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Dépannage rapide partout au Togo</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <FAIcon name="fa-solid fa-coins" size={13} color="#1A3A6A" />
                        <span>Mode de paiement</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-bold text-slate-800">Tarif par jour</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Facturé à la journée ou à la semaine</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-bold text-slate-800">Loyer mensuel fixe</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Budget fixe, sans capital immobilisé</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <span className="font-bold text-slate-800">Forfait mensuel</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Abonnement calculé par véhicule géré</span>
                    </td>
                  </tr>

                  <tr className="bg-slate-50/40">
                    <td className="p-5 sm:p-6 font-bold text-slate-900 bg-slate-50/80">
                      <span className="text-xs uppercase tracking-wider text-slate-500 block">Prochaine étape</span>
                      <span>Votre action</span>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <button
                        type="button"
                        onClick={() => onNavigate('contact')}
                        className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#1A3A6A] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        <span>Demander un devis</span>
                      </button>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <button
                        type="button"
                        onClick={scrollToSimulator}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        <FAIcon name="fa-solid fa-calculator" size={13} color="#FFFFFF" />
                        <span>Simuler mon budget</span>
                      </button>
                    </td>
                    <td className="p-5 sm:p-6 border-l border-slate-100">
                      <a
                        href={whatsappGestionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        <FAIcon name="fa-brands fa-whatsapp" size={14} color="#FFFFFF" />
                        <span>Discuter sur WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 3.6 — SIMULATEUR INTÉGRÉ ICI */}
      <section id="simulateur" className="py-16 sm:py-24 bg-[#0F2444] text-white scroll-mt-20 border-t border-[#1A3A6A]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-white bg-white/15 px-4 py-1.5 rounded-full inline-block">
              Simulateur de Devis
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3">
              Calculez votre budget en temps réel
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Sélectionnez vos critères de mobilité pour obtenir instantanément une estimation indicative personnalisée.
            </p>
          </div>
          <Simulator id="simulateur-form" />
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

      {/* 3.8 — MODULE BROCHURE INSTITUTIONNELLE (VERSION COMPACTE) */}
      <BrochureLeadModule variant="compact" />
    </div>
  );
};
