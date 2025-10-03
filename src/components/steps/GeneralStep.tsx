import { useState, useCallback } from "react";
import { tv } from "tailwind-variants";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";
import NumberInput from "../common/NumberInput";

// Design System: General Step Variants
const generalStepVariants = tv({
  slots: {
    outerContainer: [
      "w-full",
      "max-w-[1200px]",
      "mx-auto",
      "min-h-[100svh]",
      "px-[1rem]",
      "sm:px-[3rem]",
    ],
    contentWrapper: [
      "p-[1rem]",
      "md:p-[2.5rem]",
      "overflow-y-auto",
    ],
    formGrid: [
      "grid",
      "grid-cols-1",
      "md:grid-cols-[1fr_2fr]",
      "gap-y-[1.5rem]",
      "md:gap-x-[2rem]",
      "md:gap-y-[2rem]",
    ],
    labelColumn: [
      "flex",
      "flex-col",
      "gap-[0.5rem]",
    ],
    inputColumn: [
      "flex",
      "flex-col",
      "gap-[0.5rem]",
    ],
    label: [
      "text-[#1F2A44]",
      "font-medium",
      "text-[0.875rem]",
      "leading-[1.25rem]",
      "md:text-[1rem]",
      "md:leading-[1.5rem]",
      "font-inter",
    ],
    required: [
      "text-[#EF4444]",
    ],
    inputBase: [
      "w-full",
      "min-h-[3rem]",
      "px-[0.75rem]",
      "py-[0.5rem]",
      "text-[0.875rem]",
      "text-[#1F2A44]",
      "bg-[#F0EDEB]",
      "border-[0.0625rem]",
      "border-[#D1D5DB]",
      "rounded-[0.5rem]",
      "focus:outline-none",
      "focus:ring-[0.125rem]",
      "focus:ring-[#22C55E]",
      "focus:border-[#22C55E]",
      "transition-all",
      "duration-200",
      "placeholder:text-[#9CA3AF]",
      "md:text-[1rem]",
      "font-inter",
    ],
    numberInput: [
      "w-full",
      "h-[3rem]",
      "px-[0.75rem]",
      "py-[0.5rem]",
      "text-[0.875rem]",
      "text-[#1F2A44]",
      "bg-[#F0EDEB]",
      "border-[0.0625rem]",
      "border-[#D1D5DB]",
      "rounded-[0.5rem]",
      "focus:outline-none",
      "focus:ring-[0.125rem]",
      "focus:ring-[#22C55E]",
      "focus:border-[#22C55E]",
      "transition-all",
      "duration-200",
      "placeholder:text-[#9CA3AF]",
      "md:text-[1rem]",
      "font-inter",
    ],
    homeSizeRow: [
      "flex",
      "flex-col",
      "gap-[0.5rem]",
      "sm:flex-row",
      "sm:gap-[1rem]",
    ],
    regionsButtonsWrapper: [
      "flex",
      "flex-wrap",
      "gap-[0.5rem]",
    ],
    regionButton: [
      "min-w-[8rem]",
      "h-[2.5rem]",
      "px-[1rem]",
      "py-[0.5rem]",
      "border-[0.0625rem]",
      "rounded-[0.5rem]",
      "text-[0.875rem]",
      "font-medium",
      "transition-colors",
      "duration-200",
      "focus:outline-none",
      "focus:ring-[0.125rem]",
      "focus:ring-[#22C55E]",
      "focus:ring-offset-[0.0625rem]",
      "md:text-[1rem]",
      "font-inter",
    ],
    errorText: [
      "text-[0.75rem]",
      "text-[#EF4444]",
      "mt-[0.25rem]",
      "font-inter",
    ],
    navigationWrapper: [
      "md:col-span-2",
    ],
  },
  variants: {
    regionSelected: {
      true: {
        regionButton: [
          "bg-[#22C55E]",
          "text-white",
          "border-[#22C55E]",
          "hover:bg-[#20b356]",
        ],
      },
      false: {
        regionButton: [
          "bg-white",
          "text-[#1F2A44]",
          "border-[#D1D5DB]",
          "hover:bg-[#F3F4F6]",
        ],
      },
    },
  },
});

interface GeneralStepData {
  nationality: string[];
  age: number | null;
  homeSize: number | null;
  bedrooms: number | null;
  regions: string[];
}

interface GeneralStepProps {
  data: GeneralStepData;
  onSubmit: (data: GeneralStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const regionsOptions = ["North America", "South America", "Asia", "Europe", "Africa", "Oceania"];
const nationalitiesOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "China",
  "Brazil",
  "South Africa",
];

const GeneralStep: React.FC<GeneralStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  const [nationality, setNationality] = useState<string[]>(data.nationality || []);
  const [age, setAge] = useState<number | null>(data.age || null);
  const [homeSize, setHomeSize] = useState<number | null>(data.homeSize || null);
  const [bedrooms, setBedrooms] = useState<number | null>(data.bedrooms || null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(data.regions || []);
  const [errors, setErrors] = useState<{
    nationality?: string;
    age?: string;
    regions?: string;
  }>({});

  const styles = generalStepVariants();

  const validateForm = useCallback(() => {
    const newErrors: { nationality?: string; age?: string; regions?: string } = {};
    if (nationality.length === 0) {
      newErrors.nationality = "At least one nationality is required";
    }
    if (age === null) {
      newErrors.age = "Age is required";
    } else if (age < 0 || age > 120) {
      newErrors.age = "Please enter a valid age (0-120)";
    }
    if (selectedRegions.length === 0) {
      newErrors.regions = "At least one region is required";
    }
    return newErrors;
  }, [nationality, age, selectedRegions]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      nationality,
      age,
      homeSize,
      bedrooms,
      regions: selectedRegions,
    });
    onNext();
  }, [nationality, age, homeSize, bedrooms, selectedRegions, onSubmit, onNext, validateForm]);

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

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
              onPrevious={onPrevious}
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