import { VehicleOption, BlogPost } from '../types';

/**
 * CONFIGURATION GÉNÉRALE, EMAIL & WHATSAPP
 * Vous pouvez modifier le numéro de téléphone et les adresses ici :
 */
export const SITE_CONFIG = {
  email: 'officetg@sankosarl.com',
  companyName: 'SANKO TOGO',
  address: 'Boulevard Jean-Paul II, Nukafu – Lomé',
};

export const WHATSAPP_CONFIG = {
  phone: '22897513636', // Format international sans '+' pour wa.me (Togo +228 97 51 36 36)
  displayPhone: '+228 97 51 36 36',
  defaultMessage: 'Bonjour SANKO TOGO, je souhaite discuter de nos besoins de mobilité avec vous.',
};

/**
 * SIMULATEUR DE BUDGET — GRILLE TARIFAIRE OFFICIELLE SANKO SARL
 * Tarifs journaliers (F CFA) applicables à Lomé et Hors Lomé.
 * Chauffeur professionnel inclus dans le forfait journalier.
 */
export const CHAUFFEUR_OVERNIGHT_COST = 15000; // Hébergement / Nuitée chauffeur hors Lomé : 15 000 F CFA

/**
 * TARIFS MENSUELS FIXES — Moyenne durée (tier2) et Longue durée (tier3)
 * Ces montants s'appliquent directement par mois, sans calcul journalier.
 * Catégories : berline | suv | 4x4
 */
export const MONTHLY_RATES: Record<string, { tier2: number; tier3: number }> = {
  berline: { tier2: 900_000, tier3: 800_000 },
  suv:     { tier2: 1_200_000, tier3: 1_000_000 },
  '4x4':   { tier2: 2_000_000, tier3: 1_600_000 },
};

/** Détermine la catégorie mensuelle à partir de l'id du véhicule */
function getMonthlyCategory(vehicleId: string): keyof typeof MONTHLY_RATES {
  if (vehicleId.startsWith('berline')) return 'berline';
  if (vehicleId === 'suv-rav4') return 'suv';
  // suv-prado, pickup-hilux → 4x4
  return '4x4';
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'berline-yaris',
    name: 'Berline / Yaris ou similaires',
    categoryName: 'Économique & Urbain (Lomé)',
    description: 'Idéale pour les déplacements administratifs et courses urbaines dans le Grand Lomé.',
    faIcon: 'fa-solid fa-car-side',
    baseDailyRate: 35000,
    baseMonthlyRate: 35000 * 30,
    allowsHorsLome: false,
    rates: {
      lome: { tier1: 35000, tier2: 30000, tier3: 25000 },
      horsLome: { tier1: null, tier2: null, tier3: null },
    },
  },
  {
    id: 'berline-corolla',
    name: 'Berline / Corolla ou similaires',
    categoryName: 'Confort & Affaires (Lomé)',
    description: 'Confort climatisé éprouvé et standing sobre pour directeurs, cadres et consultants.',
    faIcon: 'fa-solid fa-car-side',
    baseDailyRate: 45000,
    baseMonthlyRate: 45000 * 30,
    allowsHorsLome: false,
    rates: {
      lome: { tier1: 45000, tier2: 40000, tier3: 35000 },
      horsLome: { tier1: null, tier2: null, tier3: null },
    },
  },
  {
    id: 'berline-avensis',
    name: 'Berline / Avensis',
    categoryName: 'Exécutive & Protocole (Lomé)',
    description: 'Espace intérieur haut de gamme pour délégations officielles et accueil de personnalités.',
    faIcon: 'fa-solid fa-car-side',
    baseDailyRate: 65000,
    baseMonthlyRate: 65000 * 30,
    allowsHorsLome: false,
    rates: {
      lome: { tier1: 65000, tier2: 50000, tier3: 40000 },
      horsLome: { tier1: null, tier2: null, tier3: null },
    },
  },
  {
    id: 'suv-rav4',
    name: 'SUV / RAV 4 ou RUSH',
    categoryName: 'Polyvalent & Moderne',
    description: 'Garde au sol surélevée, confort et adaptabilité aussi bien à Lomé qu\'en région.',
    faIcon: 'fa-solid fa-car',
    baseDailyRate: 45000,
    baseMonthlyRate: 45000 * 30,
    allowsHorsLome: true,
    rates: {
      lome: { tier1: 45000, tier2: 40000, tier3: 30000 },
      horsLome: { tier1: 50000, tier2: 45000, tier3: 35000 },
    },
  },
  {
    id: 'suv-prado',
    name: 'TOYOTA PRADO / FORTUNER',
    categoryName: 'Grand 4x4 / Prestige & Tout-terrain',
    description: 'Le standard d\'excellence pour chefs de mission, accès terrain et sécurité maximale.',
    faIcon: 'fa-solid fa-shield-halved',
    baseDailyRate: 75000,
    baseMonthlyRate: 75000 * 30,
    allowsHorsLome: true,
    rates: {
      lome: { tier1: 75000, tier2: 70000, tier3: 55000 },
      horsLome: { tier1: 80000, tier2: 70000, tier3: 60000 },
    },
  },
  {
    id: 'pickup-hilux',
    name: 'TOYOTA HILUX (Pick-up)',
    categoryName: 'Pick-up 4x4 Tout-terrain',
    description: 'Robustesse légendaire sur pistes difficiles, logistique d\'équipement et chantiers terrain.',
    faIcon: 'fa-solid fa-truck-pickup',
    baseDailyRate: 55000,
    baseMonthlyRate: 55000 * 30,
    allowsHorsLome: true,
    rates: {
      lome: { tier1: 55000, tier2: 50000, tier3: 45000 },
      horsLome: { tier1: 55000, tier2: 50000, tier3: 45000 },
    },
  },
  {
    id: 'bus-15',
    name: 'BUS _ 15 places',
    categoryName: 'Minibus / Équipes & Ateliers (15 places)',
    description: '15 places assises climatisées avec chauffeur pour ateliers régionaux et transferts d\'équipes.',
    faIcon: 'fa-solid fa-van-shuttle',
    baseDailyRate: 70000,
    baseMonthlyRate: 70000 * 30,
    allowsHorsLome: true,
    rates: {
      lome: { tier1: 70000, tier2: 65000, tier3: 50000 },
      horsLome: { tier1: 70000, tier2: 65000, tier3: 50000 },
    },
  },
  {
    id: 'bus-30',
    name: 'BUS _ 30 places',
    categoryName: 'Autocar / Conférences & Groupes (30 places)',
    description: '30 places assises avec chauffeur pour grands séminaires, voyages d\'études et délégations.',
    faIcon: 'fa-solid fa-bus',
    baseDailyRate: 115000,
    baseMonthlyRate: 115000 * 30,
    allowsHorsLome: true,
    rates: {
      lome: { tier1: 115000, tier2: 110000, tier3: 105000 },
      horsLome: { tier1: 120000, tier2: 115000, tier3: 110000 },
    },
  },
];

