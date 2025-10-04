import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  VisaFormState, GeneralStepData, AncestryStepData, EducationStepData, 
  FamilyStepData, WorkStepData, MoneyStepData 
} from '../types/steps'; 

const initialState: VisaFormState = {
  // GeneralStepData
  nationality: [], age: null, homeSize: null, bedrooms: null, regions: [],
  
  // AncestryStepData
  hasAncestry: false, relatives: [{ relative: "", passport: "" }],

  // EducationStepData
  highestLevel: "", field: "", interestedInEducationVisa: false, educationFields: "",

  // FamilyStepData
  hasPartner: "No", partnerNationality: [], hasChildren: false,
  
  // WorkStepData
  remoteWork: "No", passiveIncome: null, jobType: "", monthlyIncome: null, interestedInBusinessVisa: false,

  // MoneyStepData
  interestedInInvestmentVisa: false, savings: null,

  // Step tracking
  currentStep: 0,
};

const formSlice = createSlice({
  name: 'visaForm',
  initialState,
  reducers: {
    // Reducers for updating each step's data
    updateGeneralStep: (state, action: PayloadAction<GeneralStepData>) => {
      Object.assign(state, action.payload);
    },
    updateAncestryStep: (state, action: PayloadAction<AncestryStepData>) => {
      Object.assign(state, action.payload);
    },
    updateEducationStep: (state, action: PayloadAction<EducationStepData>) => {
      Object.assign(state, action.payload);
    },
    updateFamilyStep: (state, action: PayloadAction<FamilyStepData>) => {
      Object.assign(state, action.payload);
    },
    updateWorkStep: (state, action: PayloadAction<WorkStepData>) => {
      Object.assign(state, action.payload);
    },
    updateMoneyStep: (state, action: PayloadAction<MoneyStepData>) => {
      Object.assign(state, action.payload);
    },

    // Reducers for navigation
    nextStep: (state) => {
        state.currentStep += 1;
    },
    previousStep: (state) => {
        state.currentStep -= 1;
    },
    resetForm: () => initialState,
  },
});

export const { 
  updateGeneralStep, updateAncestryStep, updateEducationStep, 
  updateFamilyStep, updateWorkStep, updateMoneyStep, 
  nextStep, previousStep, resetForm 
} = formSlice.actions;

export default formSlice.reducer;