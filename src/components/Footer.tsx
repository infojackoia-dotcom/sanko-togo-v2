import React from 'react';
import { PageId } from '../types';
import { WHATSAPP_CONFIG } from '../data/content';
import { FAIcon } from './FAIcon';
import { SankoLogo } from './SankoLogo';

interface FooterProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    WHATSAPP_CONFIG.defaultMessage
  )}`;

  return (
    <footer className="bg-[#122849] text-white">
      {/* 1. Big "Let's Connect" CTA Block in Clean White Background */}
      <div className="border-b border-slate-200/80 py-16 sm:py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full">
                Parlons Mobilité
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-3 leading-tight">
                Prêt à optimiser la flotte de votre organisation ?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Échangez directement avec nos conseillers ou obtenez une estimation détaillée en quelques minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-full font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>Discuter sur WhatsApp</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FAIcon name="fa-brands fa-whatsapp" size={15} color="#25D366" />
                </span>
              </a>

              <button
                type="button"
                onClick={() => onNavigate('services', 'simulateur')}
                className="inline-flex items-center gap-3 bg-[#1A3A6A] hover:bg-[#142f56] text-white px-8 py-4 rounded-full font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>Simuler votre budget</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#1A3A6A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FAIcon name="fa-solid fa-calculator" size={14} color="#1A3A6A" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer — 4 horizontal columns matching the reference layout */}
      <div id="footer-main-columns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Col 1: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
                <SankoLogo size={30} />
              </div>
              <span className="text-xl font-black tracking-tight text-white leading-none">
                SANKO TOGO
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs">
              Partenaire de référence pour la location de véhicules et la gestion de flotte automobile au Togo.
            </p>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Assistance 24/7 au Togo</span>
              </div>
            </div>
          </div>

          {/* Col 2: Contacts */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Contacts
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <FAIcon name="fa-regular fa-envelope" size={15} color="#cbd5e1" />
                <a
                  href="mailto:officetg@sankosarl.com"
                  className="hover:text-white transition-colors"
                >
                  officetg@sankosarl.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FAIcon name="fa-brands fa-whatsapp" size={16} color="#25D366" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {WHATSAPP_CONFIG.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FAIcon name="fa-solid fa-location-dot" size={14} color="#cbd5e1" />
                <a
                  href="https://maps.app.goo.gl/7HWkoUa2SndLXANr5?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  Boulevard Jean-Paul II, Nukafu – Lomé
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Liens rapides */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Liens rapides
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('accueil');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('a-propos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nos offres
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('accueil', 'faq');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contacts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Réseaux */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Réseaux
            </h4>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://web.facebook.com/sankocars?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Sanko Togo"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-white/30"
              >
                <FAIcon name="fa-brands fa-facebook-f" size={15} />
              </a>
              <a
                href="https://www.instagram.com/sankotogo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Sanko Togo"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-white/30"
              >
                <FAIcon name="fa-brands fa-instagram" size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/sankotogo/home/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Sanko Togo"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-white/30"
              >
                <FAIcon name="fa-brands fa-linkedin-in" size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Mentions & Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">SANKO TOGO</span> — Lomé, Togo
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
            <button
              type="button"
              onClick={() => {
                onNavigate('politique-confidentialite');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors cursor-pointer"
            >
              Politique de Confidentialité
            </button>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => {
                onNavigate('conditions-generales');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors cursor-pointer"
            >
              Conditions Générales d’Utilisation
            </button>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-medium"
              title="Retourner en haut de page"
            >
              <span>Haut de page</span>
              <FAIcon name="fa-solid fa-arrow-up" size={11} color="#cbd5e1" />
            </button>
          </div>

          <div className="text-center md:text-right">
            <span>© {new Date().getFullYear()} SANKO TOGO. Tous droits réservés.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
