import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { WHATSAPP_CONFIG, SITE_CONFIG, BLOG_POSTS } from '../data/content';
import { FAIcon } from '../components/FAIcon';
import { SpotlightAbout } from '../components/SpotlightAbout';
import { FleetCategories } from '../components/FleetCategories';
import { Simulator } from '../components/Simulator';
import { FAQAccordionDark } from '../components/FAQAccordionDark';
import { BrochureLeadModule } from '../components/BrochureLeadModule';

interface HomePageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    'Bonjour Sanko Togo, je souhaite discuter de nos besoins de mobilité d\'organisation.'
  )}`;


  // Quick contact form state for the "Let's Talk" section
  const [contactForm, setContactForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    service: 'Location longue durée (LLD)',
    budget: '',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);

  const homeMailSubject = `Demande de devis projet - ${contactForm.name || 'Prospect'} (${contactForm.organization || 'Organisation'})`;
  const homeMailBody = `Bonjour SANKO TOGO,\n\nNouvelle demande de devis reçue :\n\n• Nom & Prénom : ${contactForm.name}\n• Entreprise / Organisation : ${contactForm.organization}\n• Email : ${contactForm.email}\n• Téléphone : ${contactForm.phone}\n• Service souhaité : ${contactForm.service}\n\nPrécisions sur le besoin :\n${contactForm.message}\n\n---\nTransmis depuis la page d'accueil de sankotogo.tg`;
  const homeMailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(homeMailSubject)}&body=${encodeURIComponent(homeMailBody)}`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    try {
      window.location.href = homeMailtoUrl;
    } catch {
      // safe fallback
    }
  };

  const directFormWhatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    `Bonjour Sanko Togo,\n\nJe vous transmets ma demande de projet :\n• Nom : ${contactForm.name || 'Non précisé'}\n• Entreprise / Organisation : ${contactForm.organization || 'Non précisée'}\n• Email : ${contactForm.email || 'Non précisé'}\n• Téléphone : ${contactForm.phone || 'Non précisé'}\n• Service : ${contactForm.service}\n• Message : ${contactForm.message || 'Demande de devis'}`
  )}`;

  return (
    <div className="w-full bg-white text-slate-800">
      {/* 1. HERO SECTION centered with White Blur on Background, no white card box */}
      <section className="relative min-h-[560px] lg:min-h-[620px] py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-slate-100 flex items-center justify-center">
        {/* Background Image of the Vehicle with white blur */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-suv.jpg"
            alt="Véhicule de flotte Toyota Corolla Cross Sanko Togo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center select-none hero-bg-img"
          />
          {/* White blur overlay directly on the image */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
          {/* Top Greeting Pill Badge with slow zoom-out animation and without dot */}
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: [1.06, 0.98, 1.06], opacity: 1 }}
            transition={{
              scale: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 0.8,
                ease: 'easeOut',
              },
            }}
            className="inline-flex items-center px-5 py-2 rounded-full bg-[#1A3A6A]/10 border border-[#1A3A6A]/20 text-[#1A3A6A] text-xs sm:text-sm font-bold mb-6 select-none"
          >
            <span>Plus de 10 ans d'excellence au Togo</span>
          </motion.div>

          {/* Display Headline on two lines */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#1A3A6A] tracking-tight leading-[1.15] mb-6 max-w-4xl">
            <span className="block">Votre mobilité,</span>
            <span className="block">en toute confiance</span>
          </h1>

          {/* Verbatim Subtitle */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-8 max-w-3xl font-medium">
            Location de véhicules avec chauffeurs professionnels pour entreprises, institutions et particuliers. Service premium, fiabilité garantie.
          </p>

          {/* Action Buttons in strict Navy Blue & White */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 w-full">
            <button
              type="button"
              onClick={() => onNavigate('services', 'simulateur')}
              className="animate-zoom-arriere-slow inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-[#1A3A6A] px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-md cursor-pointer group"
            >
              <span>Simuler votre budget</span>
              <span className="w-7 h-7 rounded-full bg-[#1A3A6A] text-white flex items-center justify-center">
                <FAIcon name="fa-solid fa-calculator" size={12} color="#FFFFFF" />
              </span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-zoom-arriere-slow inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-md cursor-pointer group transition-all"
            >
              <span>Discuter sur WhatsApp</span>
              <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                <FAIcon name="fa-brands fa-whatsapp" size={14} color="#FFFFFF" />
              </span>
            </a>
          </div>

          {/* Trust highlights checklist */}
          <div className="mt-10 pt-8 border-t border-[#1A3A6A]/15 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-bold text-[#1A3A6A] max-w-3xl w-full">
            <div className="flex items-center gap-2">
              <FAIcon name="fa-solid fa-circle-check" size={14} color="#1A3A6A" />
              <span>Gestion flexible</span>
            </div>
            <div className="flex items-center gap-2">
              <FAIcon name="fa-solid fa-circle-check" size={14} color="#1A3A6A" />
              <span>Assistance 24/7 partout au Togo</span>
            </div>
            <div className="flex items-center gap-2">
              <FAIcon name="fa-solid fa-circle-check" size={14} color="#1A3A6A" />
              <span>Chauffeurs professionnels</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. À PROPOS DE NOUS — Deep Navy banner in strict Navy & White */}
      <SpotlightAbout onNavigate={onNavigate} />

      {/* 3. NOS OFFRES (2 OFFRES PRINCIPALES) */}
      <section id="services-apercu" className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête centré au milieu du site */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
              Nos Offres
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
              Des Solutions Adaptées À Chaque Mission
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Deux offres majeures conçues pour répondre à l'ensemble des contraintes de mobilité de vos opérations au Togo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* OFFRE 1 : Location de véhicules */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-[#1A3A6A] transition-all duration-300 shadow-2xs group flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center transition-all group-hover:bg-[#1A3A6A] group-hover:text-white">
                  <FAIcon name="fa-solid fa-car-side" size={22} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#1A3A6A] transition-colors mb-2 leading-snug">
                Location de véhicules
              </h3>

              {/* DETAILS SECTION: Always visible */}
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-[#1A3A6A]">
                    Détail des durées de location :
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">3 formules disponibles</span>
                </div>

                {/* Formule 1: Location Longue Durée */}
                <div
                  onClick={() => onNavigate('services', 'service-lld')}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-[#1A3A6A]/5 border border-slate-200/80 hover:border-[#1A3A6A] transition-all cursor-pointer group/item"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#1A3A6A] text-white flex items-center justify-center shrink-0">
                        <FAIcon name="fa-solid fa-calendar-check" size={14} color="#FFFFFF" />
                      </span>
                      <h4 className="font-bold text-base text-slate-900 group-hover/item:text-[#1A3A6A]">
                        Location Longue Durée (LLD)
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] self-start sm:self-auto">
                      + 6 mois à plusieurs années
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed sm:pl-10">
                    Véhicules neufs ou récents, contrat pérenne, maintenance intégrale, véhicule relais en moins de 2h à Lomé et facturation conforme aux audits.
                  </p>
                </div>

                {/* Formule 2: Location Moyenne Durée */}
                <div
                  onClick={() => onNavigate('services', 'simulateur')}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-[#1A3A6A]/5 border border-slate-200/80 hover:border-[#1A3A6A] transition-all cursor-pointer group/item"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#1A3A6A] text-white flex items-center justify-center shrink-0">
                        <FAIcon name="fa-solid fa-calendar-days" size={14} color="#FFFFFF" />
                      </span>
                      <h4 className="font-bold text-base text-slate-900 group-hover/item:text-[#1A3A6A]">
                        Location Moyenne Durée (LMD)
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] self-start sm:self-auto">
                      1 à 6 mois
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed sm:pl-10">
                    Flexibilité absolue pour missions d'ONG, projets semestriels, audits de bailleurs de fonds et déploiements d'experts techniques.
                  </p>
                </div>

                {/* Formule 3: Location Courte Durée */}
                <div
                  onClick={() => onNavigate('services', 'service-courte')}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-[#1A3A6A]/5 border border-slate-200/80 hover:border-[#1A3A6A] transition-all cursor-pointer group/item"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#1A3A6A] text-white flex items-center justify-center shrink-0">
                        <FAIcon name="fa-solid fa-clock" size={14} color="#FFFFFF" />
                      </span>
                      <h4 className="font-bold text-base text-slate-900 group-hover/item:text-[#1A3A6A]">
                        Location Courte Durée (LCD)
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] self-start sm:self-auto">
                      1 à 30 jours
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed sm:pl-10">
                    Réactivité immédiate pour transferts aéroport, visites de délégations, ateliers ou urgences opérationnelles avec chauffeur.
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => onNavigate('services', 'simulateur')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white py-3 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer"
                  >
                    <FAIcon name="fa-solid fa-calculator" size={14} color="#FFFFFF" />
                    <span>Simuler votre budget de location</span>
                  </button>
                </div>
              </div>
            </div>

            {/* OFFRE 2 : Gestion de parc automobile */}
            <div
              className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-[#1A3A6A] card-hover flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-6 transition-all group-hover:bg-[#1A3A6A] group-hover:text-white">
                  <FAIcon name="fa-solid fa-chart-line" size={22} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#1A3A6A] transition-colors mb-3 leading-snug">
                  Gestion de parc automobile
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  De nos années d'expérience, nous sommes capables de vous fournir une gestion entière de votre parc automobile. Ce service vous permet, soit une gestion entière de votre parc, soit la mise à disposition de chauffeurs professionnels et compétents.
                </p>

                <div className="space-y-3 mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-2">
                    Prestations incluses :
                  </span>
                  {[
                    'Maintenance préventive et curative programmée',
                    'Suivi télématique et géolocalisation de flotte',
                    'Optimisation continue des coûts de carburant',
                    'Reporting mensuel certifié pour audits et directions',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={9} color="#1A3A6A" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 w-full">
                <button
                  type="button"
                  onClick={() => onNavigate('services', 'service-gestion')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>En savoir plus sur la gestion de parc</span>
                  <FAIcon name="fa-solid fa-arrow-right" size={12} color="#FFFFFF" />
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
                    'Bonjour Sanko Togo, je souhaite discuter de la gestion de parc automobile pour notre organisation.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-xs"
                >
                  <FAIcon name="fa-brands fa-whatsapp" size={16} color="#FFFFFF" />
                  <span>Discuter de votre flotte</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bouton Découvrir Toutes Les Offres centré juste après la présentation des offres */}
          <div className="mt-12 text-center flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-3.5 bg-[#1A3A6A] hover:bg-[#142f56] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Découvrir Toutes Les Offres</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#1A3A6A] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <FAIcon name="fa-solid fa-arrow-right" size={12} color="#1A3A6A" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. FLEET & CATEGORIES CAPSULES */}
      <FleetCategories onNavigate={onNavigate} />

      {/* 10. INTERACTIVE SIMULATOR */}
      <section id="simulateur-accueil" className="py-20 sm:py-24 bg-[#0F2444] text-white border-t border-[#1A3A6A]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-white bg-white/15 px-4 py-1.5 rounded-full inline-block">
              Outil d'Estimation Immédiate
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3">
              Estimez votre budget en 1 minute
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Choisissez votre véhicule, indiquez la durée et la zone d'utilisation, et recevez immédiatement une estimation sans engagement.
            </p>
          </div>

          {/* Interactive Multi-Step Simulator Component */}
          <Simulator />
        </div>
      </section>

      {/* 12. LATEST NEWS & BLOGS */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
              Actualités & Veille
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
              Derniers Articles & Conseils Mobilité
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Décryptages pratiques pour optimiser la logistique de votre organisation au Togo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog')}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#1A3A6A] card-hover cursor-pointer flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-[#1A3A6A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 text-center flex flex-col items-center">
                    <div className="flex items-center justify-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#1A3A6A] transition-colors line-clamp-2 leading-snug text-center">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="px-6 py-4 flex items-center justify-center border-t border-slate-100 text-center">
                  <span className="text-xs font-bold text-[#1A3A6A] inline-flex items-center gap-2 group-hover:underline">
                    Lire l'article
                    <span className="w-7 h-7 rounded-full bg-[#1A3A6A]/10 group-hover:bg-[#1A3A6A] group-hover:text-white text-[#1A3A6A] flex items-center justify-center transition-colors">
                      <FAIcon name="fa-solid fa-arrow-right" size={10} />
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-3 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-sm transition-all cursor-pointer group"
            >
              <span>Voir Tous Les Articles</span>
              <span className="w-7 h-7 rounded-full bg-white text-[#1A3A6A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <FAIcon name="fa-solid fa-arrow-right" size={11} color="#1A3A6A" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 13. FAQ SECTION — Navy Dark Container with White Active Accordion */}
      <FAQAccordionDark />

      {/* 13.5 — TÉLÉCHARGEMENT DE LA BROCHURE INSTITUTIONNELLE (MODULE DE CONVERSION B2B) */}
      <BrochureLeadModule variant="full" />

      {/* 14. CONTACT DIRECT */}
      <section id="contact-direct" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête centré au milieu du site */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
              Contactez-nous
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3 leading-tight">
              Parlons de votre prochain projet de mobilité
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
              Vous préparez une mission, un projet pluriannuel ou souhaitez auditer les coûts de votre parc actuel ? Nos conseillers sont à votre disposition.
            </p>
          </div>

          {/* Formulaire moderne centré */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                {formSent ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl">
                      <FAIcon name="fa-solid fa-circle-check" size={32} color="#047857" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A3A6A]">Demande bien transmise !</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Merci pour votre intérêt. Votre demande est dirigée vers notre adresse professionnelle :
                      <span className="block font-bold text-[#1A3A6A] mt-1">officetg@sankosarl.com</span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={homeMailtoUrl}
                        className="inline-flex items-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all"
                      >
                        <FAIcon name="fa-regular fa-envelope" size={16} color="#FFFFFF" />
                        <span>Ouvrir l'email</span>
                      </a>
                      <a
                        href={directFormWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all"
                      >
                        <FAIcon name="fa-brands fa-whatsapp" size={18} color="#FFFFFF" />
                        <span>Transmettre sur WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Ex: Jean Koffi"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-800 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Entreprise / Organisation
                        </label>
                        <input
                          type="text"
                          value={contactForm.organization}
                          onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                          placeholder="Ex: Société / ONG / Institution"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-800 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="j.koffi@organisation.org"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-800 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Téléphone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+228 90 00 00 00"
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-800 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Service souhaité
                      </label>
                      <select
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-800 outline-none"
                      >
                        <option>Location longue durée (LLD)</option>
                        <option>Location moyenne durée (LMD)</option>
                        <option>Location courte durée</option>
                        <option>Gestion de parc automobile</option>
                        <option>Autre besoin sur mesure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Précisions sur votre besoin ou mission
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Indiquez le type de véhicule souhaité, la période, la destination (Lomé ou régions), etc."
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-800 outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-3 bg-[#1A3A6A] hover:bg-[#234c89] text-white py-4 rounded-full font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer group"
                      >
                        <span>Envoyer ma demande</span>
                        <span className="w-7 h-7 rounded-full bg-white text-[#1A3A6A] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <FAIcon name="fa-solid fa-arrow-right" size={12} color="#1A3A6A" />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
            </div>
          </div>
          </div>
        </section>
      </div>
  );
};
