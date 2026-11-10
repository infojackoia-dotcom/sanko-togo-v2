import React, { useState } from 'react';
import { PageId } from '../types';
import { WHATSAPP_CONFIG, SITE_CONFIG } from '../data/content';
import { FAIcon } from '../components/FAIcon';

interface ContactPageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    organisation: '',
    email: '',
    telephone: '',
    typeBesoin: 'Location longue durée (LLD)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const mailSubject = `Demande de contact web - ${formData.nom || 'Prospect'} (${formData.organisation || 'Organisation'})`;
  const mailBody = `Bonjour l'équipe SANKO TOGO,\n\nUne nouvelle demande de contact a été transmise depuis le site web :\n\n• Nom : ${formData.nom}\n• Organisation : ${formData.organisation}\n• Email : ${formData.email}\n• Téléphone : ${formData.telephone}\n• Type de besoin : ${formData.typeBesoin}\n\nMessage / Détails du besoin :\n${formData.message}\n\n---\nTransmis automatiquement depuis sankotogo.tg`;
  const mailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Déclenche l'envoi vers le client de messagerie professionnel
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Sécurité si bloqué dans l'iframe
    }
  };

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    `Bonjour Sanko Togo,\n\nJe prends contact depuis votre site web :\n• Nom : ${formData.nom || 'Non spécifié'}\n• Organisation : ${formData.organisation || 'Non spécifiée'}\n• Téléphone : ${formData.telephone || 'Non spécifié'}\n• Email : ${formData.email || 'Non spécifié'}\n• Type de besoin : ${formData.typeBesoin}\n• Message : ${formData.message || 'Demande de renseignement'}`
  )}`;

  return (
    <div className="w-full">
      {/* 5.1 — HERO CENTRÉ AVEC IMAGE EN FOND */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 text-white overflow-hidden border-b border-[#122849]">
        {/* Image de fond avec overlay bleu marine translucide */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/contact-hero.jpg"
            alt="Équipe commerciale et accueil SANKO TOGO"
            className="w-full h-full object-cover object-center hero-bg-img"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0F2444]/45 bg-gradient-to-t from-[#0F2444]/80 via-[#1A3A6A]/45 to-[#0F2444]/60 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-white bg-[#0F2444]/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 mb-4">
            Équipe commerciale & institutionnelle
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Parlons de votre besoin en mobilité
          </h1>
          <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            Notre équipe vous répond rapidement, par le canal de votre choix.
          </p>
        </div>
      </section>

      {/* 5.4 — RAPPEL SIMULATEUR CENTRÉ */}
      <div className="bg-[#1A3A6A] text-white py-3.5 px-4 shadow-xs">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-xs sm:text-sm text-white">
          <span>Vous préférez une estimation immédiate ?</span>
          <button
            type="button"
            onClick={() => onNavigate('services', 'simulateur')}
            className="font-bold text-white hover:text-amber-300 underline inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>→ Accéder au simulateur de budget</span>
          </button>
        </div>
      </div>

      {/* 5.2 — SECTION COORDONNÉES COMPACTES TOUT EN BLANC (SURVOL BLEU CHARTE #1A3A6A) */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* CARTE 1 : ÉCRIVEZ-NOUS */}
            <a
              href="mailto:officetg@sankosarl.com"
              className="bg-white hover:bg-[#1A3A6A] border border-slate-200/80 hover:border-[#1A3A6A] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[175px] cursor-pointer hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-white/15 text-[#1A3A6A] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <FAIcon name="fa-regular fa-envelope" size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-white mb-1 transition-colors text-center">
                Écrivez-nous
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-white/90 font-medium text-center break-all transition-colors">
                officetg@sankosarl.com
              </p>

              {/* Watermark discret */}
              <div className="absolute -bottom-4 -right-4 pointer-events-none text-slate-100 group-hover:text-white/10 transition-colors select-none">
                <FAIcon name="fa-regular fa-envelope" size={80} />
              </div>
            </a>

            {/* CARTE 2 : NOTRE ADRESSE */}
            <div className="bg-white hover:bg-[#1A3A6A] border border-slate-200/80 hover:border-[#1A3A6A] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[175px] cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-white/15 text-[#1A3A6A] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <FAIcon name="fa-solid fa-location-dot" size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-white mb-1 transition-colors text-center">
                Notre adresse
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-white/90 font-medium text-center leading-snug transition-colors">
                Boulevard Jean-Paul II,<br />Nukafu – Lomé
              </p>

              {/* Watermark discret */}
              <div className="absolute -bottom-4 -right-4 pointer-events-none text-slate-100 group-hover:text-white/10 transition-colors select-none">
                <FAIcon name="fa-solid fa-location-dot" size={80} />
              </div>
            </div>

            {/* CARTE 3 : HORAIRES D'OUVERTURE */}
            <div className="bg-white hover:bg-[#1A3A6A] border border-slate-200/80 hover:border-[#1A3A6A] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[175px] cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-white/15 text-[#1A3A6A] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <FAIcon name="fa-regular fa-clock" size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-white mb-1 transition-colors text-center">
                Horaires d’ouverture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-white/90 font-medium text-center leading-snug transition-colors">
                Lundi au vendredi :<br />08h00 - 17h00
              </p>
              <span className="text-[11px] text-emerald-700 group-hover:text-emerald-300 font-bold mt-1 text-center transition-colors">
                24/7 sous contrat
              </span>

              {/* Watermark discret */}
              <div className="absolute -bottom-4 -right-4 pointer-events-none text-slate-100 group-hover:text-white/10 transition-colors select-none">
                <FAIcon name="fa-regular fa-clock" size={80} />
              </div>
            </div>

            {/* CARTE 4 : APPELEZ-NOUS */}
            <a
              href={`tel:${WHATSAPP_CONFIG.phone}`}
              className="bg-white hover:bg-[#1A3A6A] border border-slate-200/80 hover:border-[#1A3A6A] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[175px] cursor-pointer hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-white/15 text-[#1A3A6A] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <FAIcon name="fa-solid fa-phone" size={17} />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-white mb-1 transition-colors text-center">
                Appelez-nous
              </h3>
              <p className="text-sm font-bold text-slate-900 group-hover:text-white text-center transition-colors">
                {WHATSAPP_CONFIG.displayPhone}
              </p>
              <span className="text-[11px] text-slate-500 group-hover:text-white/80 font-medium mt-0.5 text-center transition-colors">
                Appels & WhatsApp
              </span>

              {/* Watermark discret */}
              <div className="absolute -bottom-4 -right-4 pointer-events-none text-slate-100 group-hover:text-white/10 transition-colors select-none">
                <FAIcon name="fa-solid fa-phone" size={80} />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* 5.3 — SECTION PRINCIPALE : FORMULAIRE ET MAPS AVEC LES MÊMES DIMENSIONS (50 / 50) */}
      <section className="py-14 sm:py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* COLONNE GAUCHE (50%) : Formulaire "Écrivez-nous" */}
            <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
              <div>
                <div className="mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3A6A] mb-1.5 block">
                    SANKO TOGO
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                    Écrivez-nous
                  </h2>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                    Décrivez votre besoin de mobilité et notre équipe reviendra vers vous rapidement.
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 text-center space-y-4 my-auto">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <FAIcon name="fa-solid fa-check" size={24} color="#047857" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Demande transmise avec succès
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Merci M./Mme {formData.nom || ''}. Votre message est transmis à notre équipe pro :
                      <span className="block font-bold text-[#1A3A6A] mt-1">officetg@sankosarl.com</span>
                      Notre responsable institutionnel vous répond sous 2 heures ouvrées.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={mailtoUrl}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-colors"
                      >
                        <FAIcon name="fa-regular fa-envelope" size={14} color="#FFFFFF" />
                        <span>Ouvrir l'email client</span>
                      </a>

                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-colors"
                      >
                        <FAIcon name="fa-brands fa-whatsapp" size={15} color="#FFFFFF" />
                        <span>Doubler sur WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Votre nom * */}
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Votre nom *"
                          aria-label="Votre nom *"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          className="w-full bg-white px-5 py-3.5 rounded-full border border-slate-200/90 shadow-2xs text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3A6A] focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Votre adresse e-mail * */}
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Votre adresse e-mail *"
                          aria-label="Votre adresse e-mail *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white px-5 py-3.5 rounded-full border border-slate-200/90 shadow-2xs text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3A6A] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Votre numéro * */}
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Votre numéro *"
                          aria-label="Votre numéro *"
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                          className="w-full bg-white px-5 py-3.5 rounded-full border border-slate-200/90 shadow-2xs text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3A6A] focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Objet / Type de besoin * */}
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Objet *"
                          aria-label="Objet *"
                          value={formData.organisation}
                          onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                          className="w-full bg-white px-5 py-3.5 rounded-full border border-slate-200/90 shadow-2xs text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3A6A] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Votre message * */}
                    <div>
                      <textarea
                        rows={6}
                        required
                        placeholder="Votre message *"
                        aria-label="Votre message *"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3A6A] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Bouton Envoyer le message */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <span>Envoyer le message</span>
                        <FAIcon name="fa-solid fa-paper-plane" size={14} color="#FFFFFF" />
                      </button>

                      <p className="text-[11px] text-slate-400 text-center sm:text-right">
                        Réponse sous 2 heures ouvrées
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* COLONNE DROITE (50%) : "Lomé, Togo" avec Google Maps & Fiche intégrée */}
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3A6A] mb-1.5 block">
                  Nous trouver
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Lomé, Togo
                </h2>
              </div>

              {/* Cadre Google Maps avec hauteur égale et fiche d'information en overlay */}
              <div className="w-full flex-1 min-h-[460px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-md relative bg-slate-100">
                {/* Carte iframe */}
                <iframe
                  title="Carte de Lomé, Togo - SANKO TOGO"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d1.23414!3d6.16498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e30290d9217f%3A0x64a175d7353485be!2sSANKO+TOGO!5e0!3m2!1sfr!2stg!4v1710000000000!5m2!1sfr!2stg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>

                {/* Fiche d'information overlay Google Maps */}
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200/80 max-w-[270px]">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      SANKO Togo
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 leading-tight">
                    Boulevard Jean-Paul II, Nukafu, Lomé
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 mb-3">
                    <span className="font-bold">4,8</span>
                    <span className="text-amber-500">★</span>
                    <a
                      href="https://maps.app.goo.gl/7HWkoUa2SndLXANr5?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1A3A6A] hover:underline"
                    >
                      (24 avis)
                    </a>
                    <span className="text-slate-400 text-[11px]">ⓘ</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/7HWkoUa2SndLXANr5?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full bg-[#1A3A6A] hover:bg-[#234c89] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <FAIcon name="fa-solid fa-arrow-up-right-from-square" size={11} color="#FFFFFF" />
                    <span>Ouvrir dans Maps</span>
                  </a>
                </div>

                {/* Badge WhatsApp flottant en bas à droite sur la carte */}
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 z-10 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                  aria-label="Contacter SANKO Togo sur WhatsApp"
                >
                  <FAIcon name="fa-brands fa-whatsapp" size={24} color="#FFFFFF" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
