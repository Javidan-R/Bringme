// src/features/onboarding/components/GeneralStep.tsx
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavigationButtons } from "../../../shared/components/complex";
import { generalStepVariants } from "../../../lib/styles";
import { RootState, AppDispatch } from '../../../store';
import { updateGeneralStep, nextStep, previousStep } from "../slice";
import { StepRTKProps } from "../types/steps";
import { MultiSelect } from "../../../shared/components/complex";
import { NumberInput } from "../../../shared/components/common";
import { Info } from "lucide-react";

const REGIONS_OPTIONS = [
  "North America", 
  "South America", 
  "Asia", 
  "Europe", 
  "Africa", 
  "Oceania"
] as const;

const NATIONALITIES_OPTIONS = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "Italy", "Spain", "Portugal", "Netherlands", "Belgium",
  "India", "China", "Japan", "Brazil", "South Africa", "Mexico",
  "Argentina", "New Zealand", "Singapore", "Sweden", "Norway"
] as const;

interface FormErrors {
  nationality?: string;
  age?: string;
  regions?: string;
  general?: string;
}

const GeneralStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
   onNext,
  onPrevious,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxData = useSelector((state: RootState) => state.stepForm);
  
  // Form state
  const [formData, setFormData] = useState({
    nationality: reduxData.nationality || [],
    age: reduxData.age || null,
    homeSize: reduxData.homeSize || null,
    bedrooms: reduxData.bedrooms || null,
    regions: reduxData.regions || [],
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    nationality: false,
    age: false,
    regions: false,
  });

  const styles = generalStepVariants();

  // Sync Redux state with local state
  useEffect(() => {
    setFormData({
      nationality: reduxData.nationality || [],
      age: reduxData.age || null,
      homeSize: reduxData.homeSize || null,
      bedrooms: reduxData.bedrooms || null,
      regions: reduxData.regions || [],
    });
  }, [reduxData]);

  // Validation rules
  const validationRules = useMemo(() => ({
    nationality: (value: string[]) => {
      if (value.length === 0) {
        return "At least one nationality is required";
      }
      return null;
    },
    age: (value: number | null) => {
      if (value === null) {
        return "Age is required";
      }
      if (value < 0 || value > 120) {
        return "Please enter a valid age (0-120)";
      }
      return null;
    },
    regions: (value: string[]) => {
      if (value.length === 0) {
        return "At least one region is required";
      }
      return null;
    },
  }), []);

  // Validate entire form
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    
    const nationalityError = validationRules.nationality(formData.nationality);
    if (nationalityError) newErrors.nationality = nationalityError;
    
    const ageError = validationRules.age(formData.age);
    if (ageError) newErrors.age = ageError;
    
    const regionsError = validationRules.regions(formData.regions);
    if (regionsError) newErrors.regions = regionsError;
    
    return newErrors;
  }, [formData, validationRules]);

  // Validate single field
  const validateField = useCallback((
    fieldName: keyof typeof validationRules,
    value: any
  ): string | null => {
    return validationRules[fieldName](value);
  }, [validationRules]);

  // Handle field change with validation
  const handleFieldChange = useCallback(<K extends keyof typeof formData>(
    field: K,
    value: typeof formData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    if (field in touched) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
    
    // Clear error for this field
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  }, [errors, touched]);

  // Handle nationality change
  const handleNationalityChange = useCallback((value: string[]) => {
    handleFieldChange('nationality', value);
  }, [handleFieldChange]);

  // Handle age change
  const handleAgeChange = useCallback((value: number | null) => {
    handleFieldChange('age', value);
  }, [handleFieldChange]);

  // Handle home size change
  const handleHomeSizeChange = useCallback((value: number | null) => {
    handleFieldChange('homeSize', value);
  }, [handleFieldChange]);

  // Handle bedrooms change
  const handleBedroomsChange = useCallback((value: number | null) => {
    handleFieldChange('bedrooms', value);
  }, [handleFieldChange]);

  // Toggle region selection
  const toggleRegion = useCallback((region: string) => {
    setFormData(prev => {
      const newRegions = prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region];
      return { ...prev, regions: newRegions };
    });
    
    setTouched(prev => ({ ...prev, regions: true }));
    
    if (errors.regions) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.regions;
        return newErrors;
      });
    }
  }, [errors.regions]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    
    // Mark all fields as touched
    setTouched({
      nationality: true,
      age: true,
      regions: true,
    });
    
    // Validate form
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Scroll to first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Dispatch Redux action
      await dispatch(updateGeneralStep({
        nationality: formData.nationality,
        age: formData.age,
        homeSize: formData.homeSize,
        bedrooms: formData.bedrooms,
        regions: formData.regions,
      }))
      
      // Small delay to ensure state is saved
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate to next step
      if (onNext) {
  onNext();
}

      
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ 
        general: "An error occurred while saving. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData, 
    validateForm, 
    dispatch, 
    isSubmitting
  ]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    if (isSubmitting) return;
    
    // Save current data before going back
    dispatch(updateGeneralStep({
      nationality: formData.nationality,
      age: formData.age,
      homeSize: formData.homeSize,
      bedrooms: formData.bedrooms,
      regions: formData.regions,
    }));
    
   if (onPrevious) {
  onPrevious();
}
  }, [dispatch, formData, isSubmitting]);

  // Calculate form completion
  const formCompletion = useMemo(() => {
    let completed = 0;
    const total = 3; // Required fields
    
    if (formData.nationality.length > 0) completed++;
    if (formData.age !== null) completed++;
    if (formData.regions.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  }, [formData]);

  // Info messages
  const getRegionInfo = useMemo(() => {
    if (formData.regions.length === 0) return null;
    return `You've selected ${formData.regions.length} region${formData.regions.length > 1 ? 's' : ''}. This helps us find the best visa options for you.`;
  }, [formData.regions.length]);

  return (
    <div className={styles.outerContainer()}>
      <div className={styles.contentWrapper()}>
        {/* Progress Indicator */}
        {formCompletion < 100 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-800 font-inter">
                  Form completion: {formCompletion}%
                </p>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${formCompletion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-inter">
              {errors.general}
            </p>
          </div>
        )}

        <div className={styles.formGrid()}>
          {/* Nationality Field */}
          <div className={styles.labelColumn()}>
            <label htmlFor="nationality" className={styles.label()}>
              What nationality and passports do you hold?{" "}
              <span className={styles.required()}>*</span>
            </label>
          </div>
          <div className={styles.inputColumn()}>
            <MultiSelect
              id="nationality"
              values={formData.nationality}
              onChange={handleNationalityChange}
              placeholder="Select nationalities"
              options={[...NATIONALITIES_OPTIONS]}
              aria-invalid={touched.nationality && !!errors.nationality}
              aria-describedby={errors.nationality ? "nationality-error" : undefined}
              className={styles.inputBase()}
            />
            {touched.nationality && errors.nationality && (
              <p 
                id="nationality-error" 
                className={styles.errorText()}
                role="alert"
              >
                {errors.nationality}
              </p>
            )}
            {formData.nationality.length > 0 && (
              <p className="text-xs text-gray-600 mt-2 font-inter">
                {formData.nationality.length} nationalit{formData.nationality.length > 1 ? 'ies' : 'y'} selected
              </p>
            )}
          </div>

          {/* Age Field */}
          <div className={styles.labelColumn()}>
            <label htmlFor="age" className={styles.label()}>
              How old are you? <span className={styles.required()}>*</span>
            </label>
          </div>
          <div className={styles.inputColumn()}>
            <NumberInput
              id="age"
              value={formData.age}
              onChange={handleAgeChange}
              placeholder="Enter your age"
              icon={null}
              min={0}
              max={120}
              aria-invalid={touched.age && !!errors.age}
              aria-describedby={errors.age ? "age-error" : undefined}
              className={styles.numberInput()}
            />
            {touched.age && errors.age && (
              <p 
                id="age-error" 
                className={styles.errorText()}
                role="alert"
              >
                {errors.age}
              </p>
            )}
          </div>

          {/* Home Size and Bedrooms */}
          <div className={styles.labelColumn()}>
            <label className={styles.label()}>
              What size home or apartment would you want?
            </label>
            <p className="text-xs text-gray-500 mt-1 font-inter">
              Optional - helps estimate living costs
            </p>
          </div>
          <div className={styles.inputColumn()}>
            <div className={styles.homeSizeRow()}>
              <NumberInput
                value={formData.homeSize}
                onChange={handleHomeSizeChange}
                placeholder="Sq. Footage"
                icon={null}
                min={0}
                className={styles.numberInput()}
              />
              <NumberInput
                value={formData.bedrooms}
                onChange={handleBedroomsChange}
                placeholder="# of Bedrooms"
                icon={null}
                min={0}
                className={styles.numberInput()}
              />
            </div>
          </div>

          {/* Regions Field */}
          <div className={styles.labelColumn()}>
            <label className={styles.label()}>
              What regions are you interested in moving to?{" "}
              <span className={styles.required()}>*</span>
            </label>
          </div>
          <div className={styles.inputColumn()}>
            <div className={styles.regionsButtonsWrapper()}>
              {REGIONS_OPTIONS.map((region) => {
                const isSelected = formData.regions.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={generalStepVariants({ 
                      regionSelected: isSelected 
                    }).regionButton()}
                    aria-pressed={isSelected}
                    aria-label={`${isSelected ? 'Deselect' : 'Select'} ${region} region`}
                    disabled={isSubmitting}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
            {touched.regions && errors.regions && (
              <p 
                id="regions-error" 
                className={styles.errorText()}
                role="alert"
              >
                {errors.regions}
              </p>
            )}
            {getRegionInfo && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800 font-inter">
                  {getRegionInfo}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigationWrapper()}>
            <NavigationButtons
              onPrevious={handlePrevious}
              onNext={handleSubmit}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralStep;