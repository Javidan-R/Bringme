export interface Relative {
  relative: string;
  passport: string;
}

export interface AncestryStepData {
  hasAncestry: boolean;
  relatives: Relative[];
}

export interface EducationStepData {
  highestLevel: string;
  field: string;
  interestedInEducationVisa: boolean;
  educationFields: string;
}

export interface FamilyStepData {
  hasPartner: string; // "Yes, and we're legally married" | "Yes, but we're not legally married" | "No"
  partnerNationality: string[];
  hasChildren: boolean;
}

export interface GeneralStepData {
  nationality: string[];
  age: number | null;
  homeSize: number | null;
  bedrooms: number | null;
  regions: string[];
}

export interface MoneyStepData {
  interestedInInvestmentVisa: boolean;
  savings: number | null;
}

export interface WorkStepData {
  remoteWork: string; // "Yes" | "No" | "Retired"
  passiveIncome: number | null;
  jobType: string;
  monthlyIncome: number | null;
  interestedInBusinessVisa: boolean;
}
export interface StepRTKProps {
    isFirstStep: boolean;
    isLastStep: boolean;
}

// Interface for the combined Redux State
export interface VisaFormState extends GeneralStepData, AncestryStepData, EducationStepData, FamilyStepData, WorkStepData, MoneyStepData {
    currentStep: number;
}