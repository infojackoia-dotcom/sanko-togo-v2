import React, { useState } from 'react';
import { FAIcon } from './FAIcon';
import { WHATSAPP_CONFIG } from '../data/content';

// === CONFIGURATION GOOGLE FORM ===
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfV2ppkR9xvqLTHoW3UkqfBEBJhWpL5VG-as05uywNT1kMg1g/formResponse";
const GOOGLE_FORM_FIELDS = {
  nom: "entry.1500059279",
  organisation: "entry.289706435",
  email: "entry.390267457",
  telephone: "entry.442327127"
};

export interface LeadFormData {
  nom: string;
  organisation: string;
  email: string;
  telephone: string;
}

/**
 * Envoie automatiquement les informations saisies vers le Google Form en arrière-plan.
 * Utilise une requête fetch en mode 'no-cors' pour alimenter la Google Sheet sans blocage CORS.
 * Fonction totalement résiliente : en cas d'échec réseau, l'erreur est enregistrée en console
 * et ne bloque jamais l'expérience du visiteur.
 */
export async function sendLeadData(formData: LeadFormData): Promise<void> {
  try {
    const params = new URLSearchParams();
    params.append(GOOGLE_FORM_FIELDS.nom, formData.nom.trim());
    params.append(GOOGLE_FORM_FIELDS.organisation, formData.organisation.trim());
    params.append(GOOGLE_FORM_FIELDS.email, formData.email.trim());
    if (formData.telephone.trim()) {
      params.append(GOOGLE_FORM_FIELDS.telephone, formData.telephone.trim());
    }

    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.info('[Brochure Sanko Togo] Données de contact transmises avec succès à Google Forms / Sheets.');
  } catch (error) {
    // Ne jamais afficher d'erreur bloquante au visiteur
    console.error('[Brochure Sanko Togo] Erreur non bloquante lors de l\'envoi des données à Google Forms :', error);
  }
}

/**
 * Déclenche immédiatement le téléchargement du PDF de la brochure dans le navigateur
 * via un lien <a download> temporaire (ou window.open en secours).
 */
export function triggerBrochureDownload(pdfUrl: string = '/assets/brochure-sanko-togo.pdf'): void {
  try {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Brochure-Institutionnelle-Sanko-Togo.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.info('[Brochure Sanko Togo] Téléchargement immédiat du PDF déclenché.');
  } catch (error) {
    console.error('[Brochure Sanko Togo] Erreur déclenchement lien download, bascule sur window.open :', error);
    window.open(pdfUrl, '_blank');
  }
}

interface BrochureLeadModuleProps {
  /**
   * 'full' : bloc complet avec couverture visuelle, copy détaillée et accroche (Page Accueil)
   * 'compact' : bandeau épuré (titre + bouton) pour les fins de pages (Nos services, À propos)
   */
  variant?: 'full' | 'compact';
  className?: string;
}

