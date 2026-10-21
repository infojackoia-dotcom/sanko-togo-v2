export type PageId =
  | 'accueil'
  | 'a-propos'
  | 'services'
  | 'blog'
  | 'contact'
  | 'politique-confidentialite'
  | 'conditions-generales';

export type VehicleTypeId =
  | 'berline-yaris'
  | 'berline-corolla'
  | 'berline-avensis'
  | 'suv-rav4'
  | 'suv-prado'
  | 'pickup-hilux'
  | 'bus-15'
  | 'bus-30'
  | 'berline'
  | 'suv'
  | '4x4'
  | 'minibus'
  | 'citadine'
  | 'utilitaire';

export interface PricingGridRates {
  lome: {
    tier1: number; // 0 à 3 mois (FCFA / jour)
    tier2: number; // 3 mois à 2 ans (FCFA / jour)
    tier3: number; // Plus de 2 ans (FCFA / jour)
  };
  horsLome: {
    tier1: number | null; // 0 à 3 mois (FCFA / jour)
    tier2: number | null; // 3 mois à 2 ans
    tier3: number | null; // Plus de 2 ans
  };
}

export interface VehicleOption {
  id: VehicleTypeId;
  name: string;
  categoryName: string;
  description: string;
  faIcon: string;
  baseDailyRate: number; // Forfait de base FCFA / jour (0 à 3 mois à Lomé)
  baseMonthlyRate: number; // Base mensuelle indicative (30 jours)
  rates: PricingGridRates;
  allowsHorsLome: boolean;
}

export type RentalType = 'courte' | 'moyenne' | 'longue';
export type UsageZone = 'ville' | 'interieur';

export interface SimulationState {
  vehicleType: VehicleTypeId;
  rentalType: RentalType;
  duration: number; // jours si courte, mois si moyenne/longue
  zone: UsageZone;
  withDriver: boolean;
  overnightStays?: number;
  prospectName?: string;
  prospectOrg?: string;
}

export interface SimulationResult {
  minPrice: number;
  maxPrice: number;
  currency: string;
  formattedRange: string;
  summaryText: string;
  whatsAppMessage: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  image: string;
}
