import { useState, useCallback } from "react";
import { tv } from "tailwind-variants";
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";

const educationStepVariants = tv({
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
    input: [
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
  "Bachelor's Degree",
  "Master's Degree",
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

  const styles = educationStepVariants();

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
    <div className={styles.container()}>
      <div className={styles.questionWrapper()}>
        <label
          htmlFor="highestLevel"
          className={styles.label()}
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
            className={styles.errorText()}
          >
            {errors.highestLevel}
          </p>
        )}
      </div>

      {highestLevel && (
        <div className={styles.questionWrapper()}>
          <label
            htmlFor="field"
            className={styles.label()}
          >
            What did you study?
          </label>
          <input
            id="field"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="Enter your field of study"
            className={styles.input()}
          />
        </div>
      )}

      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>
          Are you interested in pursuing an education visa?
        </label>
        <div className={styles.checkboxGroup()}>
          <label className={styles.checkboxLabel()}>
            <input
              type="checkbox"
              checked={interestedInEducationVisa}
              onChange={(e) => setInterestedInEducationVisa(e.target.checked)}
              className={styles.checkbox()}
            />
            <span className={styles.checkboxText()}>Yes</span>
          </label>
        </div>
      </div>

      {interestedInEducationVisa && (
        <div className={styles.questionWrapper()}>
          <label
            htmlFor="educationFields"
            className={styles.label()}
          >
            What fields of education are you interested in?
          </label>
          <input
            id="educationFields"
            type="text"
            value={educationFields}
            onChange={(e) => setEducationFields(e.target.value)}
            placeholder="Enter fields of interest"
            className={styles.input()}
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