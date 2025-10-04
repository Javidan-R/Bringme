// src/features/onboarding/slice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  VisaFormState, GeneralStepData, AncestryStepData, EducationStepData, 
  FamilyStepData, WorkStepData, MoneyStepData 
} from "./types/steps";

const initialState: VisaFormState = {
  nationality: [], 
  age: null, 
  homeSize: null, 
  bedrooms: null, 
  regions: [],
  hasAncestry: false, 
  relatives: [],
  highestLevel: "", 
  field: "", 
  interestedInEducationVisa: false, 
  educationFields: "",
  hasPartner: "", 
  partnerNationality: [], 
  hasChildren: false,
  remoteWork: "", 
  passiveIncome: null, 
  jobType: "", 
  monthlyIncome: null, 
  interestedInBusinessVisa: false,
  interestedInInvestmentVisa: false, 
  savings: null,
  currentStep: 1,
  isLoading: false,
  error: null,
};

// Async thunk for saving form data (if needed for API)
export const saveFormData = createAsyncThunk(
  'visaForm/saveFormData',
  async (formData: Partial<VisaFormState>, { rejectWithValue }) => {
    try {
      // API call would go here
      // const response = await api.saveFormData(formData);
      // return response.data;
      return formData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: 'visaForm',
  initialState,
  reducers: {
    updateGeneralStep: (state, action: PayloadAction<GeneralStepData>) => {
      state.nationality = action.payload.nationality;
      state.age = action.payload.age;
      state.homeSize = action.payload.homeSize;
      state.bedrooms = action.payload.bedrooms;
      state.regions = action.payload.regions;
      state.error = null;
    },
    updateAncestryStep: (state, action: PayloadAction<AncestryStepData>) => {
      state.hasAncestry = action.payload.hasAncestry;
      state.relatives = action.payload.relatives;
      state.error = null;
    },
    updateEducationStep: (state, action: PayloadAction<EducationStepData>) => {
      state.highestLevel = action.payload.highestLevel;
      state.field = action.payload.field;
      state.interestedInEducationVisa = action.payload.interestedInEducationVisa;
      state.educationFields = action.payload.educationFields;
      state.error = null;
    },
    updateFamilyStep: (state, action: PayloadAction<FamilyStepData>) => {
      state.hasPartner = action.payload.hasPartner;
      state.partnerNationality = action.payload.partnerNationality;
      state.hasChildren = action.payload.hasChildren;
      state.error = null;
    },
    updateWorkStep: (state, action: PayloadAction<WorkStepData>) => {
      state.remoteWork = action.payload.remoteWork;
      state.passiveIncome = action.payload.passiveIncome;
      state.jobType = action.payload.jobType;
      state.monthlyIncome = action.payload.monthlyIncome;
      state.interestedInBusinessVisa = action.payload.interestedInBusinessVisa;
      state.error = null;
    },
    updateMoneyStep: (state, action: PayloadAction<MoneyStepData>) => {
      state.interestedInInvestmentVisa = action.payload.interestedInInvestmentVisa;
      state.savings = action.payload.savings;
      state.error = null;
    },
    nextStep: (state) => {
      state.currentStep += 1;
      state.error = null;
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
      state.error = null;
    },
    setStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        state.currentStep = action.payload;
      }
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFormData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveFormData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveFormData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  updateGeneralStep, updateAncestryStep, updateEducationStep, 
  updateFamilyStep, updateWorkStep, updateMoneyStep, 
  nextStep, previousStep, setStep, setError, clearError, resetForm 
} = formSlice.actions;

export default formSlice.reducer;