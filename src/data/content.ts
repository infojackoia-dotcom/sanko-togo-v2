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
 * SIMULATEUR DE BUDGET — TARIFS DE BASE & COEFFICIENTS
 * Ces variables peuvent être facilement modifiées selon votre grille tarifaire réelle.
 * Les montants sont exprimés en FCFA.
 */
export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'suv',
    name: 'SUV',
    categoryName: 'Polyvalent & Confortable',
    description: 'Excellente visibilité et robustesse pour la ville et les axes régionaux.',
    faIcon: 'fa-solid fa-car',
    baseDailyRate: 65000,     // 65 000 FCFA / jour
    baseMonthlyRate: 1200000, // 1 200 000 FCFA / mois
  },
  {
    id: 'berline',
    name: 'Berline',
    categoryName: 'Confort & Exécutif',
    description: 'Idéale pour le transport des directeurs de mission, cadres et délégations.',
    faIcon: 'fa-solid fa-car-side',
    baseDailyRate: 50000,    // 50 000 FCFA / jour
    baseMonthlyRate: 950000, // 950 000 FCFA / mois
  },
  {
    id: '4x4',
    name: '4x4',
    categoryName: 'Tout-terrain & Terrain difficile',
    description: 'Indispensable pour les missions de terrain et les visites à l\'intérieur du pays.',
    faIcon: 'fa-solid fa-truck-pickup',
    baseDailyRate: 85000,     // 85 000 FCFA / jour
    baseMonthlyRate: 1650000, // 1 650 000 FCFA / mois
  },
  {
    id: 'minibus',
    name: 'Minibus (15 places)',
    categoryName: 'Transport de groupe / Délégation (15 places)',
    description: 'Capacité exclusive de 15 places assises climatisées pour ateliers, conférences, transferts et missions d\'équipes.',
    faIcon: 'fa-solid fa-van-shuttle',
    baseDailyRate: 95000,     // 95 000 FCFA / jour
    baseMonthlyRate: 1850000, // 1 850 000 FCFA / mois
  },
];

/**
 * LOGIQUE DU CALCUL DU SIMULATEUR
 */
export const SIMULATOR_COEFFICIENTS = {
  // Coefficient selon la zone d'utilisation
  zone: {
    ville: 1.0,        // Lomé : coefficient standard
    interieur: 1.25,   // Intérieur du pays : +25% (usure, assistance renforcée)
  },
  // Coût du chauffeur
  driverDailyCost: 15000,     // 15 000 FCFA / jour
  driverMonthlyCost: 250000,  // 250 000 FCFA / mois
  // Marge indicative de fourchette (+/- 10%)
  rangeTolerance: 0.10,
};

/**
 * Calcul de l'estimation de budget
 */
export function calculateEstimate(
  vehicleId: VehicleOption['id'],
  rentalType: 'courte' | 'moyenne' | 'longue',
  duration: number,
  zone: 'ville' | 'interieur',
  withDriver: boolean
) {
  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];
  const zoneCoeff = SIMULATOR_COEFFICIENTS.zone[zone] || 1.0;

  let baseAmount = 0;
  let driverTotal = 0;

  if (rentalType === 'courte') {
    // Calcul au jour
    const days = Math.max(1, duration);
    baseAmount = vehicle.baseDailyRate * days * zoneCoeff;
    if (withDriver) {
      driverTotal = SIMULATOR_COEFFICIENTS.driverDailyCost * days;
    }
  } else if (rentalType === 'moyenne') {
    // 1 à 6 mois : remise de volume 5%
    const months = Math.max(1, duration);
    const monthlyRateDiscounted = vehicle.baseMonthlyRate * 0.95;
    baseAmount = monthlyRateDiscounted * months * zoneCoeff;
    if (withDriver) {
      driverTotal = SIMULATOR_COEFFICIENTS.driverMonthlyCost * months;
    }
  } else {
    // Longue durée (6 mois et plus) : remise de volume 12%
    const months = Math.max(6, duration);
    const monthlyRateDiscounted = vehicle.baseMonthlyRate * 0.88;
    baseAmount = monthlyRateDiscounted * months * zoneCoeff;
    if (withDriver) {
      driverTotal = SIMULATOR_COEFFICIENTS.driverMonthlyCost * months;
    }
  }

  const medianAmount = baseAmount + driverTotal;
  const minPrice = Math.round((medianAmount * (1 - SIMULATOR_COEFFICIENTS.rangeTolerance)) / 1000) * 1000;
  const maxPrice = Math.round((medianAmount * (1 + SIMULATOR_COEFFICIENTS.rangeTolerance)) / 1000) * 1000;

  const formatter = new Intl.NumberFormat('fr-FR');
  const formattedRange = `${formatter.format(minPrice)} — ${formatter.format(maxPrice)} FCFA`;

  return {
    vehicle,
    minPrice,
    maxPrice,
    formattedRange,
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
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
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
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
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
