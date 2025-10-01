// src/features/onboardingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  general: {
    nationality: string[];
    age: number | null;
    homeSize: number | null;
    bedrooms: number | null;
    regions: string[];
  };
  family: {
    hasPartner: string;
    partnerNationality: string[];
    hasChildren: boolean;
  };
  education: {
    highestLevel: string;
    field: string;
    interestedInEducationVisa: boolean;
    educationFields: string;
  };
  work: {
    remoteWork: string;
    passiveIncome: number | null;
    jobType: string;
    monthlyIncome: number | null;
    interestedInBusinessVisa: boolean;
  };
  money: {
    interestedInInvestmentVisa: boolean;
    savings: number | null;
  };
  ancestry: {
    hasAncestry: boolean;
    relatives: { relative: string; passport: string }[];
  };
}

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
  currentStep: 1,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // Use a generic type to ensure stepName and data match
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
    resetFormData: (state) => {
      state.formData = initialFormData;
      state.currentStep = 1;
    },
  },
});

export const { updateFormData, setCurrentStep, resetFormData } = onboardingSlice.actions;
export default onboardingSlice.reducer;