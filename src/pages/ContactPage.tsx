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
      {/* 5.1 — HERO CENTRÉ */}
      <section className="bg-hero-gradient pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full mb-3">
            Équipe commerciale & institutionnelle
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Parlons de votre besoin en mobilité
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Notre équipe vous répond rapidement, par le canal de votre choix.
          </p>
        </div>
      </section>

      {/* 5.4 — RAPPEL SIMULATEUR CENTRÉ */}
      <div className="bg-[#1A3A6A]/5 border-y border-[#1A3A6A]/15 py-3.5 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-xs sm:text-sm text-slate-700">
          <span>Vous préférez une estimation immédiate ?</span>
          <button
            type="button"
            onClick={() => onNavigate('services', 'simulateur')}
            className="font-bold text-[#1A3A6A] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>→ Simuler votre budget</span>
          </button>
        </div>
      </div>

      {/* 5.2 — FORMULAIRE & 5.3 — COORDONNÉES CENTRÉS AU MILIEU */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Formulaire centré */}
          <div className="w-full bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs mb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Formulaire de contact
              </h2>
              <p className="text-sm text-slate-500">
                Remplissez ce formulaire pour nous transmettre votre cahier des charges ou votre demande de cotation.
              </p>
            </div>

            {submitted ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center space-y-4 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <FAIcon name="fa-solid fa-check" size={24} color="#047857" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Demande transmise vers notre équipe
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Merci M./Mme {formData.nom || ''}. Votre demande est adressée à notre adresse pro :
                  <span className="block font-bold text-[#1A3A6A] mt-1">officetg@sankosarl.com</span>
                  Notre responsable de comptes institutionnels vous répondra sous 2 heures ouvrées.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <FAIcon name="fa-regular fa-envelope" size={15} color="#FFFFFF" />
                    <span>Ouvrir l'email de confirmation</span>
                  </a>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <FAIcon name="fa-brands fa-whatsapp" size={16} color="#FFFFFF" />
                    <span>Doubler sur WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="M. / Mme Votre Nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A] focus:bg-white"
                    />
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Organisation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom de l'agence, ONG ou entreprise"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@organisation.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A] focus:bg-white"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+228 90 00 00 00"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Type de besoin (menu déroulant) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Type de besoin *
                  </label>
                  <select
                    value={formData.typeBesoin}
                    onChange={(e) => setFormData({ ...formData, typeBesoin: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A] focus:bg-white cursor-pointer"
                  >
                    <option value="Location longue durée (LLD)">Location longue durée (LLD)</option>
                    <option value="Location moyenne durée (LMD)">Location moyenne durée (LMD)</option>
                    <option value="Location courte durée">Location courte durée</option>
                    <option value="Gestion de parc">Gestion de parc</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Précisez votre demande, nombre de véhicules souhaités, dates d'intervention, zones de déplacement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A] focus:bg-white resize-none"
                  />
                </div>

                {/* Verbatim CTA */}
                <div className="pt-3 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-9 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <FAIcon name="fa-regular fa-paper-plane" size={14} color="#FFFFFF" />
                    <span>Envoyer ma demande</span>
                  </button>

                  <p className="text-[11px] text-slate-500 mt-3 leading-relaxed max-w-lg mx-auto">
                    En envoyant ce formulaire, vous acceptez que vos coordonnées soient traitées conformément à notre{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('politique-confidentialite')}
                      className="text-[#1A3A6A] font-semibold underline hover:text-[#234c89] cursor-pointer"
                    >
                      Politique de Confidentialité
                    </button>{' '}
                    et à nos{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('conditions-generales')}
                      className="text-[#1A3A6A] font-semibold underline hover:text-[#234c89] cursor-pointer"
                    >
                      Conditions Générales
                    </button>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* 5.3 — BLOC COORDONNÉES CENTRÉ & VERTICAL */}
          <div className="w-full max-w-2xl bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200/80">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-block text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full mb-2">
                Disponibilité & Canaux
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Nos coordonnées directes
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Joignez nos conseillers par téléphone, WhatsApp, email ou rendez-nous visite.
              </p>
            </div>

            {/* Disposition purement verticale */}
            <div className="flex flex-col gap-3.5 max-w-xl mx-auto">
              {/* Adresse */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/70 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-2.5">
                  <FAIcon name="fa-solid fa-location-dot" size={17} color="#1A3A6A" />
                </div>
                <span className="font-semibold text-slate-900 text-sm sm:text-base">
                  Boulevard Jean-Paul II, Nukafu – Lomé
                </span>
                <a
                  href="https://maps.app.goo.gl/7HWkoUa2SndLXANr5?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3A6A] hover:underline mt-2"
                >
                  <span>Itinéraire Google Maps</span>
                  <FAIcon name="fa-solid fa-arrow-up-right-from-square" size={11} color="#1A3A6A" />
                </a>
              </div>

              {/* Téléphone */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/70 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-2.5">
                  <FAIcon name="fa-solid fa-phone" size={16} color="#1A3A6A" />
                </div>
                <a
                  href={`tel:${WHATSAPP_CONFIG.phone}`}
                  className="font-bold text-slate-900 text-base sm:text-lg hover:text-[#1A3A6A] transition-colors"
                >
                  {WHATSAPP_CONFIG.displayPhone}
                </a>
                <span className="text-xs text-slate-400 mt-1">Appels professionnels</span>
              </div>

              {/* WhatsApp */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/70 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
                  <FAIcon name="fa-brands fa-whatsapp" size={18} color="#059669" />
                </div>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 text-base sm:text-lg hover:text-[#1A3A6A] transition-colors"
                >
                  {WHATSAPP_CONFIG.displayPhone}
                </a>
              </div>

              {/* Email */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/70 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-2.5">
                  <FAIcon name="fa-regular fa-envelope" size={16} color="#1A3A6A" />
                </div>
                <a
                  href="mailto:officetg@sankosarl.com"
                  className="font-semibold text-slate-900 text-sm sm:text-base hover:text-[#1A3A6A] transition-colors"
                >
                  officetg@sankosarl.com
                </a>
                <span className="text-xs text-slate-400 mt-1">Devis & partenariats</span>
              </div>

              {/* Horaires d'ouverture */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/70 shadow-2xs text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center mb-2.5">
                  <FAIcon name="fa-regular fa-clock" size={16} color="#1A3A6A" />
                </div>
                <span className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                  Lundi au Vendredi : 08h00 - 17h00
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Assistance opérationnelle 24/7 pour les véhicules sous contrat
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 — CARTE GOOGLE MAPS INTÉGRÉE CENTRÉE (SANKO TOGO - Lomé) */}
      <section className="py-12 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mb-6 max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full inline-block mb-2">
              Localisation
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              SANKO TOGO à Lomé
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Retrouvez notre siège et notre parc automobile directement sur la carte.
            </p>
            <div className="flex justify-center">
              <a
                href="https://maps.app.goo.gl/7HWkoUa2SndLXANr5?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1A3A6A] border border-[#1A3A6A]/30 hover:border-[#1A3A6A] px-5 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer hover:scale-[1.02]"
              >
                <FAIcon name="fa-solid fa-diamond-turn-right" size={14} color="#1A3A6A" />
                <span>Ouvrir dans Google Maps</span>
                <FAIcon name="fa-solid fa-arrow-up-right-from-square" size={11} color="#1A3A6A" />
              </a>
            </div>
          </div>

          <div className="w-full h-80 sm:h-96 md:h-[440px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs relative bg-slate-100">
            <iframe
              title="Localisation SANKO TOGO à Lomé sur Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d1.23414!3d6.16498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e30290d9217f%3A0x64a175d7353485be!2sSANKO+TOGO!5e0!3m2!1sfr!2stg!4v1710000000000!5m2!1sfr!2stg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
