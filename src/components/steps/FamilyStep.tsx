// src/components/steps/FamilyStep.tsx
import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";

interface FamilyStepData {
  hasPartner: string;
  partnerNationality: string[];
  hasChildren: boolean;
}

interface FamilyStepProps {
  data: FamilyStepData;
  onSubmit: (data: FamilyStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const nationalities = [
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

const FamilyStep: React.FC<FamilyStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  const [hasPartner, setHasPartner] = useState<string>(data.hasPartner);
  const [partnerNationality, setPartnerNationality] = useState<string[]>(data.partnerNationality);
  const [hasChildren, setHasChildren] = useState<boolean>(data.hasChildren);
  const [errors, setErrors] = useState<{ hasPartner?: string }>({});

  const validateForm = useCallback(() => {
    const newErrors: { hasPartner?: string } = {};
    if (!hasPartner) {
      newErrors.hasPartner = "Please select an option";
    }
    return newErrors;
  }, [hasPartner]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      hasPartner,
      partnerNationality,
      hasChildren,
    });
    onNext();
  }, [hasPartner, partnerNationality, hasChildren, onSubmit, onNext, validateForm]);

  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Q1: Do you have a partner? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Do you have a partner? *
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="radio"
              name="hasPartner"
              value="Yes, and we’re legally married"
              checked={hasPartner === "Yes, and we’re legally married"}
              onChange={(e) => setHasPartner(e.target.value)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes, and we’re legally married
            </span>
          </label>
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="radio"
              name="hasPartner"
              value="Yes, but we’re not legally married"
              checked={hasPartner === "Yes, but we’re not legally married"}
              onChange={(e) => setHasPartner(e.target.value)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes, but we’re not legally married
            </span>
          </label>
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="radio"
              name="hasPartner"
              value="No"
              checked={hasPartner === "No"}
              onChange={(e) => setHasPartner(e.target.value)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No
            </span>
          </label>
        </div>
        {errors.hasPartner && (
          <p
            className="text-[0.75rem] text-red-500 mt-[0.25rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {errors.hasPartner}
          </p>
        )}
      </div>

      {/* Q2: Partner's nationality (only if hasPartner is not "No") */}
      {hasPartner && hasPartner !== "No" && (
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="partnerNationality"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What is your partner’s nationality?
          </label>
          <MultiSelect
            id="partnerNationality"
            values={partnerNationality}
            onChange={setPartnerNationality}
            placeholder="Add nationality"
            options={nationalities}
          />
        </div>
      )}

      {/* Q3: Do you have children? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Do you have children?
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="checkbox"
              checked={hasChildren}
              onChange={(e) => setHasChildren(e.target.checked)}
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

      <NavigationButtons
        onPrevious={onPrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default FamilyStep;