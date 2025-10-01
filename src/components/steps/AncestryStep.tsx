// src/components/steps/AncestryStep.tsx
import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import { Plus, X } from "lucide-react";
import MultiSelect from "../common/MultiSelect";

interface Relative {
  relative: string;
  passport: string;
}

interface AncestryStepData {
  hasAncestry: boolean;
  relatives: Relative[];
}

interface AncestryStepProps {
  data: AncestryStepData;
  onSubmit: (data: AncestryStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const AncestryStep: React.FC<AncestryStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  const [hasAncestry, setHasAncestry] = useState<boolean>(data.hasAncestry);
  const [relatives, setRelatives] = useState<Relative[]>(data.relatives);

  const handleAddRelative = () => {
    setRelatives([...relatives, { relative: "", passport: "" }]);
  };

  const handleRemoveRelative = (index: number) => {
    setRelatives(relatives.filter((_, i) => i !== index));
  };

  const handleRelativeChange = (index: number, field: keyof Relative, value: string) => {
    const updatedRelatives = [...relatives];
    updatedRelatives[index][field] = value;
    setRelatives(updatedRelatives);
  };

  const handleSubmit = useCallback(() => {
    onSubmit({
      hasAncestry,
      relatives,
    });
    onNext();
  }, [hasAncestry, relatives, onSubmit, onNext]);

  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Q1: Do you have ancestry that might qualify for a visa? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Do you have ancestry that might qualify for a visa?
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="checkbox"
              checked={hasAncestry}
              onChange={(e) => setHasAncestry(e.target.checked)}
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

      {/* Relative, Passport, and + button section (only if hasAncestry is true) */}
      {hasAncestry && (
        <div className="flex flex-col gap-[1rem]">
          {relatives.map((relative, index) => (
            <div key={index} className="flex flex-col gap-[0.5rem] sm:flex-row sm:gap-[1rem]">
              <div className="flex-1">
                <label
                  htmlFor={`relative-${index}`}
                  className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Relative
                </label>
                <input
                  id={`relative-${index}`}
                  type="text"
                  value={relative.relative}
                  onChange={(e) => handleRelativeChange(index, "relative", e.target.value)}
                  placeholder="Enter relative"
                  className="w-full px-[1rem] py-[0.75rem] bg-[#E5DEDB] rounded-[0.5rem] text-[#1F2A44] text-[1rem] font-medium placeholder-[#6B7280] outline-none focus:border-[#03BCA3] focus:ring-[0.0625rem] focus:ring-[#03BCA3]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor={`passport-${index}`}
                  className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Passport
                </label>
                <MultiSelect
                  id={`passport-${index}`}
                  values={relative.passport ? [relative.passport] : []}
                  onChange={(values) =>
                    handleRelativeChange(index, "passport", values[0] || "")
                  }
                  placeholder="Select passport"
                  options={["United States", "Canada", "United Kingdom", "Australia", "Germany"]}
                />
              </div>
              <button
                onClick={() => handleRemoveRelative(index)}
                className="self-end text-[#6B7280] hover:text-[#1F2A44] mt-[1.5rem]"
                aria-label={`Remove relative ${index + 1}`}
              >
                <X className="w-[1rem] h-[1rem]" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddRelative}
            className="flex items-center gap-[0.5rem] text-[#1F2A44] hover:text-[#03BCA3]"
            aria-label="Add another relative"
          >
            <Plus className="w-[1rem] h-[1rem]" />
            <span
              className="text-[0.875rem] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Add another relative
            </span>
          </button>
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

export default AncestryStep;