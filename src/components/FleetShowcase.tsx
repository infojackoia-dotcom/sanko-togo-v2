import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { FAIcon } from './FAIcon';
import { WHATSAPP_CONFIG } from '../data/content';

// Vehicle images
import hiluxImg from '../assets/images/flotte_hilux_sanko_1789053461544.jpg';
import pradoImg from '../assets/images/land_cruiser_prado_4x4_1789143879189.jpg';
import corollaCrossImg from '../assets/images/toyota_corolla_cross_lome_1788887555781.jpg';
import redSuvImg from '../assets/images/hero_red_suv_lome_1788887160530.jpg';
import camryBerlineImg from '../assets/images/berline_executive_lome_1789143862878.jpg';
import chauffeurProImg from '../assets/images/chauffeur_pro_sanko_1789056920709.jpg';
import hiaceMinibusImg from '../assets/images/toyota_hiace_minibus_lome_1789143847210.jpg';

export type FleetCategoryKey = 'all' | '4x4' | 'suv' | 'berline' | 'minibus';

export interface FleetVehicleItem {
  id: string;
  category: '4x4' | 'suv' | 'berline' | 'minibus';
  categoryLabel: string;
  name: string;
  badge: string;
  image: string;
  seats: string;
  transmission: string;
  airConditioning: string;
  fuelOrEngine: string;
  description: string;
  idealFor: string;
  keyEquipments: string[];
}

