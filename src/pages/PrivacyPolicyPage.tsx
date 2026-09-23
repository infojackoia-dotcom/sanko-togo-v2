import React, { useState } from 'react';
import { PageId } from '../types';
import { FAIcon } from '../components/FAIcon';
import { WHATSAPP_CONFIG } from '../data/content';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'responsable', title: '1. Responsable du traitement' },
    { id: 'donnees', title: '2. Données collectées' },
    { id: 'finalites', title: '3. Finalités & Bases légales' },
    { id: 'geolocalisation', title: '4. Télématique & Géolocalisation' },
    { id: 'destinataires', title: '5. Destinataires & Confidentialité' },
    { id: 'conservation', title: '6. Durée de conservation' },
    { id: 'securite', title: '7. Sécurité des données' },
    { id: 'droits', title: '8. Vos droits et recours' },
    { id: 'cookies', title: '9. Gestion des cookies' },
    { id: 'contact', title: '10. Contact Délégué à la Protection' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#1A3A6A] text-white pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#122849]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-white/70 mb-4">
              <button
                type="button"
                onClick={() => onNavigate('accueil')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Accueil
              </button>
              <span>/</span>
              <span className="text-white">Politique de Confidentialité</span>
            </nav>

            <span className="text-xs uppercase tracking-widest font-bold text-white/80 bg-white/10 px-3.5 py-1 rounded-full">
              Protection des Données Personnelles
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              Politique de Confidentialité
            </h1>

            <p className="text-slate-200 text-sm sm:text-base mt-4 leading-relaxed">
              Dernière mise à jour : 10 septembre 2026. SANKO TOGO s’engage rigoureusement à protéger la vie privée des utilisateurs de sa plateforme, de ses clients institutionnels, de ses partenaires et des conducteurs de ses véhicules au Togo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Quick Sticky Index */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#1A3A6A] font-bold text-sm">
                <FAIcon name="fa-solid fa-list-check" size={16} color="#1A3A6A" />
                <span>Sommaire des sections</span>
              </div>

              <div className="h-[1px] bg-slate-100" />

              <nav className="space-y-1.5 text-xs sm:text-sm">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all font-medium cursor-pointer flex items-center justify-between ${
                      activeSection === sec.id
                        ? 'bg-[#1A3A6A] text-white font-bold shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#1A3A6A]'
                    }`}
                  >
                    <span>{sec.title}</span>
                    {activeSection === sec.id && (
                      <FAIcon name="fa-solid fa-chevron-right" size={10} color="#FFFFFF" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs text-slate-600 space-y-2">
                  <p className="font-semibold text-slate-900">Besoin d'un renseignement juridique ?</p>
                  <p>Notre équipe administrative et notre délégué à la protection des données sont à votre disposition.</p>
                  <a
                    href="mailto:officetg@sankosarl.com"
                    className="inline-flex items-center gap-2 font-bold text-[#1A3A6A] hover:underline"
                  >
                    <FAIcon name="fa-regular fa-envelope" size={12} color="#1A3A6A" />
                    <span>officetg@sankosarl.com</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Legal Clauses Articles */}
          <main className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-12">
            {/* Introduction Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900">
                Cadre légal et conformité réglementaire
              </p>
              <p>
                La présente Politique de Confidentialité s’applique à l’ensemble des services proposés par la société <strong>SANKO TOGO</strong>, incluant son site web, ses outils de simulation de budget, ses devis en ligne ainsi que la contractualisation de location de véhicules et de gestion de flotte au Togo.
              </p>
              <p>
                Ce document est rédigé en stricte conformité avec la <strong>Loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République Togolaise</strong>, ainsi qu’aux normes internationales et exigences d’audit imposées par les agences des Nations Unies, les institutions diplomatiques et les ONG partenaires.
              </p>
            </div>

            {/* 1. Responsable */}
            <section id="responsable" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  1
                </span>
                <span>Responsable du traitement des données</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Le responsable du traitement des données collectées dans le cadre de l’utilisation du site et des services de mobilité est :
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 space-y-1">
                  <p className="font-bold text-slate-900">SANKO TOGO</p>
                  <p>Immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM) du Togo</p>
                  <p>Siège social : Lomé, République Togolaise</p>
                  <p>Contact électronique : <a href="mailto:officetg@sankosarl.com" className="text-[#1A3A6A] font-semibold underline">officetg@sankosarl.com</a></p>
                  <p>Standard téléphonique : {WHATSAPP_CONFIG.displayPhone}</p>
                </div>
              </div>
            </section>

            {/* 2. Données collectées */}
            <section id="donnees" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  2
                </span>
                <span>Données collectées</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Dans le cadre de nos activités de location de véhicules et de conseil en mobilité, nous ne collectons que les données strictement adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités poursuivies :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Données d'identification et de contact :</strong> Nom, prénom, fonction, dénomination de l'organisation ou de l'institution, adresse email professionnelle, numéro de téléphone, adresse postale.
                  </li>
                  <li>
                    <strong>Données de simulation et de réservation :</strong> Type de véhicule souhaité (berline, SUV, 4x4 tout-terrain, utilitaire), durée estimée, zone de circulation (Lomé urbain ou intérieur du Togo), chauffeur professionnel inclus, dates de mise à disposition.
                  </li>
                  <li>
                    <strong>Données administratives pour l'établissement des contrats de location :</strong> Copie du permis de conduire des conducteurs agréés, pièce nationale d'identité ou passeport, justificatif de domicile ou d'accréditation institutionnelle, attestation d'assurance le cas échéant.
                  </li>
                  <li>
                    <strong>Données financières et de facturation :</strong> Coordonnées bancaires, historique des factures et bons de commande, justificatifs de paiement (hors coordonnées de cartes bancaires qui sont traitées directement par les banques partenaires agréées).
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Finalités */}
            <section id="finalites" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  3
                </span>
                <span>Finalités et bases légales du traitement</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>Les traitements reposent sur les bases juridiques suivantes :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm text-[#1A3A6A]">Exécution contractuelle</h4>
                    <p className="text-xs text-slate-600 leading-normal">
                      Traitement des devis, confirmation de réservations, mise à disposition des véhicules et exécution des contrats de LLD ou LCD.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm text-[#1A3A6A]">Obligations légales</h4>
                    <p className="text-xs text-slate-600 leading-normal">
                      Conformité avec les réglementations togolaises du travail, de transport routier, fiscales et déclarations administratives obligatoires.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm text-[#1A3A6A]">Intérêt légitime</h4>
                    <p className="text-xs text-slate-600 leading-normal">
                      Sécurité des biens et des personnes, prévention des fraudes, maintenance proactive de la flotte et suivi de la qualité de service.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm text-[#1A3A6A]">Consentement</h4>
                    <p className="text-xs text-slate-600 leading-normal">
                      Souscription facultative à la newsletter périodique et dépôt de traceurs analytiques non essentiels.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Géolocalisation */}
            <section id="geolocalisation" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  4
                </span>
                <span>Télématique embarquée et géolocalisation</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Les véhicules de la flotte SANKO TOGO peuvent être équipés de dispositifs télématiques (balises GPS et capteurs d’entretien).
                </p>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-amber-900 space-y-2">
                  <p className="font-bold flex items-center gap-2">
                    <FAIcon name="fa-solid fa-shield-halved" size={14} color="#b45309" />
                    <span>Principes stricts d’utilisation de la géolocalisation :</span>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Finalité exclusive de sécurité et d'assistance :</strong> Localisation d'urgence en cas de panne, d'accident ou de demande d'assistance 24/7 sur les axes routiers togolais.
                    </li>
                    <li>
                      <strong>Protection contre le vol et le détournement :</strong> Sécurisation des actifs automobiles mis à disposition des clients.
                    </li>
                    <li>
                      <strong>Maintenance préventive :</strong> Suivi des alertes kilométriques pour la programmation des révisions constructeur.
                    </li>
                    <li>
                      <strong>Pas de surveillance disproportionnée :</strong> Ces données ne sont accessibles qu’aux gestionnaires techniques habilités de Sanko Togo et ne font l’objet d’aucune diffusion publique ou commerciale.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Destinataires */}
            <section id="destinataires" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  5
                </span>
                <span>Destinataires des données & Confidentialité</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  SANKO TOGO applique une règle absolue : <strong>aucune vente, aucune cession et aucun échange de vos données personnelles à des fins de prospection publicitaire tierce</strong>.
                </p>
                <p>Vos données sont exclusivement transmises :</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Aux équipes internes habilitées de SANKO TOGO (direction commerciale, gestionnaires de flotte, service administratif et comptable).</li>
                  <li>Aux compagnies d'assurance agréées au Togo en cas de déclaration de sinistre ou d'accident de la circulation.</li>
                  <li>Aux prestataires techniques tiers soumis à une obligation stricte de confidentialité (hébergement sécurisé, éditeurs de télématique certifiés).</li>
                  <li>Aux autorités administratives ou judiciaires togolaises uniquement sur réquisition légale formelle.</li>
                </ul>
              </div>
            </section>

            {/* 6. Durée de conservation */}
            <section id="conservation" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  6
                </span>
                <span>Durée de conservation</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>Les données sont conservées pour les durées suivantes :</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Catégorie de données</th>
                        <th className="p-3">Durée de conservation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-600">
                      <tr>
                        <td className="p-3 font-semibold">Données de devis non concrétisés</td>
                        <td className="p-3">12 mois à compter du dernier contact</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Dossiers de location et contrats</td>
                        <td className="p-3">5 ans après la clôture du contrat (prescription commerciale)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Factures et pièces comptables</td>
                        <td className="p-3">10 ans conformément aux obligations comptables et fiscales togolaises</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Historiques de télématique / GPS</td>
                        <td className="p-3">30 à 60 jours glissants (sauf contentieux ou sinistre en cours)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 7. Sécurité */}
            <section id="securite" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  7
                </span>
                <span>Sécurité et intégrité des données</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  SANKO TOGO met en œuvre toutes les mesures techniques et organisationnelles requises pour préserver la sécurité de vos données :
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Chiffrement systématique des flux web via le protocole sécurisé <strong>HTTPS / SSL</strong>.</li>
                  <li>Habilitations d'accès strictes et authentification contrôlée pour le personnel accédant aux bases de données clients.</li>
                  <li>Sauvegardes chiffrées régulières sur infrastructures certifiées conformes aux standards internationaux.</li>
                  <li>Clauses de confidentialité imposées à l’ensemble de nos collaborateurs et chauffeurs habilités.</li>
                </ul>
              </div>
            </section>

            {/* 8. Vos droits */}
            <section id="droits" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  8
                </span>
                <span>Vos droits et recours</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Conformément à la Loi togolaise n° 2019-014 et aux réglementations applicables, vous bénéficiez des droits suivants :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">Droit d'accès</p>
                    <p className="text-xs text-slate-600 mt-1">Obtenir confirmation et copie des données personnelles vous concernant.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">Droit de rectification</p>
                    <p className="text-xs text-slate-600 mt-1">Demander la mise à jour immédiate de données inexactes ou incomplètes.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">Droit à l'effacement</p>
                    <p className="text-xs text-slate-600 mt-1">Demander la suppression de données lorsque leur conservation n'est plus requise par la loi.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">Droit d'opposition</p>
                    <p className="text-xs text-slate-600 mt-1">Vous opposer à tout moment au traitement de vos données pour motifs légitimes.</p>
                  </div>
                </div>
                <p className="pt-2 text-xs text-slate-500">
                  Pour faire valoir ces droits, il suffit d'adresser une demande accompagnée d'un justificatif d'identité par email à <a href="mailto:officetg@sankosarl.com" className="text-[#1A3A6A] font-semibold underline">officetg@sankosarl.com</a>. Vous disposez également du droit d'introduire une réclamation auprès de l'Instance de Protection des Données à Caractère Personnel (IPDCP) de la République Togolaise.
                </p>
              </div>
            </section>

            {/* 9. Cookies */}
            <section id="cookies" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  9
                </span>
                <span>Gestion des cookies et traceurs</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Notre site internet utilise des cookies techniques strictement indispensables à son bon fonctionnement (maintien de session, sélection des filtres du simulateur, affichage responsive).
                </p>
                <p>
                  Aucun cookie de ciblage publicitaire intrusif ou de revente de profil n'est installé à votre insu. Vous pouvez à tout moment configurer votre navigateur pour refuser ou effacer les cookies enregistrés.
                </p>
              </div>
            </section>

            {/* 10. Contact */}
            <section id="contact" className="space-y-4 scroll-mt-32 pt-4 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  10
                </span>
                <span>Contact Délégué à la Protection des Données</span>
              </h2>
              <div className="bg-[#1A3A6A] text-white p-6 sm:p-8 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Une question sur vos données ?</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Notre équipe juridique et le référent protection des données de SANKO TOGO sont joignables directement pour toute demande ou précision relative à la présente politique :
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                  <a
                    href="mailto:officetg@sankosarl.com"
                    className="inline-flex items-center gap-2 bg-white text-[#1A3A6A] px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
                  >
                    <FAIcon name="fa-regular fa-envelope" size={14} color="#1A3A6A" />
                    <span>officetg@sankosarl.com</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 border border-white text-white px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <FAIcon name="fa-solid fa-paper-plane" size={14} color="#FFFFFF" />
                    <span>Formulaire de contact</span>
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
