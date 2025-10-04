import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavigationButtons from "../common/NavigationButtons";
import { generalStepVariants } from "../../lib/styles";
import { RootState, AppDispatch } from '../../store';
import { updateGeneralStep, nextStep, previousStep } from "../../features/stepSlice";
import { MultiSelect, NumberInput } from "../common";
import { StepRTKProps } from "../../types/steps";
const regionsOptions = ["North America", "South America", "Asia", "Europe", "Africa", "Oceania"];
const nationalitiesOptions = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "India", "China", "Brazil", "South Africa",
];


const GeneralStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = useSelector((state: RootState) => state.stepForm);
  
  const [nationality, setNationality] = useState<string[]>(initialData.nationality || []);
  const [age, setAge] = useState<number | null>(initialData.age || null);
  const [homeSize, setHomeSize] = useState<number | null>(initialData.homeSize || null);
  const [bedrooms, setBedrooms] = useState<number | null>(initialData.bedrooms || null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialData.regions || []);
  const [errors, setErrors] = useState<{
    nationality?: string; age?: string; regions?: string;
  }>({});

  const styles = generalStepVariants();

  const validateForm = useCallback(() => {
    const newErrors: { nationality?: string; age?: string; regions?: string } = {};
    if (nationality.length === 0) newErrors.nationality = "At least one nationality is required";
    if (age === null) newErrors.age = "Age is required";
    else if (age < 0 || age > 120) newErrors.age = "Please enter a valid age (0-120)";
    if (selectedRegions.length === 0) newErrors.regions = "At least one region is required";
    return newErrors;
  }, [nationality, age, selectedRegions]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    // 1. Save data to Redux
    dispatch(updateGeneralStep({
      nationality, age, homeSize, bedrooms, regions: selectedRegions,
    }));
    
    // 2. Navigate
    dispatch(nextStep());
  }, [nationality, age, homeSize, bedrooms, selectedRegions, validateForm, dispatch]);

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };
  
  const handlePrevious = useCallback(() => {
    dispatch(previousStep());
  }, [dispatch]);

  return (
    <div className={styles.outerContainer()}>
      <div className={styles.contentWrapper()}>
        <div className={styles.formGrid()}>
          {/* Nationality Field */}
          <div className={styles.labelColumn()}>
            <label
              htmlFor="nationality"
              className={styles.label()}
            >
              What nationality and passports do you hold?{" "}
              <span className={styles.required()}>*</span>
            </label>
          </div>
          <div className={styles.inputColumn()}>
            <MultiSelect
              id="nationality"
              values={nationality}
              onChange={setNationality}
              placeholder="Add nationality"
              options={nationalitiesOptions}
              aria-invalid={!!errors.nationality}
              aria-describedby={errors.nationality ? "nationality-error" : undefined}
              className={styles.inputBase()}
            />
            {errors.nationality && (
              <p
                id="nationality-error"
                className={styles.errorText()}
              >
                {errors.nationality}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div className={styles.labelColumn()}>
            <label
              htmlFor="age"
              className={styles.label()}
            >
              How old are you? <span className={styles.required()}>*</span>
            </label>
          </div>
          <div className={styles.inputColumn()}>
            <NumberInput
              id="age"
              value={age}
              onChange={setAge}
              placeholder="Age"
              icon={null}
              min={0}
              max={120}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? "age-error" : undefined}
              className={styles.numberInput()}
            />
            {errors.age && (
              <p
                id="age-error"
                className={styles.errorText()}
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
          </div>
          <div className={styles.inputColumn()}>
            <div className={styles.homeSizeRow()}>
              <NumberInput
                value={homeSize}
                onChange={setHomeSize}
                placeholder="Sq. Footage"
                icon={null}
                min={0}
                className={styles.numberInput()}
              />
              <NumberInput
                value={bedrooms}
                onChange={setBedrooms}
                placeholder="# of Bedrooms"
                icon={null}
                min={0}
                className={styles.numberInput()}
              />
            </div>
          </div>

          {/* Regions Field with Buttons */}
          <div className={styles.labelColumn()}>
            <label className={styles.label()}>
              What regions are you interested in moving to?{" "}
              <span className={styles.required()}>*</span>
            </label>
          </div>
          <div className={styles.inputColumn()}>
            <div className={styles.regionsButtonsWrapper()}>
              {regionsOptions.map((region) => {
                const isSelected = selectedRegions.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={generalStepVariants({ regionSelected: isSelected }).regionButton()}
                    aria-pressed={isSelected}
                    aria-label={`Toggle ${region} region`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
            {errors.regions && (
              <p
                id="regions-error"
                className={styles.errorText()}
              >
                {errors.regions}
              </p>
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

export default GeneralStep