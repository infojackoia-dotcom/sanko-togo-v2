export type PageId =
  | 'accueil'
  | 'a-propos'
  | 'services'
  | 'blog'
  | 'contact'
  | 'politique-confidentialite'
  | 'conditions-generales';

export type VehicleTypeId = 'citadine' | 'berline' | 'suv' | '4x4' | 'minibus' | 'utilitaire';

export interface VehicleOption {
  id: VehicleTypeId;
  name: string;
  categoryName: string;
  description: string;
  faIcon: string;
  baseDailyRate: number; // Base rate in FCFA per day
  baseMonthlyRate: number; // Base rate in FCFA per month
}

export type RentalType = 'courte' | 'moyenne' | 'longue';
export type UsageZone = 'ville' | 'interieur';

export interface SimulationState {
  vehicleType: VehicleTypeId;
  rentalType: RentalType;
  duration: number; // days if courte, months if moyenne/longue
  zone: UsageZone;
  withDriver: boolean;
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