export const BrochureLeadModule: React.FC<BrochureLeadModuleProps> = ({
  variant = 'full',
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<LeadFormData>({
    nom: '',
    organisation: '',
    email: '',
    telephone: '',
  });

  const whatsappBrochureUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    "Bonjour, je viens de télécharger la brochure Sanko Togo et j'aimerais en savoir plus sur vos services."
  )}`;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Réinitialisation après fermeture pour les prochains téléchargements si besoin
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Déclenchement IMMÉDIAT du téléchargement du PDF (indépendant du réseau)
    triggerBrochureDownload('/assets/brochure-sanko-togo.pdf');

    // 2. Envoi asynchrone des données à Google Forms en arrière-plan
    sendLeadData(formData);

    // 3. Affichage immédiat du message de confirmation et du CTA WhatsApp secondaire
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <>
      {/* =========================================================================
          AFFICHAGE DU MODULE SUR LA PAGE (VARIANTES 'FULL' ET 'COMPACT')
         ========================================================================= */}
      {variant === 'full' ? (
        <section
          id="brochure-institutionnelle"
          className={`py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-100 ${className}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1A3A6A] rounded-3xl lg:rounded-[36px] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-xl">
              {/* Halos décoratifs subtils */}
              <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl" />
              <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-sky-400/10 pointer-events-none blur-3xl" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Colonne Gauche : Aperçu visuel de la couverture (cliquable) */}
                <div className="lg:col-span-5 flex justify-center">
                  <div
                    onClick={handleOpenModal}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleOpenModal();
                    }}
                    className="relative cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/40 rounded-2xl"
                    title="Cliquer pour télécharger la brochure institutionnelle"
                  >
                    {/* Badge cliquable flottant */}
                    <div className="absolute -top-3 -right-3 z-20 bg-white text-[#1A3A6A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-[#1A3A6A]/10 flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                      <FAIcon name="fa-solid fa-file-pdf" size={12} color="#1A3A6A" />
                      <span>PDF Officiel</span>
                    </div>

                    {/* Image de la couverture */}
                    <div className="w-56 sm:w-64 md:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-1 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                      <img
                        src="/assets/brochure-cover.jpg"
                        alt="Couverture de la brochure institutionnelle SANKO TOGO"
                        className="w-full h-full object-cover select-none"
                      />
                    </div>

                    <div className="text-center mt-3 text-xs text-white/70 group-hover:text-white transition-colors flex items-center justify-center gap-1.5">
                      <FAIcon name="fa-solid fa-magnifying-glass-plus" size={11} />
                      <span>Cliquer pour feuilleter &amp; télécharger</span>
                    </div>
                  </div>
                </div>

                {/* Colonne Droite : Textes officiels & CTA */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    <FAIcon name="fa-solid fa-book-open" size={12} color="#FFFFFF" />
                    <span>Ressource Exclusive Décideurs</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Téléchargez notre brochure institutionnelle
                  </h2>

                  <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl">
                    Découvrez en détail nos solutions de location longue durée, de gestion de parc automobile et notre approche du coût total de mobilité (TCM).
                  </p>

                  {/* Points clés mis en valeur */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-1 text-xs text-white/85">
                    <div className="flex items-center gap-2">
                      <FAIcon name="fa-solid fa-circle-check" size={13} color="#38BDF8" />
                      <span>Grille comparative LLD vs Achat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FAIcon name="fa-solid fa-circle-check" size={13} color="#38BDF8" />
                      <span>Protocoles de sécurité &amp; Chauffeurs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FAIcon name="fa-solid fa-circle-check" size={13} color="#38BDF8" />
                      <span>Conformité aux audits bailleurs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FAIcon name="fa-solid fa-circle-check" size={13} color="#38BDF8" />
                      <span>Véhicule relais garanti &lt; 2h</span>
                    </div>
                  </div>

                  {/* Bouton CTA d'ouverture de la modale */}
                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      type="button"
                      onClick={handleOpenModal}
                      className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-[#1A3A6A] px-7 py-4 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group"
                    >
                      <FAIcon name="fa-solid fa-download" size={16} color="#1A3A6A" />
                      <span>Télécharger la brochure (PDF)</span>
                    </button>
                    <span className="text-xs text-white/70 italic">
                      Accès immédiat et gratuit en 30 secondes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* VARIANTE 'COMPACT' (pour Nos services et À propos) */
        <section className={`py-12 bg-white border-t border-slate-100 ${className}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-2xl bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center shrink-0">
                  <FAIcon name="fa-solid fa-file-pdf" size={24} color="#1A3A6A" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    Téléchargez notre brochure institutionnelle
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Format PDF complet : offres, flotte, engagements de service et garanties.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02]"
              >
                <FAIcon name="fa-solid fa-download" size={14} color="#FFFFFF" />
                <span>Télécharger la brochure (PDF)</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          MODALE DU FORMULAIRE DE TÉLÉCHARGEMENT
         ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-brochure-title"
        >
          <div
            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8 transform transition-all duration-250 scale-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture (X) */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Fermer la modale"
            >
              <FAIcon name="fa-solid fa-xmark" size={14} />
            </button>

            {/* En-tête de la modale */}
            <div className="bg-[#1A3A6A] text-white px-6 py-6 sm:px-8 sm:py-7 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <FAIcon name="fa-solid fa-file-pdf" size={15} color="#FFFFFF" />
                </span>
                <span className="text-xs uppercase tracking-wider font-bold text-white/80 font-sub">
                  Document Institutionnel SANKO TOGO
                </span>
              </div>
              <h2
                id="modal-brochure-title"
                className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight"
              >
                {isSubmitted
                  ? 'Brochure disponible !'
                  : 'Téléchargez notre brochure institutionnelle'}
              </h2>
            </div>

            {/* Corps de la modale */}
            <div className="p-6 sm:p-8">
              {!isSubmitted ? (
                /* FORMULAIRE ACTIF */
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-main">
                    Veuillez renseigner vos coordonnées pour accéder immédiatement au document complet (PDF).
                  </p>

                  {/* Champ 1 : Nom complet (obligatoire) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sub">
                      Nom complet <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Ex: Jean-Paul Mensah"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-900 outline-none transition-all font-main"
                    />
                  </div>

                  {/* Champ 2 : Organisation (obligatoire) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sub">
                      Organisation <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      placeholder="Ex: Entreprise, ONG, Ambassade, Institution"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-900 outline-none transition-all font-main"
                    />
                  </div>

                  {/* Champ 3 : Email professionnel (obligatoire) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sub">
                      Email professionnel <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@organisation.org"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-900 outline-none transition-all font-main"
                    />
                  </div>

                  {/* Champ 4 : Téléphone (optionnel) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-sub">
                        Téléphone
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">Optionnel</span>
                    </div>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="+228 90 00 00 00"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#1A3A6A] focus:ring-1 focus:ring-[#1A3A6A] text-sm text-slate-900 outline-none transition-all font-main"
                    />
                  </div>

                  {/* Bouton de validation */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1A3A6A] hover:bg-[#234c89] text-white py-4 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer group disabled:opacity-75"
                    >
                      <FAIcon name="fa-solid fa-download" size={16} color="#FFFFFF" />
                      <span>{isSubmitting ? 'Préparation...' : 'Recevoir la brochure'}</span>
                    </button>
                  </div>

                  {/* Texte de consentement */}
                  <p className="text-[11px] text-slate-500 text-center leading-relaxed pt-1 font-main">
                    En téléchargeant cette brochure, vous acceptez d'être recontacté par notre équipe au sujet de vos besoins en mobilité.
                  </p>
                </form>
              ) : (
                /* ÉTAT DE CONFIRMATION AVEC OPTION SECONDAIRE WHATSAPP */
                <div className="text-center py-4 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl shadow-xs">
                    <FAIcon name="fa-solid fa-circle-check" size={32} color="#047857" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A3A6A]">
                      Téléchargement initié !
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Merci ! Votre brochure est en cours de téléchargement. Pour une réponse plus rapide, discutez directement avec notre équipe :
                    </p>
                  </div>

                  {/* Bouton WhatsApp secondaire identique au reste du site */}
                  <div className="pt-2">
                    <a
                      href={whatsappBrochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 w-full bg-[#1A3A6A] hover:bg-[#234c89] text-white px-6 py-4 rounded-full font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
                    >
                      <FAIcon name="fa-brands fa-whatsapp" size={18} color="#FFFFFF" />
                      <span>Discuter sur WhatsApp</span>
                    </a>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => triggerBrochureDownload('/assets/brochure-sanko-togo.pdf')}
                      className="text-[#1A3A6A] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FAIcon name="fa-solid fa-arrow-rotate-right" size={10} color="#1A3A6A" />
                      <span>Relancer le téléchargement</span>
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
                    >
                      Fermer la fenêtre
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
