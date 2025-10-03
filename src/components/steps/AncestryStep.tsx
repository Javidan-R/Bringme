import { useState, useCallback } from "react";
import { Plus, X } from "lucide-react";
import { tv } from "tailwind-variants";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";

const ancestryStepVariants = tv({
  slots: {
    container: [
      "flex",
      "flex-col",
      "gap-[1.5rem]",
    ],
    questionWrapper: [
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
    checkboxGroup: [
      "flex",
      "gap-[1rem]",
    ],
    checkboxLabel: [
      "flex",
      "items-center",
      "gap-[0.5rem]",
    ],
    checkbox: [
      "w-[1rem]",
      "h-[1rem]",
      "text-[#03BCA3]",
    ],
    checkboxText: [
      "text-[0.875rem]",
      "text-[#1F2A44]",
      "font-inter",
    ],
    relativesContainer: [
      "flex",
      "flex-col",
      "gap-[1rem]",
    ],
    relativeRow: [
      "flex",
      "flex-col",
      "gap-[0.5rem]",
      "sm:flex-row",
      "sm:gap-[1rem]",
    ],
    inputWrapper: [
      "flex-1",
    ],
    input: [
      "w-full",
      "px-[1rem]",
      "py-[0.75rem]",
      "bg-[#E5DEDB]",
      "rounded-[0.5rem]",
      "text-[#1F2A44]",
      "text-[1rem]",
      "font-medium",
      "placeholder-[#6B7280]",
      "outline-none",
      "focus:border-[#03BCA3]",
      "focus:ring-[0.0625rem]",
      "focus:ring-[#03BCA3]",
      "font-inter",
    ],
    removeButton: [
      "self-end",
      "text-[#6B7280]",
      "hover:text-[#1F2A44]",
      "mt-[1.5rem]",
    ],
    removeIcon: [
      "w-[1rem]",
      "h-[1rem]",
    ],
    addButton: [
      "flex",
      "items-center",
      "gap-[0.5rem]",
      "text-[#1F2A44]",
      "hover:text-[#03BCA3]",
    ],
    addIcon: [
      "w-[1rem]",
      "h-[1rem]",
    ],
    addText: [
      "text-[0.875rem]",
      "font-medium",
      "font-inter",
    ],
  },
});

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

  const styles = ancestryStepVariants();

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
    <div className={styles.container()}>
      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>
          Do you have ancestry that might qualify for a visa?
        </label>
        <div className={styles.checkboxGroup()}>
          <label className={styles.checkboxLabel()}>
            <input
              type="checkbox"
              checked={hasAncestry}
              onChange={(e) => setHasAncestry(e.target.checked)}
              className={styles.checkbox()}
            />
            <span className={styles.checkboxText()}>Yes</span>
          </label>
        </div>
      </div>

      {hasAncestry && (
        <div className={styles.relativesContainer()}>
          {relatives.map((relative, index) => (
            <div key={index} className={styles.relativeRow()}>
              <div className={styles.inputWrapper()}>
                <label
                  htmlFor={`relative-${index}`}
                  className={styles.label()}
                >
                  Relative
                </label>
                <input
                  id={`relative-${index}`}
                  type="text"
                  value={relative.relative}
                  onChange={(e) => handleRelativeChange(index, "relative", e.target.value)}
                  placeholder="Enter relative"
                  className={styles.input()}
                />
              </div>
              <div className={styles.inputWrapper()}>
                <label
                  htmlFor={`passport-${index}`}
                  className={styles.label()}
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
                className={styles.removeButton()}
                aria-label={`Remove relative ${index + 1}`}
              >
                <X className={styles.removeIcon()} />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddRelative}
            className={styles.addButton()}
            aria-label="Add another relative"
          >
            <Plus className={styles.addIcon()} />
            <span className={styles.addText()}>
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