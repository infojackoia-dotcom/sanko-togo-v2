import React, { useState, useId, useEffect } from 'react';
import { VehicleTypeId, RentalType, UsageZone } from '../types';
import {
  VEHICLE_OPTIONS,
  resolveVehicle,
  calculateEstimate,
  WHATSAPP_CONFIG,
} from '../data/content';
import { FAIcon } from './FAIcon';

type MainModelCategory = 'berline' | 'suv' | 'bus';

interface SimulatorProps {
  id?: string;
  initialVehicle?: VehicleTypeId;
  initialRentalType?: RentalType;
  className?: string;
}

export const Simulator: React.FC<SimulatorProps> = ({
  id = 'simulateur',
  initialVehicle = 'suv-prado',
  initialRentalType = 'courte',
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const safeInitialVehicle: VehicleTypeId = (initialVehicle ?? 'suv-prado') as VehicleTypeId;

  // Catégorie principale (Berline, SUV & 4x4, Bus & Minibus)
  const getInitialCategory = (vId: VehicleTypeId): MainModelCategory => {
    if (vId.startsWith('berline') || vId === 'berline') return 'berline';
    if (vId.startsWith('bus') || vId === 'minibus') return 'bus';
    return 'suv';
  };

  const [mainCategory, setMainCategory] = useState<MainModelCategory>(
    getInitialCategory(safeInitialVehicle)
  );

  // Modèle précis sélectionné via liste déroulante
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>(() => {
    const v = resolveVehicle(safeInitialVehicle);
    return v.id;
  });

  const [rentalType, setRentalType] = useState<RentalType>(initialRentalType);
  const [duration, setDuration] = useState<number>(initialRentalType === 'courte' ? 5 : 6);
  const [zone, setZone] = useState<UsageZone>('ville');
  const [overnightStays, setOvernightStays] = useState<number>(0);

  // Optional prospect inputs
  const [prospectName, setProspectName] = useState<string>('');
  const [prospectOrg, setProspectOrg] = useState<string>('');

  const nameInputId = useId();
  const orgInputId = useId();
  const durationInputId = useId();
  const selectVehicleId = useId();

  // Catégories principales disponibles
  const MAIN_CATEGORIES = [
    {
      id: 'berline' as MainModelCategory,
      title: 'Berline',
      subtitle: 'Confort urbain & déplacements de direction',
      icon: 'fa-solid fa-car-side',
      models: [
        { id: 'berline-yaris' as VehicleTypeId, name: 'Toyota Yaris ou similaires' },
        { id: 'berline-corolla' as VehicleTypeId, name: 'Toyota Corolla ou similaires' },
        { id: 'berline-avensis' as VehicleTypeId, name: 'Toyota Avensis' },
      ],
    },
    {
      id: 'suv' as MainModelCategory,
      title: 'SUV & 4x4 / Pick-up',
      subtitle: 'Polyvalence, prestige & missions tout-terrain',
      icon: 'fa-solid fa-truck-pickup',
      models: [
        { id: 'suv-rav4' as VehicleTypeId, name: 'SUV / Toyota RAV 4 ou RUSH' },
        { id: 'suv-prado' as VehicleTypeId, name: 'Toyota Prado / Fortuner (Grand 4x4)' },
        { id: 'pickup-hilux' as VehicleTypeId, name: 'Toyota Hilux (Pick-up 4x4)' },
      ],
    },
    {
      id: 'bus' as MainModelCategory,
      title: 'Bus & Minibus',
      subtitle: 'Transport d\'équipes, séminaires & délégations',
      icon: 'fa-solid fa-van-shuttle',
      models: [
        { id: 'bus-15' as VehicleTypeId, name: 'Minibus (15 places)' },
        { id: 'bus-30' as VehicleTypeId, name: 'Grand Bus / Autocar (30 places)' },
      ],
    },
  ];

  const currentCategoryData =
    MAIN_CATEGORIES.find((c) => c.id === mainCategory) || MAIN_CATEGORIES[1];

  // Quand la catégorie change, on sélectionne par défaut le premier sous-modèle de cette catégorie
  const handleCategoryChange = (cat: MainModelCategory) => {
    setMainCategory(cat);
    const catData = MAIN_CATEGORIES.find((c) => c.id === cat);
    if (catData && catData.models.length > 0) {
      setVehicleType(catData.models[0].id);
    }
  };

  // Synchronisation si le vehicleType ne correspond pas à la catégorie courante
  useEffect(() => {
    const isModelInCurrentCategory = currentCategoryData.models.some((m) => m.id === vehicleType);
    if (!isModelInCurrentCategory && currentCategoryData.models.length > 0) {
      setVehicleType(currentCategoryData.models[0].id);
    }
  }, [mainCategory]);

  const selectedVehicle = resolveVehicle(vehicleType);

  // Configuration de la durée selon les 3 formules
  const durationUnit = rentalType === 'courte' ? 'jours' : 'mois';
  const durationMin = rentalType === 'courte' ? 1 : rentalType === 'moyenne' ? 3 : 25;
  const durationMax = rentalType === 'courte' ? 90 : rentalType === 'moyenne' ? 24 : 48;

  const handleRentalTypeChange = (type: RentalType) => {
    setRentalType(type);
    if (type === 'courte') {
      setDuration(5);
    } else if (type === 'moyenne') {
      setDuration(6);
    } else {
      setDuration(36);
    }
  };

  // Calcul du budget au backend (aucun prix unitaire n'est dévoilé à l'utilisateur)
  const estimate = calculateEstimate(
    vehicleType,
    rentalType,
    duration,
    zone,
    true,
    zone === 'interieur' ? overnightStays : 0
  );

  // Lien WhatsApp pré-rempli avec l'estimation globale
  const generateWhatsAppUrl = () => {
    const rentalTypeLabels: Record<RentalType, string> = {
      courte: 'Courte durée (moins de 3 mois)',
      moyenne: 'Moyenne durée (3 mois à 2 ans)',
      longue: 'Longue durée (plus de 2 ans)',
    };

    const zoneLabel =
      zone === 'ville' ? 'À Lomé (Grand Lomé)' : 'À l\'intérieur du pays (Hors Lomé)';

    let message = `Bonjour Sanko Togo,\n\nJe souhaite obtenir une offre pour la location d'un véhicule d'organisation :\n\n`;
    message += `• Catégorie : ${currentCategoryData.title}\n`;
    message += `• Modèle souhaité : ${selectedVehicle.name}\n`;
    message += `• Formule : ${rentalTypeLabels[rentalType]}\n`;
    message += `• Durée : ${duration} ${durationUnit}\n`;
    message += `• Lieu de la mission : ${zoneLabel}\n`;
    message += `• Chauffeur professionnel dédié : Inclus\n`;

    if (zone === 'interieur' && overnightStays > 0) {
      message += `• Jours de mission hors Lomé : ${overnightStays} jour(s)\n`;
    }

    message += `• Budget estimé en ligne : ${estimate.formattedTotal}\n`;
    if (estimate.formattedMonthlyEquivalent) {
      message += `• Équivalent mensuel : ${estimate.formattedMonthlyEquivalent}\n`;
    }

    if (prospectName.trim()) {
      message += `• Contact : ${prospectName.trim()}\n`;
    }
    if (prospectOrg.trim()) {
      message += `• Organisation : ${prospectOrg.trim()}\n`;
    }

    message += `\nMerci de bien vouloir me recontacter pour me confirmer la disponibilité et les modalités de contrat.`;

    return `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      id={id}
      className={`max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 md:p-10 scroll-mt-28 ${className}`}
    >
      {/* En-tête centré avec progression */}
      <div className="border-b border-slate-100 pb-6 mb-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full">
          <FAIcon name="fa-solid fa-calculator" size={11} color="#1A3A6A" />
          <span>Simulateur de Budget</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 text-center">
          Estimez votre budget de mobilité
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto text-center">
          Configurez vos critères de mission en quelques clics pour obtenir votre estimation globale.
        </p>

        {/* Indicateur d'étapes centré */}
        <div className="flex items-center justify-center gap-2.5 mt-5">
          {[1, 2, 3, 4].map((step) => {
            const isActive = currentStep === step;
            const isPast = currentStep > step;
            return (
              <div
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1A3A6A] text-white ring-4 ring-[#1A3A6A]/15 scale-105'
                    : isPast
                    ? 'bg-[#1A3A6A]/20 text-[#1A3A6A]'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isPast ? <FAIcon name="fa-solid fa-check" size={12} /> : step}
              </div>
            );
          })}
        </div>

        {/* Intitulé de l'étape courante centré */}
        <div className="mt-3 text-xs font-semibold text-slate-500 text-center">
          <span>
            {currentStep === 1 && 'Étape 1 sur 4 : Choix du modèle de véhicule'}
            {currentStep === 2 && 'Étape 2 sur 4 : Choix de la durée de location'}
            {currentStep === 3 && 'Étape 3 sur 4 : Lieu de la mission (Lomé ou Intérieur)'}
            {currentStep === 4 && 'Étape 4 sur 4 : Votre estimation budgétaire globale'}
          </span>
        </div>
      </div>

      {/* ========================================================
          ÉTAPE 1 : CHOIX DU MODÈLE DE VÉHICULE (CENTRÉ)
          ======================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <label className="block text-sm font-bold text-slate-800 mb-3 text-center">
              1. Sélectionnez la catégorie de véhicule :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
              {MAIN_CATEGORIES.map((cat) => {
                const isSelected = mainCategory === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                      isSelected
                        ? 'border-[#1A3A6A] bg-[#1A3A6A]/5 ring-2 ring-[#1A3A6A] shadow-xs'
                        : 'border-slate-200 bg-white hover:border-[#1A3A6A]/40 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center w-full">
                      <div className="relative mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#1A3A6A] text-white' : 'bg-slate-100 text-[#1A3A6A]'
                          }`}
                        >
                          <FAIcon name={cat.icon} size={22} />
                        </div>
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1A3A6A] text-white flex items-center justify-center text-[10px] shadow-xs">
                            <FAIcon name="fa-solid fa-check" size={10} color="#FFFFFF" />
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900 text-center">{cat.title}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed text-center">{cat.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Liste déroulante dynamique centrée */}
          <div className="max-w-xl mx-auto bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 text-center">
            <label
              htmlFor={selectVehicleId}
              className="block text-sm font-bold text-slate-800 mb-1.5 text-center"
            >
              2. Précisez le type de {currentCategoryData.title} :
            </label>
            <p className="text-xs text-slate-500 mb-4 text-center">
              Choisissez le modèle exact adapté aux besoins de votre mission.
            </p>

            <div className="relative max-w-md mx-auto">
              <select
                id={selectVehicleId}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleTypeId)}
                className="w-full appearance-none bg-white font-bold text-slate-900 text-sm sm:text-base px-4 py-3.5 pr-10 border border-slate-300 rounded-xl focus:outline-none focus:border-[#1A3A6A] focus:ring-2 focus:ring-[#1A3A6A]/20 cursor-pointer shadow-2xs text-center"
              >
                {currentCategoryData.models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <FAIcon name="fa-solid fa-chevron-down" size={14} />
              </div>
            </div>

            {/* Description du modèle sélectionné */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/70 text-xs text-slate-600 flex items-center justify-center gap-2">
              <FAIcon name="fa-solid fa-circle-info" size={14} className="text-[#1A3A6A] shrink-0" />
              <span>
                Modèle retenu : <strong className="text-slate-900">{selectedVehicle.name}</strong>
              </span>
            </div>
          </div>

          <div className="flex justify-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#234c89] transition-colors cursor-pointer shadow-sm"
            >
              <span>Continuer vers la durée</span>
              <FAIcon name="fa-solid fa-arrow-right" size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          ÉTAPE 2 : CHOIX DE LA DURÉE DE LA LOCATION (CENTRÉ & CADRE CLAIR)
          ======================================================== */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <label className="block text-sm font-bold text-slate-800 mb-3 text-center">
              Formule de location selon votre horizon :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {[
                {
                  id: 'courte' as RentalType,
                  title: 'Courte durée',
                  subtitle: 'De 1 à 90 jours (moins de 3 mois) • Ateliers, séminaires, missions ponctuelles',
                  icon: 'fa-regular fa-clock',
                },
                {
                  id: 'moyenne' as RentalType,
                  title: 'Moyenne durée',
                  subtitle: 'De 3 à 24 mois • Projets de développement et missions semestrielles',
                  icon: 'fa-regular fa-calendar-days',
                },
                {
                  id: 'longue' as RentalType,
                  title: 'Longue durée (LLD)',
                  subtitle: 'Plus de 2 ans • Véhicules permanents de direction et flotte d\'organisation',
                  icon: 'fa-regular fa-calendar-check',
                },
              ].map((opt) => {
                const isSelected = rentalType === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleRentalTypeChange(opt.id)}
                    className={`p-4 sm:p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                      isSelected
                        ? 'border-[#1A3A6A] bg-[#1A3A6A]/5 ring-2 ring-[#1A3A6A]'
                        : 'border-slate-200 hover:border-[#1A3A6A]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <FAIcon
                        name={opt.icon}
                        size={16}
                        className={isSelected ? 'text-[#1A3A6A]' : 'text-slate-400'}
                      />
                      <span className="font-extrabold text-sm text-slate-900">{opt.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed text-center">{opt.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cadre de durée parfaitement centré avec affichage net et boutons + / - */}
          <div className="max-w-xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center">
            <label className="block text-sm font-bold text-slate-800 text-center">
              Durée exacte souhaitée ({durationUnit}) :
            </label>
            <p className="text-xs text-slate-500 mt-1 mb-5 text-center">
              Ajustez le nombre avec les boutons + / - ou le curseur ci-dessous.
            </p>

            {/* Cadre de valeur identique à celui des nuitées avec boutons + et - */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDuration((prev) => Math.max(durationMin, prev - 1))}
                className="w-11 h-11 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-[#1A3A6A] hover:text-[#1A3A6A] hover:bg-slate-100 transition-all cursor-pointer shadow-2xs font-bold"
                aria-label="Diminuer la durée"
              >
                <FAIcon name="fa-solid fa-minus" size={13} />
              </button>

              {/* Le cadre avec le nombre et l'unité bien visibles */}
              <div className="min-w-[110px] py-2.5 px-4 rounded-xl border-2 border-[#1A3A6A]/30 bg-white text-center shadow-xs flex flex-col items-center justify-center">
                <span className="font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                  {duration}
                </span>
                <span className="text-xs font-bold text-[#1A3A6A] uppercase tracking-wider mt-0.5">
                  {duration > 1 ? durationUnit : (durationUnit === 'jours' ? 'jour' : 'mois')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setDuration((prev) => Math.min(durationMax, prev + 1))}
                className="w-11 h-11 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-[#1A3A6A] hover:text-[#1A3A6A] hover:bg-slate-100 transition-all cursor-pointer shadow-2xs font-bold"
                aria-label="Augmenter la durée"
              >
                <FAIcon name="fa-solid fa-plus" size={13} />
              </button>
            </div>

            {/* Curseur centré */}
            <div className="w-full max-w-md mt-6 pt-2">
              <input
                type="range"
                min={durationMin}
                max={durationMax}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                className="w-full accent-[#1A3A6A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-1">
                <span>{durationMin} {durationUnit}</span>
                <span>{Math.round((durationMin + durationMax) / 2)} {durationUnit}</span>
                <span>{durationMax} {durationUnit}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:text-slate-900 cursor-pointer"
            >
              <FAIcon name="fa-solid fa-arrow-left" size={14} />
              <span>Retour</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#234c89] transition-colors cursor-pointer shadow-sm"
            >
              <span>Continuer vers le lieu</span>
              <FAIcon name="fa-solid fa-arrow-right" size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          ÉTAPE 3 : LIEU DE LA MISSION (CENTRÉ)
          ======================================================== */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <label className="block text-sm font-bold text-slate-800 mb-3 text-center">
              Lieu d'exécution de la mission :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
              {[
                {
                  id: 'ville' as UsageZone,
                  title: 'À Lomé (Grand Lomé)',
                  desc: 'Trajets urbains, réunions d\'affaires, aéroport et périphérie de Lomé.',
                  icon: 'fa-regular fa-building',
                },
                {
                  id: 'interieur' as UsageZone,
                  title: 'À l\'intérieur du pays (Hors Lomé)',
                  desc: 'Déplacements en région (Maritime, Plateaux, Centrale, Kara, Savanes).',
                  icon: 'fa-solid fa-map-location-dot',
                },
              ].map((opt) => {
                const isSelected = zone === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setZone(opt.id)}
                    className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                      isSelected
                        ? 'border-[#1A3A6A] bg-[#1A3A6A]/5 ring-2 ring-[#1A3A6A]'
                        : 'border-slate-200 hover:border-[#1A3A6A]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2 justify-center">
                      <FAIcon
                        name={opt.icon}
                        size={17}
                        className={isSelected ? 'text-[#1A3A6A]' : 'text-slate-400'}
                      />
                      <span className="font-extrabold text-base text-slate-900">{opt.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed text-center">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chauffeur professionnel obligatoirement inclus */}
          <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl border border-[#1A3A6A]/30 bg-[#1A3A6A]/5 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-1.5">
              <FAIcon name="fa-solid fa-user-check" size={16} className="text-[#1A3A6A]" />
              <span className="font-bold text-sm text-slate-900">
                Chauffeur professionnel dédié
              </span>
              <span className="text-xs font-bold bg-[#1A3A6A] text-white px-2.5 py-0.5 rounded-full ml-1">
                Inclus d'office
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed text-center">
              Pour des raisons strictes de sécurité, de ponctualité et de garantie matérielle, le chauffeur professionnel dédié est inclus d'office sur l'ensemble de nos forfaits.
            </p>
          </div>

          {/* Jours de mission si hors Lomé */}
          {zone === 'interieur' && (
            <div className="max-w-2xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FAIcon name="fa-solid fa-map-location-dot" size={15} className="text-[#1A3A6A]" />
                <span className="text-sm font-bold text-slate-900">
                  En mission pour :
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4 max-w-md text-center">
                Indiquez le nombre de jours de la mission hors de Lomé (laisser 0 si aller-retour dans la journée).
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setOvernightStays((prev) => Math.max(0, prev - 1))}
                  className="w-11 h-11 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-[#1A3A6A] hover:text-[#1A3A6A] hover:bg-slate-100 transition-all cursor-pointer shadow-2xs font-bold"
                  aria-label="Diminuer"
                >
                  <FAIcon name="fa-solid fa-minus" size={13} />
                </button>

                <div className="min-w-[110px] py-2.5 px-4 rounded-xl border-2 border-[#1A3A6A]/30 bg-white text-center shadow-xs flex flex-col items-center justify-center">
                  <span className="font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                    {overnightStays}
                  </span>
                  <span className="text-xs font-bold text-[#1A3A6A] uppercase tracking-wider mt-0.5">
                    {overnightStays > 1 ? 'jours' : 'jour'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOvernightStays((prev) => prev + 1)}
                  className="w-11 h-11 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-[#1A3A6A] hover:text-[#1A3A6A] hover:bg-slate-100 transition-all cursor-pointer shadow-2xs font-bold"
                  aria-label="Augmenter"
                >
                  <FAIcon name="fa-solid fa-plus" size={13} />
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:text-slate-900 cursor-pointer"
            >
              <FAIcon name="fa-solid fa-arrow-left" size={14} />
              <span>Retour</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#234c89] transition-colors cursor-pointer shadow-sm"
            >
              <span>Calculer le budget total</span>
              <FAIcon name="fa-solid fa-calculator" size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          ÉTAPE 4 : RÉSULTAT FINAL (CENTRÉ AU MILIEU)
          ======================================================== */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Carte principale de synthèse avec l'estimation globale */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#1A3A6A]/6 via-[#1A3A6A]/10 to-slate-50 border border-[#1A3A6A]/25 rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A3A6A] bg-white px-3.5 py-1 rounded-full shadow-2xs">
              Synthèse de votre demande
            </span>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 text-center">
              {selectedVehicle.name}
            </h4>
            <p className="text-sm text-[#1A3A6A] font-semibold mt-1 text-center">
              Catégorie {currentCategoryData.title} • Chauffeur professionnel inclus
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-600">
              <span className="bg-white px-3 py-1 rounded-lg border border-slate-200">
                Durée : {duration} {durationUnit}
              </span>
              <span className="bg-white px-3 py-1 rounded-lg border border-slate-200">
                Mission : {zone === 'ville' ? 'À Lomé' : 'À l\'intérieur du pays'}
              </span>
              {zone === 'interieur' && overnightStays > 0 && (
                <span className="bg-white px-3 py-1 rounded-lg border border-slate-200">
                  En mission : {overnightStays} jour(s) hors Lomé
                </span>
              )}
            </div>

            {/* Affichage exclusif du Budget Total Estimé en grand au centre */}
            <div className="my-6 py-4 px-6 rounded-2xl bg-white/80 border border-slate-200/80 w-full text-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Budget Total Estimé
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#1A3A6A] mt-1 tracking-tight">
                {estimate.formattedTotal}
              </div>
              {estimate.formattedMonthlyEquivalent && (
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Soit environ <strong className="text-slate-900">{estimate.formattedMonthlyEquivalent}</strong>
                </p>
              )}
            </div>

            {/* Note informative de mission */}
            <div className="text-xs text-slate-600 bg-white/90 p-4 rounded-xl border border-slate-200/70 flex items-center justify-center gap-2.5 text-center">
              <FAIcon name="fa-solid fa-circle-check" size={16} className="text-[#1A3A6A] shrink-0" />
              <span>
                « Voici une estimation globale de votre budget : <strong>{estimate.formattedTotal}</strong> pour la mise à disposition d'un véhicule récent avec chauffeur professionnel dédié. Un conseiller <strong>SANKO TOGO</strong> reste disponible pour finaliser votre dossier. »
              </span>
            </div>

            {/* Note tarifaire personnalisable */}
            <div className="mt-4 w-full rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 flex items-start gap-3 text-left">
              <FAIcon name="fa-solid fa-circle-info" size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">
                  Ce tarif peut être revu selon vos besoins spécifiques
                </p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Cette estimation est basée sur notre grille tarifaire standard. Les conditions exactes — durée, volume de la flotte, spécificités de la mission — peuvent donner lieu à une offre personnalisée.{' '}
                  <strong>Écrivez-nous pour une discussion plus approfondie</strong>, afin que nous puissions mieux comprendre vos besoins et vous proposer la solution la plus adaptée.
                </p>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <FAIcon name="fa-brands fa-whatsapp" size={15} color="#FFFFFF" />
                  <span>Discuter de mon projet avec un conseiller SANKO</span>
                  <FAIcon name="fa-solid fa-arrow-right" size={11} color="#FFFFFF" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de contact prospect optionnel centré */}
          <div className="max-w-xl mx-auto bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
            <h5 className="text-sm font-bold text-slate-800 mb-1 text-center">
              Personnaliser votre demande (optionnel) :
            </h5>
            <p className="text-xs text-slate-500 mb-4 text-center">
              Indiquez votre nom ou votre organisation pour accélérer le traitement de votre demande lors de l'envoi sur WhatsApp.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor={nameInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre nom / Fonction
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  placeholder="Ex : M. Koffi Mensah / Logistique"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  className="w-full text-sm bg-white px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#1A3A6A]"
                />
              </div>
              <div>
                <label htmlFor={orgInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre organisation / entreprise
                </label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="Ex : Agence UN, ONG, Ambassade..."
                  value={prospectOrg}
                  onChange={(e) => setProspectOrg(e.target.value)}
                  className="w-full text-sm bg-white px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#1A3A6A]"
                />
              </div>
            </div>
          </div>

          {/* Actions finales centrées */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:text-slate-900 cursor-pointer"
            >
              <FAIcon name="fa-solid fa-arrow-rotate-left" size={14} />
              <span>Modifier la simulation</span>
            </button>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-[1.01]"
            >
              <FAIcon name="fa-brands fa-whatsapp" size={18} color="#FFFFFF" />
              <span>Recevoir cette estimation sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