/**
 * Helper de compatibilité pour retrouver un véhicule même avec les anciens identifiants génériques
 */
export function resolveVehicle(vehicleId: VehicleOption['id']): VehicleOption {
  if (vehicleId === 'berline') {
    return VEHICLE_OPTIONS.find((v) => v.id === 'berline-corolla') || VEHICLE_OPTIONS[1];
  }
  if (vehicleId === 'suv') {
    return VEHICLE_OPTIONS.find((v) => v.id === 'suv-rav4') || VEHICLE_OPTIONS[3];
  }
  if (vehicleId === '4x4') {
    return VEHICLE_OPTIONS.find((v) => v.id === 'suv-prado') || VEHICLE_OPTIONS[4];
  }
  if (vehicleId === 'minibus') {
    return VEHICLE_OPTIONS.find((v) => v.id === 'bus-15') || VEHICLE_OPTIONS[6];
  }
  return VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[4]; // Default to Prado
}

export interface EstimateResult {
  vehicle: VehicleOption;
  tierKey: 'tier1' | 'tier2' | 'tier3';
  tierLabel: string;
  appliedDailyRate: number;
  duration: number;
  durationUnit: 'jours' | 'mois';
  rentalTotal: number;
  overnightStays: number;
  overnightDailyRate: number;
  overnightTotal: number;
  totalAmount: number;
  minPrice: number;
  maxPrice: number;
  formattedRange: string;
  formattedTotal: string;
  formattedDailyRate: string;
  formattedMonthlyEquivalent?: string;
  isHorsLomeNotRecommended: boolean;
}

/**
 * Calcul exact du budget d'après la grille tarifaire officielle de SANKO SARL
 * - Applique les forfaits journaliers selon la zone (Lomé vs Hors Lomé)
 * - Tient compte de la dégressivité de durée (0 à 3 mois, 3 mois à 2 ans, Plus de 2 ans)
 * - Calcule l'hébergement / nuitée du chauffeur si mission hors Lomé (15 000 F CFA / nuitée)
 */
