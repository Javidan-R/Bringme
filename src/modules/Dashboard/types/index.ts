

// src/modules/Dashboard/types.ts
export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface Visa {
  id: string;
  countryId: string;
  country: string;
  visaName: string;
  flag: string;
  duration: string;
  visaType: "digital" | "investment" | "freelance";
  workRights: boolean;
  permanentResidency: boolean;
  requirements: string[];
}

export interface LayoutContext {
  selectedCountries: Country[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<Country[]>>;
}
// SelectedPackage interface is already in DashboardLayout.tsx

export interface VisaCost {
  label: string;
  description: string;
  amount: string;
}

export interface VisaProcessStep {
  step: number;
  description: string;
}

export interface VisaDetails {
  id: string;
  countryId: string;
  country: string;
  visaName: string;
  flag: string;
  duration: string;
  visaType: string;
  workRights: boolean;
  permanentResidency: boolean;
  requirements: string[];
  costs?: VisaCost[];
  process?: VisaProcessStep[];
  details?: {
    duration: string;
    workRights: string;
    residency: string;
  };
}

// src/modules/Dashboard/types.ts

export interface CostDetail {
  label: string;
  description: string;
  amount: string;
}

export interface ProcessStep {
  step: number;
  description: string;
}

export interface VisaDetails {
  id: string;
  countryId: string;
  country: string;
  visaName: string;
  flag: string;
  duration: string;
  // visaType: 'digital' | 'investment' | 'freelance'; // Typelər genişlədildi
  workRights: boolean;
  permanentResidency: boolean;
  requirements: string[];
  
  // Modal üçün əlavə detallar
  costs?: CostDetail[];
  process?: ProcessStep[];
  details?: {
    duration: string;
    workRights: string;
    residency: string;
  }
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  visas: VisaDetails[];
    cities: string[]; 

}

export interface SelectedPackage {
  id: string;
  title: string;
  credits: number;
  price: number;
  currency: string;
  features: string[];
}

export interface CityData {
  name: string;
  country: string;
  flag: string;
  costs: {
    housing: { label: string; value: string }[];
    food: { label: string; value: string }[];
    transportation: { label: string; value: string }[];
    utilities: { label: string; value: string }[];
    lifestyle: { label: string; value: string }[];
  };
  totalMonthly: string;
}