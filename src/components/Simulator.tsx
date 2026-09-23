import React, { useState, useId } from 'react';
import { VehicleTypeId, RentalType, UsageZone } from '../types';
import { VEHICLE_OPTIONS, calculateEstimate, WHATSAPP_CONFIG } from '../data/content';
import { FAIcon } from './FAIcon';

interface SimulatorProps {
  id?: string;
  initialVehicle?: VehicleTypeId;
  initialRentalType?: RentalType;
  className?: string;
}

export const Simulator: React.FC<SimulatorProps> = ({
  id = 'simulateur',
  initialVehicle = 'suv',
  initialRentalType = 'courte',
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>(initialVehicle);
  const [rentalType, setRentalType] = useState<RentalType>(initialRentalType);
  const [duration, setDuration] = useState<number>(initialRentalType === 'courte' ? 5 : 3);
  const [zone, setZone] = useState<UsageZone>('ville');
  const [withDriver, setWithDriver] = useState<boolean>(true);

  // Optional prospect inputs
  const [prospectName, setProspectName] = useState<string>('');
  const [prospectOrg, setProspectOrg] = useState<string>('');

  const nameInputId = useId();
  const orgInputId = useId();
  const durationInputId = useId();

  // Selected vehicle details
  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleType) || VEHICLE_OPTIONS[0];

  // Duration label
  const durationUnit = rentalType === 'courte' ? 'jours' : 'mois';
  const durationMin = rentalType === 'courte' ? 1 : rentalType === 'moyenne' ? 1 : 6;
  const durationMax = rentalType === 'courte' ? 30 : rentalType === 'moyenne' ? 11 : 48;

  const handleRentalTypeChange = (type: RentalType) => {
    setRentalType(type);
    if (type === 'courte') {
      setDuration(5);
    } else if (type === 'moyenne') {
      setDuration(3);
    } else {
      setDuration(12);
    }
  };

  // Calculate result
  const estimate = calculateEstimate(vehicleType, rentalType, duration, zone, withDriver);

  // Build WhatsApp prefilled message
  const generateWhatsAppUrl = () => {
    const rentalTypeLabels: Record<RentalType, string> = {
      courte: 'Courte durée',
      moyenne: 'Moyenne durée',
      longue: 'Longue durée',
    };

    const zoneLabel = zone === 'ville' ? 'En ville (Lomé)' : 'À l\'intérieur du pays';

    let message = `Bonjour Sanko Togo,\n\nJe viens d'effectuer une simulation de budget sur votre site web pour les besoins de mobilité de mon organisation :\n\n`;
    message += `• Véhicule : ${selectedVehicle.name} (${selectedVehicle.categoryName})\n`;
    message += `• Type de contrat : ${rentalTypeLabels[rentalType]}\n`;
    message += `• Durée estimée : ${duration} ${durationUnit}\n`;
    message += `• Zone d'utilisation : ${zoneLabel}\n`;
    message += `• Chauffeur professionnel : Inclus (obligatoire)\n`;
    message += `• Estimation indicative reçue : ${estimate.formattedRange}\n`;

    if (prospectName.trim()) {
      message += `• Nom du contact : ${prospectName.trim()}\n`;
    }
    if (prospectOrg.trim()) {
      message += `• Organisation : ${prospectOrg.trim()}\n`;
    }

    message += `\nMerci de bien vouloir me recontacter pour me confirmer le tarif exact et les modalités contractuelles.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encoded}`;
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 md:p-10 scroll-mt-28 ${className}`}
    >
      {/* Header with Title & Stepper */}
      <div className="border-b border-slate-100 pb-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3 py-1 rounded-full">
              Simulateur de Budget
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Estimez votre budget en quelques clics
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Tarification indicative personnalisée pour les organisations et entreprises au Togo.
            </p>
          </div>

          {/* Step Badges */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const isPast = currentStep > step;
              return (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1A3A6A] text-white ring-4 ring-[#1A3A6A]/15'
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
        </div>

        {/* Step Titles */}
        <div className="mt-4 text-xs font-medium text-slate-500 flex items-center gap-2">
          <span>
            {currentStep === 1 && 'Étape 1 : Type de véhicule'}
            {currentStep === 2 && 'Étape 2 : Type et durée de location'}
            {currentStep === 3 && 'Étape 3 : Zone d\'utilisation & Chauffeur'}
            {currentStep === 4 && 'Résultat de votre estimation'}
          </span>
        </div>
      </div>

      {/* STEP 1: TYPE DE VÉHICULE */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
            {VEHICLE_OPTIONS.map((item) => {
              const isSelected = vehicleType === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setVehicleType(item.id)}
                  className={`relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1A3A6A] bg-[#1A3A6A]/5 shadow-sm ring-1 ring-[#1A3A6A]'
                      : 'border-slate-200 bg-white hover:border-[#1A3A6A]/40 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#1A3A6A] text-white' : 'bg-slate-100 text-[#1A3A6A]'
                      }`}
                    >
                      <FAIcon name={item.faIcon} size={18} />
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#1A3A6A] text-white flex items-center justify-center text-[10px]">
                        <FAIcon name="fa-solid fa-check" size={10} color="#FFFFFF" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 leading-snug">{item.name}</h4>
                    <p className="text-xs text-[#1A3A6A] font-medium mt-0.5">{item.categoryName}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#234c89] transition-colors cursor-pointer"
            >
              <span>Continuer</span>
              <FAIcon name="fa-solid fa-arrow-right" size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TYPE ET DURÉE */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2.5">
              Type de location :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'courte' as RentalType,
                  title: 'Courte durée',
                  subtitle: 'Quelques jours à quelques semaines',
                  icon: 'fa-regular fa-clock',
                },
                {
                  id: 'moyenne' as RentalType,
                  title: 'Moyenne durée',
                  subtitle: '1 à 6 mois de mission',
                  icon: 'fa-regular fa-calendar-days',
                },
                {
                  id: 'longue' as RentalType,
                  title: 'Longue durée',
                  subtitle: 'Plusieurs mois à plusieurs années',
                  icon: 'fa-regular fa-calendar-check',
                },
              ].map((opt) => {
                const isSelected = rentalType === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleRentalTypeChange(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1A3A6A] bg-[#1A3A6A]/5 ring-1 ring-[#1A3A6A]'
                        : 'border-slate-200 hover:border-[#1A3A6A]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <FAIcon
                        name={opt.icon}
                        size={16}
                        className={isSelected ? 'text-[#1A3A6A]' : 'text-slate-400'}
                      />
                      <span className="font-bold text-sm text-slate-900">{opt.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">{opt.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label htmlFor={durationInputId} className="block text-sm font-semibold text-slate-800">
                  Durée souhaitée ({durationUnit}) :
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ajustez le curseur ou saisissez directement le nombre de {durationUnit}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDuration((prev) => Math.max(durationMin, prev - 1))}
                  className="w-9 h-9 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-[#1A3A6A] cursor-pointer"
                >
                  <FAIcon name="fa-solid fa-minus" size={12} />
                </button>

                <div className="relative">
                  <input
                    id={durationInputId}
                    type="number"
                    min={durationMin}
                    max={durationMax}
                    value={duration}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        setDuration(Math.max(durationMin, Math.min(durationMax, val)));
                      }
                    }}
                    className="w-20 text-center font-bold text-base py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A]"
                  />
                  <span className="text-xs text-slate-500 absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    {durationUnit}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setDuration((prev) => Math.min(durationMax, prev + 1))}
                  className="w-9 h-9 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-[#1A3A6A] cursor-pointer"
                >
                  <FAIcon name="fa-solid fa-plus" size={12} />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <input
                type="range"
                min={durationMin}
                max={durationMax}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                className="w-full accent-[#1A3A6A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{durationMin} {durationUnit}</span>
                <span>{Math.round((durationMin + durationMax) / 2)} {durationUnit}</span>
                <span>{durationMax} {durationUnit}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-semibold hover:text-slate-900 cursor-pointer"
            >
              <FAIcon name="fa-solid fa-arrow-left" size={14} />
              <span>Retour</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#234c89] transition-colors cursor-pointer"
            >
              <span>Continuer</span>
              <FAIcon name="fa-solid fa-arrow-right" size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ZONE D'UTILISATION & CHAUFFEUR */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {/* Zone */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2.5">
              Zone d'utilisation :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'ville' as UsageZone,
                  title: 'En ville (Lomé)',
                  desc: 'Trajets urbains et péri-urbains dans le Grand Lomé.',
                  icon: 'fa-regular fa-building',
                },
                {
                  id: 'interieur' as UsageZone,
                  title: 'À l\'intérieur du pays',
                  desc: 'Missions en région (Maritime, Plateaux, Centrale, Kara, Savanes).',
                  icon: 'fa-solid fa-map-location-dot',
                },
              ].map((opt) => {
                const isSelected = zone === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setZone(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1A3A6A] bg-[#1A3A6A]/5 ring-1 ring-[#1A3A6A]'
                        : 'border-slate-200 hover:border-[#1A3A6A]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <FAIcon
                        name={opt.icon}
                        size={16}
                        className={isSelected ? 'text-[#1A3A6A]' : 'text-slate-400'}
                      />
                      <span className="font-bold text-sm text-slate-900">{opt.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chauffeur professionnel obligatoire */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2.5">
              Chauffeur professionnel :
            </label>
            <div className="p-4 rounded-xl border border-[#1A3A6A] bg-[#1A3A6A]/5 ring-1 ring-[#1A3A6A]">
              <div className="flex items-center gap-2.5 mb-1.5">
                <FAIcon
                  name="fa-solid fa-user-check"
                  size={16}
                  className="text-[#1A3A6A]"
                />
                <span className="font-bold text-sm text-slate-900">Avec chauffeur professionnel dédié</span>
                <span className="ml-auto text-xs font-bold bg-[#1A3A6A] text-white px-2.5 py-0.5 rounded-full">
                  Inclus & Obligatoire
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Le chauffeur professionnel est obligatoire et systématiquement inclus pour l'ensemble de nos offres de location afin de garantir votre sécurité, votre confort et le respect rigoureux des standards de mission.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-semibold hover:text-slate-900 cursor-pointer"
            >
              <FAIcon name="fa-solid fa-arrow-left" size={14} />
              <span>Retour</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-2 bg-[#1A3A6A] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#234c89] transition-colors cursor-pointer"
            >
              <span>Calculer mon estimation</span>
              <FAIcon name="fa-solid fa-calculator" size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RÉSULTAT */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Summary Recap Box */}
          <div className="bg-[#1A3A6A]/5 border border-[#1A3A6A]/20 rounded-xl p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A3A6A]">
                  Votre sélection
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedVehicle.name} • {rentalType === 'courte' ? 'Courte durée' : rentalType === 'moyenne' ? 'Moyenne durée' : 'Longue durée'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {duration} {durationUnit} • {zone === 'ville' ? 'En ville (Lomé)' : 'À l\'intérieur du pays'} • Chauffeur professionnel inclus (obligatoire)
                </p>
              </div>

              <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Fourchette indicative :</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1A3A6A]">
                  {estimate.formattedRange}
                </div>
              </div>
            </div>

            {/* Verbatim message required by prompt */}
            <div className="mt-4 pt-4 border-t border-[#1A3A6A]/10 text-xs sm:text-sm text-slate-600 bg-white/70 p-3 rounded-lg flex items-start gap-2.5">
              <FAIcon name="fa-solid fa-circle-info" size={16} className="text-[#1A3A6A] mt-0.5 shrink-0" />
              <span>
                « Voici une estimation indicative de votre budget : <strong>{estimate.formattedRange}</strong>. Un conseiller vous confirmera le tarif exact selon vos besoins précis. »
              </span>
            </div>
          </div>

          {/* Optional Prospect Fields */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70">
            <h5 className="text-sm font-bold text-slate-800 mb-1">
              Personnaliser votre demande (optionnel) :
            </h5>
            <p className="text-xs text-slate-500 mb-4">
              Renseignez votre nom ou organisation pour que notre conseiller prépare un dossier adapté dès la réception de votre message WhatsApp.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={nameInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre nom
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  placeholder="Ex : M. Koffi Mensah"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  className="w-full text-sm bg-white px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A]"
                />
              </div>
              <div>
                <label htmlFor={orgInputId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre organisation / entreprise
                </label>
                <input
                  id={orgInputId}
                  type="text"
                  placeholder="Ex : Agence UN, ONG Internationale, Banque..."
                  value={prospectOrg}
                  onChange={(e) => setProspectOrg(e.target.value)}
                  className="w-full text-sm bg-white px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1A3A6A]"
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-semibold hover:text-slate-900 cursor-pointer"
            >
              <FAIcon name="fa-solid fa-arrow-rotate-left" size={14} />
              <span>Modifier les critères</span>
            </button>

            {/* VERBATIM CTA BUTTON REQUIRED BY PROMPT */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
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