export function calculateEstimate(
  vehicleId: VehicleOption['id'],
  rentalType: 'courte' | 'moyenne' | 'longue',
  duration: number,
  zone: 'ville' | 'interieur',
  withDriver: boolean = true,
  overnightStays: number = 0
): EstimateResult {
  const vehicle = resolveVehicle(vehicleId);
  const isHorsLome = zone === 'interieur';
  const isHorsLomeNotRecommended = isHorsLome && !vehicle.allowsHorsLome;

  let tierKey: 'tier1' | 'tier2' | 'tier3' = 'tier1';
  let tierLabel = '0 à 3 mois';

  if (rentalType === 'courte') {
    tierKey = 'tier1';
    tierLabel = '0 à 3 mois';
  } else if (rentalType === 'moyenne') {
    tierKey = 'tier2';
    tierLabel = '3 mois à 2 ans';
  } else {
    tierKey = 'tier3';
    tierLabel = 'Plus de 2 ans';
  }

  // Tarif journalier appliqué d'après la grille officielle
  let appliedDailyRate: number;
  if (isHorsLome && vehicle.rates.horsLome[tierKey] !== null) {
    appliedDailyRate = vehicle.rates.horsLome[tierKey]!;
  } else {
    appliedDailyRate = vehicle.rates.lome[tierKey];
  }

  let rentalTotal = 0;
  let formattedMonthlyEquivalent: string | undefined = undefined;
  const durationUnit: 'jours' | 'mois' = rentalType === 'courte' ? 'jours' : 'mois';

  const formatter = new Intl.NumberFormat('fr-FR');

  if (rentalType === 'courte') {
    const days = Math.max(1, duration);
    rentalTotal = appliedDailyRate * days;
  } else {
    // Tarifs mensuels fixes selon la grille officielle (moyenne / longue durée)
    const months = Math.max(1, duration);
    const cat = getMonthlyCategory(vehicle.id);
    // Bus : pas de grille mensuelle fixe → fallback journalier × 30
    let monthlyRate: number;
    if (cat === 'berline' || cat === 'suv' || cat === '4x4') {
      const tierKey2 = rentalType === 'moyenne' ? 'tier2' : 'tier3';
      monthlyRate = MONTHLY_RATES[cat][tierKey2];
    } else {
      monthlyRate = appliedDailyRate * 30;
    }
    rentalTotal = monthlyRate * months;
    formattedMonthlyEquivalent = `${formatter.format(monthlyRate)} FCFA / mois`;
  }

  // Hébergement chauffeur si hors Lomé
  const validOvernightStays = isHorsLome ? Math.max(0, overnightStays) : 0;
  const overnightTotal = validOvernightStays * CHAUFFEUR_OVERNIGHT_COST;

  const totalAmount = rentalTotal + overnightTotal;

  return {
    vehicle,
    tierKey,
    tierLabel,
    appliedDailyRate,
    duration,
    durationUnit,
    rentalTotal,
    overnightStays: validOvernightStays,
    overnightDailyRate: CHAUFFEUR_OVERNIGHT_COST,
    overnightTotal,
    totalAmount,
    minPrice: totalAmount,
    maxPrice: totalAmount,
    formattedRange: `${formatter.format(totalAmount)} FCFA`,
    formattedTotal: `${formatter.format(totalAmount)} FCFA`,
    formattedDailyRate: `${formatter.format(appliedDailyRate)} FCFA / jour`,
    formattedMonthlyEquivalent,
    isHorsLomeNotRecommended,
  };
}

