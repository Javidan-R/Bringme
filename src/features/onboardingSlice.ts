import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {FormData} from "../types/pages"
const initialFormData: FormData = {
  general: {
    nationality: [],
    age: null,
    homeSize: null,
    bedrooms: null,
    regions: [],
  },
  family: {
    hasPartner: "",
    partnerNationality: [],
    hasChildren: false,
  },
  education: {
    highestLevel: "",
    field: "",
    interestedInEducationVisa: false,
    educationFields: "",
  },
  work: {
    remoteWork: "",
    passiveIncome: null,
    jobType: "",
    monthlyIncome: null,
    interestedInBusinessVisa: false,
  },
  money: {
    interestedInInvestmentVisa: false,
    savings: null,
  },
  ancestry: {
    hasAncestry: false,
    relatives: [],
  },
};

interface OnboardingState {
  formData: FormData;
  currentStep: number;
}

const initialState: OnboardingState = {
  formData: initialFormData,
  currentStep: 1, // Addımlar 1-dən başlayır
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateFormData: <K extends keyof FormData>(
      state: OnboardingState,
      action: PayloadAction<{
        stepName: K;
        data: Partial<FormData[K]>;
      }>
    ) => {
      state.formData[action.payload.stepName] = {
        ...state.formData[action.payload.stepName],
        ...action.payload.data,
      };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    
    // YENİ: Naviqasiya üçün nextStep action-u
    nextStep: (state) => {
      // Ümumi addım sayının (6) aşılmamasını təmin edir
      if (state.currentStep < 6) { 
        state.currentStep += 1;
      }
    },
    
    // YENİ: Naviqasiya üçün previousStep action-u
    previousStep: (state) => {
      // Addımın 1-dən aşağı düşməməsini təmin edir
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    
    resetFormData: (state) => {
      state.formData = initialFormData;
      state.currentStep = 1;
    },
  },
});

export const { updateFormData, setCurrentStep, resetFormData, nextStep, previousStep } = onboardingSlice.actions;
export default onboardingSlice.reducer;