export const FLEET_VEHICLES: FleetVehicleItem[] = [
  // 4x4
  {
    id: 'hilux-4x4',
    category: '4x4',
    categoryLabel: '4x4',
    name: 'Toyota Hilux Double Cabine 4x4',
    badge: 'Missions Terrain & Pistes',
    image: hiluxImg,
    seats: '5 places assises',
    transmission: '4x4 Enclenchable avec boîte courte',
    airConditioning: 'Tropicalisée grand froid renforcée',
    fuelOrEngine: 'Diesel Turbo D-4D Robuste',
    description: 'Le standard absolu des missions de terrain au Togo. Haute garde au sol, motricité irréprochable et benne spacieuse pour matériel d\'enquête et bagages d\'expédition.',
    idealFor: 'Missions humanitaires, ONG, suivi de projets dans les Savanes, la Kara et les Plateaux, pistes non goudronnées.',
    keyEquipments: [
      'Transmission 4WD avec réducteur',
      'Pneus mixtes tout-terrain renforcés',
      'Benne sécurisée avec bâche étanche',
      'Double roue de secours & outillage terrain',
      'Extincteur & trousse de secours d\'urgence',
    ],
  },
  {
    id: 'prado-4x4',
    category: '4x4',
    categoryLabel: '4x4',
    name: 'Toyota Land Cruiser Prado 4x4',
    badge: 'Exécutif & Prestige',
    image: pradoImg,
    seats: '7 places modulables',
    transmission: 'Automatique 4x4 Permanent',
    airConditioning: 'Climatisation multi-zone intégrale',
    fuelOrEngine: 'Diesel Turbo Puissant & Fiable',
    description: 'Allie le franchissement tout-terrain d\'un vrai 4x4 au confort feutré d\'un véhicule d\'apparat. Parfait pour les délégations exigeantes amenées à sillonner l\'ensemble du pays.',
    idealFor: 'Chefs de mission, coordinateurs résidents, ambassadeurs, visites de bailleurs de fonds et comités de direction.',
    keyEquipments: [
      '4x4 permanent avec blocage de différentiel',
      'Sellerie ergonomique grand confort',
      'Suspension pilotée filtrant les pistes',
      'Réservoir grande capacité pour longues liaisons',
      'Système audio & connectivité Bluetooth',
    ],
  },

  // SUV
  {
    id: 'corolla-cross-suv',
    category: 'suv',
    categoryLabel: 'SUV Polyvalent',
    name: 'Toyota Corolla Cross SUV',
    badge: 'Moderne & Confort Urbain',
    image: corollaCrossImg,
    seats: '5 places spacieuses',
    transmission: 'Automatique séquentielle souple',
    airConditioning: 'Climatisation automatique régulée',
    fuelOrEngine: 'Essence moderne économique',
    description: 'SUV compact surélevé offrant une visibilité panoramique, une excellente maniabilité dans le trafic urbain de Lomé et une grande douceur sur les axes nationaux.',
    idealFor: 'Cadres dirigeants, consultants, rendez-vous d\'affaires à Lomé et déplacements régionaux bitumés.',
    keyEquipments: [
      'Garde au sol surélevée protectrice',
      'Caméra de recul & radars de stationnement',
      'Apple CarPlay & Android Auto',
      'Habitacle silencieux et climatisé',
      'Airbags multiples & contrôle de stabilité',
    ],
  },
  {
    id: 'red-suv',
    category: 'suv',
    categoryLabel: 'SUV Polyvalent',
    name: 'SUV Polyvalent Grand Confort',
    badge: 'Polyvalence Route',
    image: redSuvImg,
    seats: '5 places',
    transmission: 'Automatique confortable',
    airConditioning: 'Tropicalisée avant & arrière',
    fuelOrEngine: 'Motorisation dynamique',
    description: 'Véhicule équilibré taillé pour les longues liaisons routières entre Lomé et les grandes villes de l\'intérieur (Kpalimé, Atakpamé, Sokodé). Coffre généreux pour les valises.',
    idealFor: 'Missions de supervision, équipes de projet de 2 à 4 personnes, déplacements aéroport et séjours d\'affaires.',
    keyEquipments: [
      'Grand coffre à bagages sécurisé',
      'Assise surélevée avec visibilité optimale',
      'Prises de charge USB pour passagers',
      'Freinage ABS & assistance d\'urgence',
      'Régulateur de vitesse adapté autoroute',
    ],
  },

  // Berline
  {
    id: 'camry-berline',
    category: 'berline',
    categoryLabel: 'Berline de Direction',
    name: 'Toyota Camry Exécutive VIP',
    badge: 'Prestige & Protocole',
    image: camryBerlineImg,
    seats: '5 places exécutives',
    transmission: 'Automatique haut de gamme',
    airConditioning: 'Climatisation bi-zone silencieuse',
    fuelOrEngine: 'Essence silencieuse & prestigieuse',
    description: 'L\'incarnation du prestige automobile pour les visites protocolaires et les personnalités. Espace aux jambes remarquable aux places arrière et insonorisation de premier ordre.',
    idealFor: 'Directeurs généraux, ambassades, réceptions ministérielles, sommets internationaux et délégations officielles.',
    keyEquipments: [
      'Sellerie cuir confort supérieur',
      'Espace aux jambes étendu à l\'arrière',
      'Vitrage teinté athermique homologué',
      'Confort acoustique feutré',
      'Finition bois & inserts chromés élégants',
    ],
  },
  {
    id: 'chauffeur-pro-berline',
    category: 'berline',
    categoryLabel: 'Berline de Direction',
    name: 'Berline Confort avec Chauffeur Dédié',
    badge: 'Mobilité Professionnelle',
    image: chauffeurProImg,
    seats: '5 places',
    transmission: 'Automatique ou manuelle',
    airConditioning: 'Tropicalisée continue',
    fuelOrEngine: 'Moteur efficient',
    description: 'Berline soignée mise à disposition avec un chauffeur professionnel certifié en tenue. Ponctualité rigoureuse, discrétion absolue et sérénité totale lors de vos rendez-vous.',
    idealFor: 'Déplacements quotidiens de travail à Lomé, navettes VIP aéroport Lomé-Tokoin et réunions professionnelles denses.',
    keyEquipments: [
      'Chauffeur formé à la conduite préventive',
      'Véhicule désinfecté et nettoyé chaque matin',
      'Eau minérale & lingettes à bord',
      'Trajets optimisés évitant les congestions',
      'Disponibilité 24/7 sur demande',
    ],
  },

  // Minibus
  {
    id: 'hiace-minibus',
    category: 'minibus',
    categoryLabel: 'Minibus (15 places)',
    name: 'Toyota HiAce Minibus (15 places)',
    badge: 'Capacité Exclusive 15 Places',
    image: hiaceMinibusImg,
    seats: '15 places assises climatisées',
    transmission: 'Boîte manuelle robuste',
    airConditioning: 'Double compresseur multi-diffuseurs intégral',
    fuelOrEngine: 'Diesel Turbo Haute Fiabilité',
    description: 'Spécialement configuré pour le transport de groupe avec exactement 15 places assises individuelles. Chaque rangée bénéficie de diffuseurs d\'air frais dédiés pour un confort optimal en climat togolais.',
    idealFor: 'Ateliers de formation, délégations d\'experts, missions conjointes d\'ONG, séminaires régionaux et navettes collectives.',
    keyEquipments: [
      '15 vraies places assises avec ceintures individuelles',
      'Climatisation intégrale pour l\'ensemble des 15 passagers',
      'Porte latérale coulissante à large ouverture',
      'Soute à bagages arrière pratique',
      'Microphone de bord pour guide / animateur',
      'Marchepied d\'accès abaissé pour passagers',
    ],
  },
];