/**
 * ARTICLES DE BLOG
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'lld-vs-gestion-parc',
    title: 'Comment bien choisir entre location longue durée et gestion de parc pour votre organisation',
    category: 'Location longue durée',
    excerpt: 'Comprendre les différences structurelles, financières et opérationnelles pour orienter la décision de vos comités de direction et services achats.',
    date: '14 Mai 2026',
    readTime: '6 min de lecture',
    image: '/gallery/parc-automobile-sanko.jpg',
    content: [
      "Pour une organisation internationale, une ambassade ou une ONG opérant au Togo, la question de la mobilité dépasse le simple transport : elle touche à la pérennité budgétaire, à la sécurité du personnel et à la conformité administrative.",
      "La Location Longue Durée (LLD) permet de déléguer l'ensemble du risque matériel et financier au loueur : les véhicules sont récents, assurés tous risques, régulièrement renouvelés, et le budget mensuel reste constant tout au long du contrat sans immobilisation de trésorerie.",
      "La Gestion de Parc, quant à elle, s'adresse principalement aux structures qui disposent déjà de leur propre flotte de véhicules mais souhaitent confier l'entretien préventif, les contrôles techniques, les négociations assurances et la gestion des chauffeurs à un expert externe.",
      "Avant d'arbitrer, il convient d'analyser l'horizon de vos programmes de développement, le niveau d'amortissement de votre parc existant et la disponibilité de vos équipes logistiques internes."
    ]
  },
  {
    id: 'criteres-selection-prestataire-ong',
    title: '5 critères pour sélectionner un prestataire de location de véhicules pour une ONG au Togo',
    category: 'Mobilité pour ONG & organisations internationales',
    excerpt: 'Conformité aux audits bailleurs, réactivité en cas de panne terrain, flexibilité contractuelle : la grille d\'évaluation indispensable.',
    date: '28 Avril 2026',
    readTime: '5 min de lecture',
    image: '/gallery/hilux-front-road.jpg',
    content: [
      "Les équipes d'achats et de logistique des ONG internationales répondent à des règles d'audit très strictes dictées par leurs bailleurs de fonds (USAID, Union Européenne, AFD, agences onusiennes). Choisir un prestataire local nécessite une vigilance accrue sur plusieurs points cardinaux.",
      "1. La conformité administrative et fiscale : disposer d'un RCCM valide, d'un NIF à jour, de factures aux normes et d'une traçabilité irréprochable des paiements.",
      "2. L'état technique de la flotte : des véhicules 4x4 régulièrement entretenus avec carnet d'entretien à l'appui, équipés d'accessoires de sécurité (roue de secours vérifiée, trousse de secours, extincteur à jour).",
      "3. L'assistance et le remplacement en cas d'aléa : la capacité à dépêcher un véhicule de remplacement rapidement, même lors d'une mission dans les savanes ou la région centrale.",
      "4. La qualification des chauffeurs : maîtrise de la conduite défensive, discrétion professionnelle et respect des protocoles de sécurité humanitaire.",
      "5. La souplesse contractuelle : la possibilité d'adapter la durée de location au rythme des financements sans pénalités disproportionnées."
    ]
  },
  {
    id: 'mobilite-lome-organisations',
    title: 'Mobilité professionnelle à Lomé : ce que les organisations internationales doivent savoir',
    category: 'Conseils & réglementation (Togo)',
    excerpt: 'Trafic urbain, exigences protocolaires, réglementation locale et gestion de crise : le guide pratique pour vos équipes en poste.',
    date: '10 Avril 2026',
    readTime: '4 min de lecture',
    image: '/gallery/corolla-cross-road.jpg',
    content: [
      "Carrefour diplomatique et économique majeur en Afrique de l'Ouest, Lomé concentre de nombreuses représentations diplomatiques, sièges régionaux et délégations temporaires.",
      "Pour assurer une mobilité fluide entre le quartier administratif, la zone portuaire et les représentations consulaires, l'anticipation des pics de trafic et la parfaite connaissance des axes de délestage sont déterminantes.",
      "La sécurité routière et la disponibilité constante d'un service de conciergerie automobile garantissent à vos équipes une sérénité totale durant leurs missions officielles.",
      "Sanko Togo déploie un dispositif de suivi en temps réel et des chauffeurs formés aux protocoles institutionnels pour répondre à ce niveau d'exigence."
    ]
  }
];

/**
 * CLIENTS & ORGANISATIONS
 */
export const CLIENT_LOGOS = [
  { name: 'Système des Nations Unies', subtitle: 'Agences Onusiennes' },
  { name: 'ONG Internationale Humanitaire', subtitle: 'Programmes Terrain' },
  { name: 'Institution Financière de Développement', subtitle: 'Afrique de l\'Ouest' },
  { name: 'Opérateur Télécom Régional', subtitle: 'Infrastructures & Réseau' },
  { name: 'Ambassade & Mission Diplomatique', subtitle: 'Affaires Étrangères' },
  { name: 'Université & Pôle Académique', subtitle: 'Recherche & Coopération' },
];

/**
 * FAQ SERVICES
 */
export const FAQ_ITEMS = [
  {
    question: 'Quels types de contrats proposez-vous ?',
    answer: 'Nous adaptons chaque contrat à la durée et à la nature de votre mission, de la courte à la longue durée.'
  },
  {
    question: 'Quel est le délai de mise à disposition d\'un véhicule ?',
    answer: '[à préciser] — en général, nous répondons rapidement aux demandes urgentes.'
  },
  {
    question: 'Quelles zones couvrez-vous ?',
    answer: 'Nous intervenons à Lomé comme à l\'intérieur du pays.'
  },
  {
    question: 'Proposez-vous des chauffeurs professionnels ?',
    answer: 'Oui, le chauffeur professionnel est obligatoire et systématiquement inclus pour l\'ensemble de nos offres de location.'
  },
  {
    question: 'Quels documents sont nécessaires pour signer un contrat ?',
    answer: '[à préciser selon vos process internes]'
  },
  {
    question: 'Travaillez-vous avec les procédures d\'achat des organisations internationales ?',
    answer: 'Oui, nous avons l\'habitude des exigences administratives des agences UN, ONG et institutions.'
  }
];
