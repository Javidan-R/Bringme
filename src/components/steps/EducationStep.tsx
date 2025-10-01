// src/components/steps/EducationStep.tsx
import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";

interface EducationStepData {
  highestLevel: string;
  field: string;
  interestedInEducationVisa: boolean;
  educationFields: string;
}

interface EducationStepProps {
  data: EducationStepData;
  onSubmit: (data: EducationStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const educationLevels = [
  "High School",
  "Trade School",
  "Bachelor’s Degree",
  "Master’s Degree",
  "PhD",
];

const EducationStep: React.FC<EducationStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  const [highestLevel, setHighestLevel] = useState<string>(data.highestLevel);
  const [field, setField] = useState<string>(data.field);
  const [interestedInEducationVisa, setInterestedInEducationVisa] = useState<boolean>(
    data.interestedInEducationVisa
  );
  const [educationFields, setEducationFields] = useState<string>(data.educationFields);
  const [errors, setErrors] = useState<{ highestLevel?: string }>({});

  const validateForm = useCallback(() => {
    const newErrors: { highestLevel?: string } = {};
    if (!highestLevel) {
      newErrors.highestLevel = "Please select your highest level of education";
    }
    return newErrors;
  }, [highestLevel]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      highestLevel,
      field,
      interestedInEducationVisa,
      educationFields,
    });
    onNext();
  }, [highestLevel, field, interestedInEducationVisa, educationFields, onSubmit, onNext, validateForm]);

  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Q1: Highest level of education */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          htmlFor="highestLevel"
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          What is your highest level of education? *
        </label>
        <MultiSelect
          id="highestLevel"
          values={highestLevel ? [highestLevel] : []}
          onChange={(values) => setHighestLevel(values[0] || "")}
          placeholder="Select education level"
          options={educationLevels}
          aria-invalid={!!errors.highestLevel}
          aria-describedby={errors.highestLevel ? "highestLevel-error" : undefined}
        />
        {errors.highestLevel && (
          <p
            id="highestLevel-error"
            className="text-[0.75rem] text-red-500 mt-[0.25rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {errors.highestLevel}
          </p>
        )}
      </div>

      {/* Q2: Field of study (only if highestLevel is answered) */}
      {highestLevel && (
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="field"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What did you study?
          </label>
          <input
            id="field"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="Enter your field of study"
            className="px-[1rem] py-[0.75rem] bg-[#E5DEDB] rounded-[0.5rem] text-[#1F2A44] text-[1rem] font-medium placeholder-[#6B7280] outline-none focus:border-[#03BCA3] focus:ring-[0.0625rem] focus:ring-[#03BCA3]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
      )}

      {/* Q3: Interested in education visa? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Are you interested in pursuing an education visa?
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="checkbox"
              checked={interestedInEducationVisa}
              onChange={(e) => setInterestedInEducationVisa(e.target.checked)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes
            </span>
          </label>
        </div>
      </div>

      {/* Q4: Fields of education (only if interestedInEducationVisa is true) */}
      {interestedInEducationVisa && (
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="educationFields"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What fields of education are you interested in?
          </label>
          <input
            id="educationFields"
            type="text"
            value={educationFields}
            onChange={(e) => setEducationFields(e.target.value)}
            placeholder="Enter fields of interest"
            className="px-[1rem] py-[0.75rem] bg-[#E5DEDB] rounded-[0.5rem] text-[#1F2A44] text-[1rem] font-medium placeholder-[#6B7280] outline-none focus:border-[#03BCA3] focus:ring-[0.0625rem] focus:ring-[#03BCA3]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
      )}

      <NavigationButtons
        onPrevious={onPrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default EducationStep;