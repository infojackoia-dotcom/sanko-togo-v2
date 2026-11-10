import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { FAIcon } from './FAIcon';
import { WHATSAPP_CONFIG } from '../data/content';

export type FleetCategoryKey = 'all' | '4x4' | 'pickup' | 'suv' | 'berline' | 'minibus';

export interface VehiclePhoto {
  url: string;
  label: string;
}

export interface FleetVehicleItem {
  id: string;
  category: 'berline' | 'suv' | '4x4' | 'pickup' | 'minibus';
  categoryLabel: string;
  subLabel: string;
  subIcon: string;
  name: string;
  badge: string;
  photos: VehiclePhoto[];
  capacity: string;
  ac: string;
  transmission: string;
  description: string;
  highlights: string[];
}

export const FLEET_VEHICLES: FleetVehicleItem[] = [
  // ================= 1. TOYOTA FORTUNER =================
  {
    id: 'toyota-fortuner',
    category: '4x4',
    categoryLabel: '4x4 Baroudeur & Prestige',
    subLabel: '4x4',
    subIcon: 'fa-solid fa-car-side',
    name: 'Toyota Fortuner',
    badge: '4x4 Baroudeur & Confort',
    photos: [
      { url: '/gallery/toyota-fortuner-real.jpg', label: 'Toyota Fortuner 4x4 Blanc' },
      { url: '/gallery/toyota-cockpit-interior.jpg', label: 'Habitacle & Confort' },
    ],
    capacity: '7 places modulables',
    ac: 'Climatisation bizone grand froid',
    transmission: '4x4 Automatique séquentielle',
    description: 'SUV 4x4 robuste et élégant par excellence, offrant une garde au sol protectrice, un habitacle haut de gamme et un confort souverain en milieu urbain comme sur les pistes de l’intérieur du Togo.',
    highlights: [
      'Garde au sol élevée et motricité 4x4 tout-terrain permanente',
      'Habitacle spacieux 7 places avec finitions premium et coffre modulable',
      'Chauffeur professionnel qualifié pour missions de terrain et protocole',
    ],
  },

  // ================= 2. TOYOTA HILUX =================
  {
    id: 'toyota-hilux',
    category: 'pickup',
    categoryLabel: 'Pick-up Double Cabine',
    subLabel: 'Pick-up',
    subIcon: 'fa-solid fa-truck-pickup',
    name: 'Toyota Hilux',
    badge: 'Missions Terrain & Pistes',
    photos: [
      { url: '/gallery/hilux-concession-togo.jpg', label: 'Vue Réelle Double Cabine Togo' },
      { url: '/gallery/toyota-cockpit-interior.jpg', label: 'Habitacle & Confort' },
    ],
    capacity: '5 places + Benne cargo',
    ac: 'Clim grand froid renforcée',
    transmission: '4x4 avec réducteur court',
    description: 'Le standard absolu des missions de développement, ONG et projets en milieu rural dans les Savanes, la Kara et les Plateaux. Capacité de franchissement éprouvée et benne sécurisée.',
    highlights: [
      'Capacité de franchissement extrême sur toutes pistes togolaises',
      'Grande benne avec bâche étanche pour transport de fret et outillage',
      'Équipement de sécurité terrain complet et double roue de secours',
    ],
  },

  // ================= 3. TOYOTA LAND CRUISER 250 =================
  {
    id: 'toyota-land-cruiser-250',
    category: '4x4',
    categoryLabel: '4x4 Exécutif & Prestige',
    subLabel: '4x4',
    subIcon: 'fa-solid fa-car-side',
    name: 'Toyota LAND CRUISER 250',
    badge: 'Prestige Tout-Terrain',
    photos: [
      { url: '/gallery/landcruiser-prado-250-togo.jpg', label: 'Nouveau Toyota Land Cruiser 250 Togo' },
      { url: '/gallery/landcruiser-250-front-angle.jpg', label: 'Calandre & Optiques Avant' },
      { url: '/gallery/chauffeur-landcruiser-pro.jpg', label: 'Chauffeur Professionnel au Volant' },
      { url: '/gallery/toyota-cockpit-interior.jpg', label: 'Habitacle & Confort' },
    ],
    capacity: '7 places VIP',
    ac: 'Clim multi-zone intégrale',
    transmission: '4x4 Permanent Automatique',
    description: 'Le sommet du prestige et du confort tout-terrain pour les chefs d’agences internationales, ambassadeurs, délégations ministérielles et missions de haut niveau au Togo.',
    highlights: [
      'Dernière génération Toyota Land Cruiser 250 avec design néo-rétro',
      'Confort souverain sur bitume comme sur pistes dégradées',
      'Chauffeur d’élite formé à la conduite sécuritaire et protocolaire',
    ],
  },

  // ================= 4. TOYOTA MINI BUS =================
  {
    id: 'toyota-mini-bus',
    category: 'minibus',
    categoryLabel: 'Minibus 15 Places',
    subLabel: 'Bus et minibus',
    subIcon: 'fa-solid fa-van-shuttle',
    name: 'Toyota Mini Bus',
    badge: 'Transport de Groupe',
    photos: [
      { url: '/gallery/toyota-hiace-minibus.jpg', label: 'Toyota HiAce Minibus (15 places)' },
    ],
    capacity: '15 places assises',
    ac: 'Clim multi-diffuseurs arrière',
    transmission: 'Boîte mécanique renforcée',
    description: 'Minibus grand confort doté de 15 vrais sièges individuels avec ceintures, idéal pour ateliers, délégations d’experts, séminaires régionaux et navettes aéroport.',
    highlights: [
      '15 vrais sièges individuels confortables avec ceintures de sécurité',
      'Diffuseurs de climatisation dédiés pour chaque rangée de passagers',
      'Chauffeur expérimenté dédié au transport collectif de personnes',
    ],
  },

  // ================= 5. TOYOTA COROLLA CROSS SUV =================
  {
    id: 'toyota-corolla-cross',
    category: 'suv',
    categoryLabel: 'SUV Polyvalent',
    subLabel: 'SUV',
    subIcon: 'fa-solid fa-car',
    name: 'Toyota Corolla Cross',
    badge: 'Confort Urbain & Route',
    photos: [
      { url: '/gallery/corolla-cross-white-side.jpg', label: 'Vue Profil Côté' },
      { url: '/gallery/corolla-cross-white-front.jpg', label: 'Vue Avant 3/4' },
      { url: '/gallery/corolla-cross-white-rear.jpg', label: 'Vue Arrière & Coffre' },
      { url: '/gallery/corolla-cross-gold-front.jpg', label: 'Édition Gold Face Avant' },
      { url: '/gallery/toyota-cockpit-interior.jpg', label: 'Habitacle & Confort' },
    ],
    capacity: '5 places',
    ac: 'Clim auto régulée',
    transmission: 'Boîte automatique',
    description: 'SUV surélevé moderne offrant une excellente visibilité, très maniable en ville et très confortable sur les grands axes nationaux du Togo.',
    highlights: [
      'Position de conduite haute et garde au sol protectrice',
      'Idéal pour missions de supervision et liaisons régionales',
      'Coffre spacieux pour bagages volumineux et matériel',
    ],
  },

  // ================= 6. TOYOTA COROLLA BERLINE =================
  {
    id: 'toyota-corolla-l6',
    category: 'berline',
    categoryLabel: 'Berline Confort',
    subLabel: 'Berline',
    subIcon: 'fa-solid fa-car-side',
    name: 'Toyota Corolla Berline',
    badge: 'Mobilité Urbaine & Affaires',
    photos: [
      { url: '/gallery/corolla-champagne-side.jpg', label: 'Vue Réelle Profil Côté' },
      { url: '/gallery/toyota-cockpit-interior.jpg', label: 'Habitacle & Confort' },
    ],
    capacity: '5 places',
    ac: 'Clim automatique',
    transmission: 'Boîte automatique',
    description: 'La référence mondiale en matière de fiabilité et de sobriété, parfaite pour les cadres, consultants et transferts réguliers à Lomé.',
    highlights: [
      'Grande douceur de conduite et habitacle silencieux',
      'Idéale pour missions d’experts et rendez-vous quotidiens',
      'Excellente efficience et ponctualité exemplaire',
    ],
  },

  // ================= 7. TOYOTA STARLET =================
  {
    id: 'toyota-starlet',
    category: 'berline',
    categoryLabel: 'Citadine & Compacte',
    subLabel: 'Citadine',
    subIcon: 'fa-solid fa-car-side',
    name: 'Toyota Starlet',
    badge: 'Agilité & Économie',
    photos: [
      { url: '/gallery/starlet-black-side.jpg', label: 'Vue Réelle Profil Côté' },
      { url: '/gallery/toyota-cockpit-interior.jpg', label: 'Habitacle & Confort' },
    ],
    capacity: '5 places',
    ac: 'Climatisation continue',
    transmission: 'Automatique / Manuelle',
    description: 'Véhicule compact moderne et agile, parfait pour naviguer aisément dans la circulation urbaine de Lomé à coût maîtrisé.',
    highlights: [
      'Ultra maniable pour les déplacements urbains denses',
      'Consommation optimisée pour liaisons quotidiennes',
      'Parfaite pour courses administratives et personnel d’appui',
    ],
  },
];

