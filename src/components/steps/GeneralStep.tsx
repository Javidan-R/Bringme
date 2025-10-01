import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";
import NumberInput from "../common/NumberInput";

// Interface for the data structure
interface GeneralStepData {
  nationality: string[];
  age: number | null;
  homeSize: number | null;
  bedrooms: number | null;
  regions: string[];
}

// Interface for component props
interface GeneralStepProps {
  data: GeneralStepData;
  onSubmit: (data: GeneralStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

// Static data (to be replaced with API data in the future)
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

// Main component
const GeneralStep: React.FC<GeneralStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  // State initialization with fallback values
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

  // Form validation
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

  // Handle form submission
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

  // Handle region selection
  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-[100svh]  px-[1rem] sm:px-[3rem]">
      {/* Main content area */}
      <div className="p-[1rem] md:p-[2.5rem] overflow-y-auto">
        {/* Form container with Grid for desktop, Flex for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-y-[1.5rem] md:gap-x-[2rem] md:gap-y-[2rem]">
          {/* Nationality Field */}
          <div className="flex flex-col gap-[0.5rem]">
            <label
              htmlFor="nationality"
              className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              What nationality and passports do you hold?{" "}
              <span className="text-[#EF4444]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <MultiSelect
              id="nationality"
              values={nationality}
              onChange={setNationality}
              placeholder="Add nationality"
              options={nationalitiesOptions}
              aria-invalid={!!errors.nationality}
              aria-describedby={errors.nationality ? "nationality-error" : undefined}
              className="w-full min-h-[3rem] px-[0.75rem] py-[0.5rem] text-[0.875rem] text-[#1F2A44] bg-[#F0EDEB] border-[0.0625rem] border-[#D1D5DB] rounded-[0.5rem] focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:border-[#22C55E] transition-all duration-200 placeholder:text-[#9CA3AF] md:text-[1rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            {errors.nationality && (
              <p
                id="nationality-error"
                className="text-[0.75rem] text-[#EF4444] mt-[0.25rem]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {errors.nationality}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div className="flex flex-col gap-[0.5rem]">
            <label
              htmlFor="age"
              className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              How old are you? <span className="text-[#EF4444]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
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
              className="w-full h-[3rem] px-[0.75rem] py-[0.5rem] text-[0.875rem] text-[#1F2A44] bg-[#F0EDEB] border-[0.0625rem] border-[#D1D5DB] rounded-[0.5rem] focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:border-[#22C55E] transition-all duration-200 placeholder:text-[#9CA3AF] md:text-[1rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            {errors.age && (
              <p
                id="age-error"
                className="text-[0.75rem] text-[#EF4444] mt-[0.25rem]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {errors.age}
              </p>
            )}
          </div>

          {/* Home Size and Bedrooms */}
          <div className="flex flex-col gap-[0.5rem]">
            <label
              className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              What size home or apartment would you want?
            </label>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <div className="flex flex-col gap-[0.5rem] sm:flex-row sm:gap-[1rem]">
              <NumberInput
                value={homeSize}
                onChange={setHomeSize}
                placeholder="Sq. Footage"
                icon={null}
                min={0}
                className="w-full h-[3rem] px-[0.75rem] py-[0.5rem] text-[0.875rem] text-[#1F2A44] bg-[#F0EDEB] border-[0.0625rem] border-[#D1D5DB] rounded-[0.5rem] focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:border-[#22C55E] transition-all duration-200 placeholder:text-[#9CA3AF] md:text-[1rem]"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              <NumberInput
                value={bedrooms}
                onChange={setBedrooms}
                placeholder="# of Bedrooms"
                icon={null}
                min={0}
                className="w-full h-[3rem] px-[0.75rem] py-[0.5rem] text-[0.875rem] text-[#1F2A44] bg-[#F0EDEB] border-[0.0625rem] border-[#D1D5DB] rounded-[0.5rem] focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:border-[#22C55E] transition-all duration-200 placeholder:text-[#9CA3AF] md:text-[1rem]"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>

          {/* Regions Field with Buttons */}
          <div className="flex flex-col gap-[0.5rem]">
            <label
              className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              What regions are you interested in moving to?{" "}
              <span className="text-[#EF4444]">*</span>
            </label>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <div className="flex flex-wrap gap-[0.5rem]">
              {regionsOptions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`min-w-[8rem] h-[2.5rem] px-[1rem] py-[0.5rem] border-[0.0625rem] rounded-[0.5rem] text-[0.875rem] font-medium transition-colors duration-200 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.0625rem] md:text-[1rem] ${
                    selectedRegions.includes(region)
                      ? "bg-[#22C55E] text-white border-[#22C55E] hover:bg-[#20b356]"
                      : "bg-white text-[#1F2A44] border-[#D1D5DB] hover:bg-[#F3F4F6]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  aria-pressed={selectedRegions.includes(region)}
                  aria-label={`Toggle ${region} region`}
                >
                  {region}
                </button>
              ))}
            </div>
            {errors.regions && (
              <p
                id="regions-error"
                className="text-[0.75rem] text-[#EF4444] mt-[0.25rem]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {errors.regions}
              </p>
            )}
          </div>

          {/* Navigation Buttons (spanning both columns on desktop) */}
          <div className="md:col-span-2">
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

export default GeneralStep;