interface FleetShowcaseProps {
  onNavigate: (page: PageId, anchor?: string) => void;
  targetAnchor?: string;
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({ onNavigate, targetAnchor }) => {
  const [activeCategory, setActiveCategory] = useState<FleetCategoryKey>('all');

  // Sync category with targetAnchor
  useEffect(() => {
    if (targetAnchor) {
      if (targetAnchor === 'flotte-4x4') {
        setActiveCategory('4x4');
      } else if (targetAnchor === 'flotte-suv') {
        setActiveCategory('suv');
      } else if (targetAnchor === 'flotte-berline') {
        setActiveCategory('berline');
      } else if (targetAnchor === 'flotte-minibus') {
        setActiveCategory('minibus');
      } else if (targetAnchor === 'notre-flotte') {
        setActiveCategory('all');
      }

      // Smooth scroll into view
      setTimeout(() => {
        const el = document.getElementById('notre-flotte');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }, [targetAnchor]);

  const filteredVehicles = activeCategory === 'all'
    ? FLEET_VEHICLES
    : FLEET_VEHICLES.filter((v) => v.category === activeCategory);

  const categoriesConfig: { key: FleetCategoryKey; label: string; icon: string; count: number }[] = [
    { key: 'all', label: 'Tous les modèles', icon: 'fa-solid fa-layer-group', count: FLEET_VEHICLES.length },
    { key: '4x4', label: '4x4', icon: 'fa-solid fa-truck-pickup', count: FLEET_VEHICLES.filter(v => v.category === '4x4').length },
    { key: 'suv', label: 'SUV', icon: 'fa-solid fa-car', count: FLEET_VEHICLES.filter(v => v.category === 'suv').length },
    { key: 'berline', label: 'Berline', icon: 'fa-solid fa-car-side', count: FLEET_VEHICLES.filter(v => v.category === 'berline').length },
    { key: 'minibus', label: 'Minibus (15 places)', icon: 'fa-solid fa-van-shuttle', count: FLEET_VEHICLES.filter(v => v.category === 'minibus').length },
  ];

  const handleWhatsAppInquiry = (vehicleName: string, category: string) => {
    const text = encodeURIComponent(
      `Bonjour SANKO TOGO, je consulte votre flotte sur votre site et je souhaite obtenir des informations et un devis pour le modèle suivant :\n\n- Modèle : ${vehicleName} (${category})\n\nPouvez-vous m'indiquer les disponibilités et les conditions tarifaires ? Merci.`
    );
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phone}?text=${text}`, '_blank');
  };

  return (
    <section id="notre-flotte" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
            Galerie de la Flotte
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3 tracking-tight">
            Découvrez nos modèles réels en photos
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Véhicules récents, entièrement climatisés et maintenus selon des standards stricts pour garantir la sécurité et le confort de vos équipes au Togo.
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
                    : 'bg-white text-slate-700 hover:text-[#1A3A6A] hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                <FAIcon name={cat.icon} size={14} color={isActive ? '#FFFFFF' : '#1A3A6A'} />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vehicles Grid - 2 per horizontal line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1A3A6A]/50 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Vehicle Photo Banner - Format Carré */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#1A3A6A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {vehicle.categoryLabel}
                  </span>
                  <span className="bg-white/95 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow-xs backdrop-blur-xs">
                    {vehicle.badge}
                  </span>
                </div>

                {/* Bottom title on photo for quick read */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg sm:text-xl font-extrabold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {vehicle.name}
                  </h3>
                </div>
              </div>

              {/* Content Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Quick Specs Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5 text-xs">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                      <FAIcon name="fa-solid fa-users" size={13} color="#1A3A6A" />
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Capacité</span>
                        <span className="font-bold text-slate-800">{vehicle.seats}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
                      <FAIcon name="fa-solid fa-snowflake" size={13} color="#1A3A6A" />
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Climatisation</span>
                        <span className="font-bold text-slate-800 truncate block max-w-[130px]" title={vehicle.airConditioning}>
                          {vehicle.airConditioning}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2 col-span-2 sm:col-span-1">
                      <FAIcon name="fa-solid fa-gears" size={13} color="#1A3A6A" />
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-semibold block">Transmission</span>
                        <span className="font-bold text-slate-800 truncate block max-w-[130px]" title={vehicle.transmission}>
                          {vehicle.transmission}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {vehicle.description}
                  </p>

                  {/* Ideal For Highlight Box */}
                  <div className="bg-[#1A3A6A]/5 border border-[#1A3A6A]/15 rounded-2xl p-3.5 mb-5">
                    <div className="flex items-start gap-2.5">
                      <FAIcon name="fa-solid fa-circle-check" size={14} color="#1A3A6A" className="mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-extrabold text-[#1A3A6A] block">
                          Usage recommandé :
                        </span>
                        <p className="text-xs text-slate-700 leading-normal mt-0.5">
                          {vehicle.idealFor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Equipments List */}
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Équipements & Sécurité embarquée :
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {vehicle.keyEquipments.map((eq, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1A3A6A]" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('services', 'simulateur')}
                    className="w-full sm:flex-1 bg-[#1A3A6A] hover:bg-[#234c89] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <FAIcon name="fa-solid fa-calculator" size={12} />
                    <span>Estimer mon budget</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppInquiry(vehicle.name, vehicle.categoryLabel)}
                    className="w-full sm:flex-1 bg-white hover:bg-slate-50 text-[#1A3A6A] border border-[#1A3A6A] py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <FAIcon name="fa-brands fa-whatsapp" size={14} color="#25D366" />
                    <span>Demander disponibilité</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
    </section>
  );
};