interface VehicleCardItemProps {
  vehicle: FleetVehicleItem;
  onOpenDetails: (vehicle: FleetVehicleItem) => void;
}

const VehicleCardItem: React.FC<VehicleCardItemProps> = ({ vehicle, onOpenDetails }) => {
  const primaryPhoto = vehicle.photos[0]?.url || '/gallery/corolla-cross-white-side.jpg';

  return (
    <div className="bg-[#F1F3F6] rounded-3xl p-2.5 sm:p-3 pb-3.5 sm:pb-4 flex flex-col justify-between group border border-slate-200/50 hover:shadow-md transition-all duration-300">
      {/* Top Image Container */}
      <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full relative bg-slate-200">
        <img
          src={primaryPhoto}
          alt={vehicle.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Floating White Content Card overlapping image */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 -mt-8 sm:-mt-10 relative z-10 mx-1 sm:mx-1.5 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base sm:text-[17px] mb-1.5 leading-tight tracking-tight">
          {vehicle.name}
        </h3>

        {/* Subtitle / Category line with icon */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mb-4">
          <FAIcon name={vehicle.subIcon} size={13} color="#1A3A6A" />
          <span>{vehicle.subLabel}</span>
        </div>

        {/* Navy Blue Pill Button "Détails" */}
        <button
          type="button"
          onClick={() => onOpenDetails(vehicle)}
          className="w-full bg-[#1A3A6A] hover:bg-[#234c89] text-white font-bold py-2.5 sm:py-3 rounded-full text-xs sm:text-sm text-center shadow-xs transition-colors cursor-pointer block"
        >
          Détails
        </button>
      </div>
    </div>
  );
};

interface FleetShowcaseProps {
  onNavigate: (page: PageId, anchor?: string) => void;
  targetAnchor?: string;
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({ onNavigate, targetAnchor }) => {
  const [activeCategory, setActiveCategory] = useState<FleetCategoryKey>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicleItem | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number>(0);

  // Sync category with targetAnchor
  useEffect(() => {
    if (targetAnchor) {
      if (targetAnchor === 'flotte-4x4') {
        setActiveCategory('4x4');
      } else if (targetAnchor === 'flotte-pickup') {
        setActiveCategory('pickup');
      } else if (targetAnchor === 'flotte-suv') {
        setActiveCategory('suv');
      } else if (targetAnchor === 'flotte-berline') {
        setActiveCategory('berline');
      } else if (targetAnchor === 'flotte-minibus') {
        setActiveCategory('minibus');
      } else if (targetAnchor === 'notre-flotte') {
        setActiveCategory('all');
      }

      setTimeout(() => {
        const el = document.getElementById('notre-flotte');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }, [targetAnchor]);

  const filteredVehicles =
    activeCategory === 'all'
      ? FLEET_VEHICLES
      : FLEET_VEHICLES.filter((v) => v.category === activeCategory);

  const categoriesConfig: { key: FleetCategoryKey; label: string; icon: string; count: number }[] = [
    { key: 'all', label: 'Tous les modèles', icon: 'fa-solid fa-layer-group', count: FLEET_VEHICLES.length },
    { key: '4x4', label: '4x4', icon: 'fa-solid fa-car-side', count: FLEET_VEHICLES.filter((v) => v.category === '4x4').length },
    { key: 'pickup', label: 'Pick-up', icon: 'fa-solid fa-truck-pickup', count: FLEET_VEHICLES.filter((v) => v.category === 'pickup').length },
    { key: 'suv', label: 'SUV', icon: 'fa-solid fa-car', count: FLEET_VEHICLES.filter((v) => v.category === 'suv').length },
    { key: 'berline', label: 'Berline', icon: 'fa-solid fa-car-side', count: FLEET_VEHICLES.filter((v) => v.category === 'berline').length },
    { key: 'minibus', label: 'Bus et minibus', icon: 'fa-solid fa-van-shuttle', count: FLEET_VEHICLES.filter((v) => v.category === 'minibus').length },
  ];

  const handleWhatsAppInquiry = (vehicleName: string, category: string) => {
    const text = encodeURIComponent(
      `Bonjour SANKO TOGO, je consulte votre flotte sur votre site et je souhaite obtenir des informations et un devis pour le modèle suivant :\n\n- Modèle : ${vehicleName} (${category})\n\nPouvez-vous m'indiquer les disponibilités et les conditions tarifaires ? Merci.`
    );
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phone}?text=${text}`, '_blank');
  };

  const handleOpenModal = (vehicle: FleetVehicleItem) => {
    setSelectedVehicle(vehicle);
    setModalPhotoIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
  };

  return (
    <section id="notre-flotte" className="py-16 sm:py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
            Galerie de la Flotte
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3 tracking-tight">
            Nos différents modèles de véhicules
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Découvrez nos véhicules récents, parfaitement entretenus et disponibles avec chauffeur professionnel pour vos missions au Togo.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categoriesConfig.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#1A3A6A] text-white shadow-md scale-102'
                    : 'bg-[#F1F3F6] text-slate-700 hover:text-[#1A3A6A] hover:bg-slate-200/70 border border-slate-200/80'
                }`}
              >
                <FAIcon name={cat.icon} size={14} color={isActive ? '#FFFFFF' : '#1A3A6A'} />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vehicles Grid - 4 per horizontal line on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCardItem
              key={vehicle.id}
              vehicle={vehicle}
              onOpenDetails={handleOpenModal}
            />
          ))}
        </div>

        {/* Note liste non exhaustive + CTA WhatsApp */}
        <div className="mt-10 text-center max-w-xl mx-auto flex flex-col items-center gap-4 bg-[#F8F9FB] border border-slate-200/80 rounded-2xl px-8 py-8">
          <div className="w-11 h-11 rounded-full bg-[#1A3A6A]/10 flex items-center justify-center">
            <FAIcon name="fa-solid fa-circle-info" size={20} className="text-[#1A3A6A]" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">Cette liste n'est pas exhaustive</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Notre flotte comprend d'autres modèles disponibles selon vos besoins.<br />
              Écrivez-nous pour en savoir plus et trouver le véhicule idéal pour votre mission.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent('Bonjour SANKO TOGO, je souhaite en savoir plus sur les véhicules disponibles dans votre flotte.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm px-6 py-3 rounded-full shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
          >
            <FAIcon name="fa-brands fa-whatsapp" size={17} color="#FFFFFF" />
            <span>Nous écrire sur WhatsApp</span>
          </a>
        </div>

        {/* Commitment Banner in Navy Blue */}
        <div className="mt-14 bg-[#0F2444] rounded-3xl p-8 sm:p-10 text-white shadow-sm border border-[#1A3A6A]/40">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Normes de maintenance & Sécurité garantie
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
              Chaque véhicule de notre flotte fait l'objet d'un contrôle rigoureux en 45 points avant chaque départ en mission. En cas d'imprévu technique, nous mobilisons immédiatement un véhicule relais partout au Togo.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <FAIcon name="fa-solid fa-shield-halved" size={20} className="text-emerald-400 mb-2" />
                <span className="font-bold text-xs sm:text-sm block">Véhicules récents</span>
                <span className="text-[11px] text-slate-300">Moins de 4 ans</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <FAIcon name="fa-solid fa-rotate" size={20} className="text-amber-400 mb-2" />
                <span className="font-bold text-xs sm:text-sm block">Véhicule Relais</span>
                <span className="text-[11px] text-slate-300">Garanti en cas d'aléa</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <FAIcon name="fa-solid fa-id-badge" size={20} className="text-cyan-400 mb-2" />
                <span className="font-bold text-xs sm:text-sm block">Chauffeurs pro</span>
                <span className="text-[11px] text-slate-300">Conduite défensive</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <FAIcon name="fa-solid fa-headset" size={20} className="text-rose-400 mb-2" />
                <span className="font-bold text-xs sm:text-sm block">Assistance 24/7</span>
                <span className="text-[11px] text-slate-300">Sur tout le Togo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL DÉTAILS VÉHICULE ================= */}
      {selectedVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#1A3A6A] text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
                    {selectedVehicle.categoryLabel}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {selectedVehicle.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedVehicle.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <FAIcon name="fa-solid fa-xmark" size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Photo Showcase with Angles */}
              <div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={selectedVehicle.photos[modalPhotoIndex]?.url || selectedVehicle.photos[0].url}
                    alt={`${selectedVehicle.name} - ${selectedVehicle.photos[modalPhotoIndex]?.label}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-xs">
                    {selectedVehicle.photos[modalPhotoIndex]?.label}
                  </div>
                </div>

                {/* Thumbnails */}
                {selectedVehicle.photos.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {selectedVehicle.photos.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setModalPhotoIndex(idx)}
                        className={`relative w-20 sm:w-24 shrink-0 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          idx === modalPhotoIndex
                            ? 'border-[#1A3A6A] scale-102 shadow-xs'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Specs 3 Pills */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-2 flex flex-col items-center justify-center text-center">
                  <FAIcon name="fa-solid fa-users" size={14} color="#1A3A6A" />
                  <span className="font-bold text-slate-800 text-xs mt-1">
                    {selectedVehicle.capacity}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-2 flex flex-col items-center justify-center text-center">
                  <FAIcon name="fa-solid fa-snowflake" size={14} color="#1A3A6A" />
                  <span className="font-bold text-slate-800 text-xs mt-1">
                    {selectedVehicle.ac}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl py-2.5 px-2 flex flex-col items-center justify-center text-center">
                  <FAIcon name="fa-solid fa-gears" size={14} color="#1A3A6A" />
                  <span className="font-bold text-slate-800 text-xs mt-1">
                    {selectedVehicle.transmission}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                  Présentation du véhicule
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedVehicle.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="bg-[#1A3A6A]/5 border border-[#1A3A6A]/15 rounded-2xl p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A3A6A] block mb-2.5">
                  Points forts pour votre mission :
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedVehicle.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#1A3A6A]/15 text-[#1A3A6A] flex items-center justify-center shrink-0 mt-0.5">
                        <FAIcon name="fa-solid fa-check" size={9} color="#1A3A6A" />
                      </span>
                      <span className="font-medium leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 bg-slate-50/70">
              <button
                type="button"
                onClick={() => handleWhatsAppInquiry(selectedVehicle.name, selectedVehicle.categoryLabel)}
                className="w-full sm:flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <FAIcon name="fa-brands fa-whatsapp" size={16} color="#FFFFFF" />
                <span>Demander disponibilité (WhatsApp)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleCloseModal();
                  onNavigate('services', 'simulateur');
                }}
                className="w-full sm:flex-1 bg-[#1A3A6A] hover:bg-[#234c89] text-white py-3 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <FAIcon name="fa-solid fa-calculator" size={13} />
                <span>Estimer mon budget</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};