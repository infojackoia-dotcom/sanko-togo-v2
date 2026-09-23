import React, { useState } from 'react';
import { PageId } from '../types';
import { FAIcon } from '../components/FAIcon';
import { WHATSAPP_CONFIG } from '../data/content';

interface TermsOfServicePageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'objet', title: '1. Objet & Champ d’application' },
    { id: 'conditions-conducteur', title: '2. Conditions relatives aux conducteurs' },
    { id: 'devis-tarifs', title: '3. Réservation, Devis & Tarification' },
    { id: 'usage-zones', title: '4. Utilisation du véhicule & Zones autorisées' },
    { id: 'chauffeurs', title: '5. Service Chauffeurs Dédiés' },
    { id: 'entretien-relais', title: '6. Maintenance & Véhicule Relais' },
    { id: 'assurances', title: '7. Assurances, Sinistres & Franchises' },
    { id: 'restitution', title: '8. Restitution & État des lieux' },
    { id: 'responsabilite', title: '9. Responsabilités & Force Majeure' },
    { id: 'droit-litiges', title: '10. Droit applicable & Règlement des litiges' },
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
              <span className="text-white">Conditions Générales</span>
            </nav>

            <span className="text-xs uppercase tracking-widest font-bold text-white/80 bg-white/10 px-3.5 py-1 rounded-full">
              Cadre Contractuel & Légal
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              Conditions Générales d’Utilisation & de Location
            </h1>

            <p className="text-slate-200 text-sm sm:text-base mt-4 leading-relaxed">
              Dernière mise à jour : 10 septembre 2026. Les présentes conditions régissent l'accès au site web ainsi que les prestations de location de véhicules et de gestion de flotte automobile fournies par SANKO TOGO en République Togolaise.
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
                <FAIcon name="fa-solid fa-scale-balanced" size={16} color="#1A3A6A" />
                <span>Sommaire des clauses</span>
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
                  <p className="font-semibold text-slate-900">Une question contractuelle ?</p>
                  <p>Pour vos appels d'offres ou accords-cadres institutionnels, consultez notre service commercial.</p>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 font-bold text-[#1A3A6A] hover:underline cursor-pointer"
                  >
                    <FAIcon name="fa-solid fa-file-signature" size={12} color="#1A3A6A" />
                    <span>Demander un accord-cadre</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Legal Clauses Articles */}
          <main className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-12">
            {/* Context Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900">
                Transparence & Rigueur Institutionnelle
              </p>
              <p>
                SANKO TOGO met un point d'honneur à offrir des prestations de mobilité irréprochables, conformes aux exigences administratives et de conformité des agences des Nations Unies, des ambassades, des ONG internationales et des entreprises leaders au Togo.
              </p>
              <p>
                Toute réservation ou contractualisation auprès de SANKO TOGO emporte acceptation sans réserve des présentes conditions.
              </p>
            </div>

            {/* 1. Objet */}
            <section id="objet" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  1
                </span>
                <span>Objet & Champ d’application</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Les présentes Conditions Générales régissent :
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>L’utilisation du site internet édité par <strong>SANKO TOGO</strong>, incluant le catalogue en ligne, les formulaires de contact et le simulateur de devis budgétaire.</li>
                  <li>Les prestations de location de véhicules automobiles (LCD, LMD, LLD) avec chauffeur professionnel dédié obligatoire et systématiquement inclus.</li>
                  <li>Les services de gestion globale de parc et de flotte automobile d'organisations partenaires au Togo.</li>
                </ul>
                <p>
                  En cas de signature d'un contrat-cadre particulier ou d'un bon de commande formel entre SANKO TOGO et le client, les conditions particulières dudit contrat prévalent sur les présentes clauses générales.
                </p>
              </div>
            </section>

            {/* 2. Conditions Conducteurs */}
            <section id="conditions-conducteur" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  2
                </span>
                <span>Chauffeur professionnel obligatoire pour toute location</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Pour l'ensemble des offres de location proposées par SANKO TOGO (courte, moyenne et longue durée), la mise à disposition d'un chauffeur professionnel est <strong>obligatoire et systématiquement incluse</strong> :
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Exclusivité de conduite :</strong> Aucun véhicule de la flotte de location n'est mis en circulation sans chauffeur professionnel habilité et affecté par SANKO TOGO.</li>
                  <li><strong>Sécurité et conformité :</strong> Cette disposition garantit la sécurité des passagers, le respect strict du code de la route togolais, la préservation de la flotte et la continuité opérationnelle des missions.</li>
                  <li><strong>Missions institutionnelles :</strong> Nos chauffeurs disposent des habilitations requises et maîtrisent les protocoles diplomatiques, humanitaires et d'entreprises.</li>
                </ul>
              </div>
            </section>

            {/* 3. Réservation & Tarifs */}
            <section id="devis-tarifs" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  3
                </span>
                <span>Réservation, Devis & Tarification</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Les estimations fournies sur le site ou via le simulateur budgétaire sont données à titre indicatif en Francs CFA (XOF / FCFA).
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Validité des devis :</strong> Tout devis formel émis par notre direction commerciale est valable pour une durée de 30 jours calendaires à compter de sa date d'émission.</li>
                  <li><strong>Devise & Taxes :</strong> Les tarifs s'entendent en Francs CFA (XOF). Les taxes applicables (notamment la TVA togolaise) sont précisées sur les devis et factures. Les organismes bénéficiant d'une exonération diplomatique ou conventionnelle doivent fournir l'attestation légale officielle lors de la commande.</li>
                  <li><strong>Modalités de paiement :</strong> Par virement bancaire, chèque certifié ou modalités convenues au contrat-cadre institutionnel (à 30 jours fin de mois pour les partenaires agréés après validation du dossier).</li>
                </ul>
              </div>
            </section>

            {/* 4. Utilisation & Zones */}
            <section id="usage-zones" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  4
                </span>
                <span>Utilisation du véhicule & Zones géographiques autorisées</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Le client s'engage à utiliser le véhicule loué avec toute la diligence requise, dans le respect scrupuleux du Code de la route en vigueur en République Togolaise.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
                  <p className="font-bold text-slate-900">Zones géographiques contractuelles :</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li><strong>Zone Urbaine (Grand Lomé) :</strong> Utilisation limitée au périmètre de la préfecture du Golfe et de la région Maritime proche.</li>
                    <li><strong>Zone Intérieur du Togo :</strong> Déplacements sur l'ensemble des régions (Plateaux, Centrale, Kara, Savanes) expressément validés au contrat.</li>
                    <li><strong>Passage transfrontalier (Corridors CEDEAO) :</strong> Tout déplacement hors des frontières togolaises (Ghana, Bénin, Burkina Faso) requiert une autorisation écrite préalable de Sanko Togo et l’émission des documents douaniers et assurances CEDEAO correspondantes (Carte Brune).</li>
                  </ul>
                </div>
                <p className="text-xs text-slate-500">
                  Sont formellement interdits : le transport rémunéré de personnes non autorisées, le transport de marchandises illicites ou dangereuses, la surcharge, et l'apprentissage de la conduite.
                </p>
              </div>
            </section>

            {/* 5. Chauffeurs */}
            <section id="chauffeurs" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  5
                </span>
                <span>Service Chauffeurs Dédiés & Professionnels</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Pour l'ensemble de nos offres de location, le chauffeur professionnel mis à disposition par SANKO TOGO est obligatoire et systématiquement inclus :
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Les chauffeurs sont salariés, déclarés à la Caisse Nationale de Sécurité Sociale (CNSS) et habilités aux missions institutionnelles.</li>
                  <li>Ils sont formés à la conduite défensive, à la discrétion diplomatique et à la maîtrise des itinéraires urbains et interurbains du Togo.</li>
                  <li>Le respect du repos obligatoire et de la législation togolaise du travail est impératif. Les amplitudes journalières et frais de mission éventuels en province sont définis au devis.</li>
                </ul>
              </div>
            </section>

            {/* 6. Entretien & Relais */}
            <section id="entretien-relais" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  6
                </span>
                <span>Maintenance, Assistance 24/7 & Véhicule Relais</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <div className="bg-[#1A3A6A]/5 p-5 rounded-2xl border border-[#1A3A6A]/15 space-y-3">
                  <h4 className="font-bold text-[#1A3A6A] text-base flex items-center gap-2">
                    <FAIcon name="fa-solid fa-clock" size={16} color="#1A3A6A" />
                    <span>L'engagement Sanko Togo de continuité de service :</span>
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li><strong>Entretien intégralement pris en charge :</strong> Vidanges, pneumatiques, révisions constructeur et pièces d'usure sont gérés directement par nos équipes techniques.</li>
                    <li><strong>Véhicule relais garanti :</strong> En cas d'immobilisation pour panne ou entretien programmé, un véhicule de catégorie équivalente ou supérieure est mis à disposition sous <strong>2 heures à Lomé</strong>, et dans les meilleurs délais sur tout le reste du territoire togolais.</li>
                    <li><strong>Assistance 24/7 :</strong> Une permanence technique et opérationnelle est active 24h/24 et 7j/7 au numéro d'astreinte dédié.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. Assurances */}
            <section id="assurances" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  7
                </span>
                <span>Assurances, Sinistres & Franchises</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Tous les véhicules de SANKO TOGO bénéficient d'une couverture d'assurance tous risques souscrite auprès de compagnies d'assurance de premier plan agréées au Togo :
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Responsabilité civile illimitée envers les tiers.</li>
                  <li>Garanties dommages tous accidents, vol, incendie et bris de glace.</li>
                  <li>Assurance personnes transportées.</li>
                </ul>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-amber-900 space-y-2">
                  <p className="font-bold">Déclaration obligatoire des sinistres :</p>
                  <p>
                    En cas d'accident ou de dommage, le client a l'obligation formelle d'en aviser immédiatement SANKO TOGO et de transmettre le constat amiable ou le procès-verbal de police/gendarmerie dans un délai maximal de <strong>24 heures ouvrées</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Restitution */}
            <section id="restitution" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  8
                </span>
                <span>Restitution du véhicule & Constat contradictoire</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  À la fin de la période de location convenue, le véhicule doit être restitué au lieu, date et heure convenus au contrat.
                </p>
                <p>
                  Un état des lieux contradictoire de retour est dressé conjointement par le représentant de Sanko Togo et le client. Le véhicule doit être rendu avec ses équipements de bord d'origine (roue de secours, cric, triangle de signalisation, extincteur à jour, documents de bord).
                </p>
              </div>
            </section>

            {/* 9. Responsabilités */}
            <section id="responsabilite" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  9
                </span>
                <span>Responsabilités & Cas de Force Majeure</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Le client demeure pécuniairement et pénalement responsable des infractions au code de la route commises pendant la durée où le véhicule a été placé sous sa garde (sauf prestation assurée par un chauffeur de Sanko Togo).
                </p>
                <p>
                  Aucune des parties ne pourra être tenue pour responsable de l'inexécution de ses obligations en cas de survenance d'un événement de force majeure reconnu par la jurisprudence togolaise (catastrophes naturelles majeures, insurrections, fermetures impromptues de frontières sur décret gouvernemental).
                </p>
              </div>
            </section>

            {/* 10. Droit applicable */}
            <section id="droit-litiges" className="space-y-4 scroll-mt-32 pt-4 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center text-sm font-black">
                  10
                </span>
                <span>Droit applicable & Règlement des litiges</span>
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Les présentes Conditions Générales et les contrats de location qui en découlent sont régis par le <strong>droit de la République Togolaise</strong>.
                </p>
                <p>
                  En cas de différend relatif à l'interprétation ou à l'exécution des présentes, les parties privilégieront toujours une tentative de conciliation amiable.
                </p>
                <p>
                  À défaut d'accord amiable sous 30 jours, le litige sera soumis à la compétence exclusive des <strong>Tribunaux compétents de Lomé (Togo)</strong>.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Besoin d'une clarification sur ces termes ?
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('politique-confidentialite')}
                    className="text-xs font-bold text-[#1A3A6A] hover:underline cursor-pointer"
                  >
                    Voir la Politique de Confidentialité
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-bold text-[#1A3A6A] hover:underline cursor-pointer"
                  >
                    Contacter notre service juridique
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
