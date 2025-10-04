// src/features/onboarding/components/EducationStep.tsx
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationButtons from "../../../shared/components/complex/NavigationButtons";
import { educationStepVariants } from "../../../lib/styles";
import { RootState, AppDispatch } from "../../../store";
import { updateEducationStep } from "../slice";
import { useStepForm } from "../hooks/useStepForm";
import { MultiSelect } from "../../../shared/components/complex";

const educationLevels = [
  "High School",
  "Trade School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

const EducationStep: React.FC<{
  isFirstStep?: boolean;
  isLastStep?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}> = ({ isFirstStep, isLastStep, onNext, onPrevious }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initial = useSelector((s: RootState) => s.stepForm);
  const styles = educationStepVariants();

  const validate = useCallback((d: any) => {
    const errs: any = {};
    if (!d.highestLevel) errs.highestLevel = "Please select your highest level of education";
    return errs;
  }, []);

  const { data, setField, handleSubmit, handlePrevious, errors } = useStepForm({
    initialData: {
      highestLevel: initial.highestLevel || "",
      field: initial.field || "",
      interestedInEducationVisa: initial.interestedInEducationVisa || false,
      educationFields: initial.educationFields || "",
    },
    validate,
    save: async (payload) => {
      dispatch(updateEducationStep(payload));
    },
    onNext,
    onPrevious,
    persistKey: "onboarding.education",
    autosave: true,
  });

  return (
    <div className={styles.container()}>
      <div className={styles.questionWrapper()}>
        <label htmlFor="highestLevel" className={styles.label()}>What is your highest level of education? *</label>
        <MultiSelect
          id="highestLevel"
          values={data.highestLevel ? [data.highestLevel] : []}
          onChange={(vals) => setField("highestLevel", vals[0] || "")}
          placeholder="Select education level"
          options={educationLevels}
        />
        {errors.highestLevel && <p className={styles.errorText()}>{errors.highestLevel}</p>}
      </div>

      {data.highestLevel && (
        <div className={styles.questionWrapper()}>
          <label htmlFor="field" className={styles.label()}>What did you study?</label>
          <input
            id="field"
            value={data.field}
            onChange={(e) => setField("field", e.target.value)}
            placeholder="Enter your field of study"
            className={styles.input()}
          />
        </div>
      )}

      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>Are you interested in pursuing an education visa?</label>
        <label className={styles.checkboxLabel()}>
          <input
            type="checkbox"
            checked={data.interestedInEducationVisa}
            onChange={(e) => setField("interestedInEducationVisa", e.target.checked)}
            className={styles.checkbox()}
          />
          <span className={styles.checkboxText()}>Yes</span>
        </label>
      </div>

      {data.interestedInEducationVisa && (
        <div className={styles.questionWrapper()}>
          <label htmlFor="educationFields" className={styles.label()}>What fields of education are you interested in?</label>
          <input
            id="educationFields"
            value={data.educationFields}
            onChange={(e) => setField("educationFields", e.target.value)}
            placeholder="Enter fields of interest"
            className={styles.input()}
          />
        </div>
      )}

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleSubmit}
        isFirstStep={!!isFirstStep}
        isLastStep={!!isLastStep}
      />
    </div>
  );
};

export default EducationStep;
