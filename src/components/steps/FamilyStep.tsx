import { useState, useCallback } from "react";
import { tv } from "tailwind-variants";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";

const familyStepVariants = tv({
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
    radioGroup: [
      "flex",
      "gap-[1rem]",
    ],
    radioLabel: [
      "flex",
      "items-center",
      "gap-[0.5rem]",
    ],
    radio: [
      "w-[1rem]",
      "h-[1rem]",
      "text-[#03BCA3]",
    ],
    radioText: [
      "text-[0.875rem]",
      "text-[#1F2A44]",
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
    errorText: [
      "text-[0.75rem]",
      "text-red-500",
      "mt-[0.25rem]",
      "font-inter",
    ],
  },
});

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

  const styles = familyStepVariants();

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
    <div className={styles.container()}>
      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>
          Do you have a partner? *
        </label>
        <div className={styles.radioGroup()}>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="hasPartner"
              value="Yes, and we're legally married"
              checked={hasPartner === "Yes, and we're legally married"}
              onChange={(e) => setHasPartner(e.target.value)}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>
              Yes, and we're legally married
            </span>
          </label>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="hasPartner"
              value="Yes, but we're not legally married"
              checked={hasPartner === "Yes, but we're not legally married"}
              onChange={(e) => setHasPartner(e.target.value)}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>
              Yes, but we're not legally married
            </span>
          </label>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="hasPartner"
              value="No"
              checked={hasPartner === "No"}
              onChange={(e) => setHasPartner(e.target.value)}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>No</span>
          </label>
        </div>
        {errors.hasPartner && (
          <p className={styles.errorText()}>
            {errors.hasPartner}
          </p>
        )}
      </div>

      {hasPartner && hasPartner !== "No" && (
        <div className={styles.questionWrapper()}>
          <label
            htmlFor="partnerNationality"
            className={styles.label()}
          >
            What is your partner's nationality?
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

      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>
          Do you have children?
        </label>
        <div className={styles.checkboxGroup()}>
          <label className={styles.checkboxLabel()}>
            <input
              type="checkbox"
              checked={hasChildren}
              onChange={(e) => setHasChildren(e.target.checked)}
              className={styles.checkbox()}
            />
            <span className={styles.checkboxText()}>Yes</span>
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