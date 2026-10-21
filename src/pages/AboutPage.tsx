import React from 'react';
import { PageId } from '../types';
import { FAIcon } from '../components/FAIcon';
import { PartnersCarousel } from '../components/PartnersCarousel';
import { FleetShowcase } from '../components/FleetShowcase';
import { BrochureLeadModule } from '../components/BrochureLeadModule';

interface AboutPageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
  targetAnchor?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, targetAnchor }) => {
  return (
    <div className="w-full">
      {/* 2.1 — HERO avec image en fond, informations centrées & durée mise à jour */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 text-white overflow-hidden border-b border-[#122849]">
        {/* Background Image with Lighter Navy Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/chauffeur-pro.jpg"
            alt="Chauffeur professionnel Sanko Togo - Mobilité professionnelle au Togo"
            className="w-full h-full object-cover object-center hero-bg-img"
            referrerPolicy="no-referrer"
          />
          {/* Lighter overlay with gradient so the chauffeur and vehicle are clearly visible */}
          <div className="absolute inset-0 bg-[#0F2444]/40 bg-gradient-to-t from-[#0F2444]/70 via-[#1A3A6A]/35 to-[#0F2444]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-bold text-white bg-[#0F2444]/75 backdrop-blur-md px-4 py-1.5 rounded-full inline-block shadow-sm border border-white/20">
              À propos de Sanko Togo
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mt-4 mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Une expertise reconnue en mobilité professionnelle au Togo
            </h1>
            <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Depuis +10 ans, nous mettons notre savoir-faire au service des organisations qui ne peuvent pas se permettre l'approximation.
            </p>
          </div>
        </div>
      </section>

      {/* 2.2 — NOTRE HISTOIRE (Origines & Vocation, titre et description centrés au milieu du site) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full inline-block">
              Origines & Vocation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-6 text-center">
              Notre histoire
            </h2>
            <div className="text-center text-slate-600 text-base sm:text-lg leading-relaxed bg-slate-50/70 p-8 sm:p-10 rounded-2xl border border-slate-200/70 w-full shadow-sm">
              <p>
                Implanté au Togo depuis plus de 10 ans, SANKO TOGO a une conviction simple : les organisations qui opèrent au Togo, qu'elles soient internationales, institutionnelles ou privées, ont besoin d'un partenaire de mobilité fiable, capable de s'adapter à leurs exigences opérationnelles et administratives. Année après année, nous avons construit notre expertise aux côtés d'agences des Nations Unies, d'ONG internationales et de grandes entreprises, en faisant de la rigueur et de la réactivité nos priorités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.3 — MISSION / VISION */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 card-hover flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#1A3A6A] text-white flex items-center justify-center mb-5 shadow-xs">
                <FAIcon name="fa-regular fa-compass" size={20} color="#FFFFFF" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-center">
                Garantir à chaque organisation une mobilité fiable, sécurisée et sans contrainte de gestion, pour qu'elle puisse se concentrer sur sa mission.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 card-hover flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#1A3A6A] text-white flex items-center justify-center mb-5 shadow-xs">
                <FAIcon name="fa-regular fa-eye" size={20} color="#FFFFFF" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-center">
                Devenir le partenaire de référence en mobilité professionnelle pour les institutions opérant au Togo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.4 — NOS VALEURS (4 items, icônes Font Awesome petites) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full">
              Piliers fondamentaux
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Nos valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fiabilité */}
            <div className="p-6 rounded-2xl border border-slate-200/80 card-hover bg-white flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-4">
                <FAIcon name="fa-regular fa-handshake" size={19} color="#1A3A6A" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 text-center">
                Fiabilité
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-center">
                Des véhicules et un service sur lesquels vous pouvez compter, sans exception.
              </p>
            </div>

            {/* Sécurité */}
            <div className="p-6 rounded-2xl border border-slate-200/80 card-hover bg-white flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-4">
                <FAIcon name="fa-solid fa-shield-halved" size={19} color="#1A3A6A" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 text-center">
                Sécurité
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-center">
                Un entretien rigoureux et un suivi constant de notre flotte.
              </p>
            </div>

            {/* Réactivité */}
            <div className="p-6 rounded-2xl border border-slate-200/80 card-hover bg-white flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-4">
                <FAIcon name="fa-solid fa-bolt" size={19} color="#1A3A6A" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 text-center">
                Réactivité
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-center">
                Une équipe disponible et joignable, pour répondre vite à vos besoins.
              </p>
            </div>

            {/* Transparence */}
            <div className="p-6 rounded-2xl border border-slate-200/80 card-hover bg-white flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-4">
                <FAIcon name="fa-regular fa-file-lines" size={19} color="#1A3A6A" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 text-center">
                Transparence
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-center">
                Des conditions claires, sans surprise, du premier échange au contrat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 — NOTRE FLOTTE & GALERIE DES MODÈLES AVEC PHOTOS */}
      <FleetShowcase onNavigate={onNavigate} targetAnchor={targetAnchor} />

      {/* 2.6 — ILS NOUS FONT CONFIANCE — FOND BLANC AVEC CARTES BLEUES ARRONDIES */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/8 px-3.5 py-1 rounded-full inline-block">
              Références & Partenaires
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3 tracking-tight">
              Ils nous font confiance
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Nous accompagnons des institutions, organisations et entreprises de référence aux exigences élevées au Togo :
            </p>
          </div>

          {/* 3 Cartes bleues visibles avant déroulement automatique de droite à gauche */}
          <div className="max-w-6xl mx-auto">
            <PartnersCarousel />
          </div>
        </div>
      </section>

      {/* 2.7 — MODULE BROCHURE INSTITUTIONNELLE (VERSION COMPACTE) */}
      <BrochureLeadModule variant="compact" />
    </div>
  );
};
