// src/features/onboarding/components/FamilyStep.tsx
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationButtons from "../../../shared/components/complex/NavigationButtons";
import { familyStepVariants } from "../../../lib/styles";
import { RootState, AppDispatch } from "../../../store";
import { updateFamilyStep } from "../slice";
import { useStepForm } from "../hooks/useStepForm";
import { MultiSelect } from "../../../shared/components/complex";
// import types if available:
// import { FamilyStepData } from "../types/steps";

const FamilyStep: React.FC<{
  isFirstStep?: boolean;
  isLastStep?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}> = ({ isFirstStep, isLastStep, onNext, onPrevious }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initial = useSelector((s: RootState) => s.stepForm);

  const styles = familyStepVariants();

  const validate = useCallback((d: any) => {
    const errs: any = {};
    if (!d.hasPartner) errs.hasPartner = "Please select an option";
    return errs;
  }, []);

  const { data, setField, setArrayField, handleSubmit, handlePrevious, errors } =
    useStepForm({
      initialData: {
        hasPartner: initial.hasPartner || "",
        partnerNationality: initial.partnerNationality || [],
        hasChildren: initial.hasChildren || false,
      },
      validate,
      save: async (payload) => {
        // dispatch redux action (can be sync)
        dispatch(updateFamilyStep(payload));
      },
      onNext,
      onPrevious,
      persistKey: "onboarding.family", // optional
      autosave: true,
      autosaveDelay: 400,
    });

  return (
    <div className={styles.container()}>
      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>Do you have a partner? *</label>
        <div className={styles.radioGroup()}>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="hasPartner"
              value="Yes, and we're legally married"
              checked={data.hasPartner === "Yes, and we're legally married"}
              onChange={(e) => setField("hasPartner", e.target.value)}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>Yes, and we're legally married</span>
          </label>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="hasPartner"
              value="Yes, but we're not legally married"
              checked={data.hasPartner === "Yes, but we're not legally married"}
              onChange={(e) => setField("hasPartner", e.target.value)}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>Yes, but we're not legally married</span>
          </label>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="hasPartner"
              value="No"
              checked={data.hasPartner === "No"}
              onChange={(e) => setField("hasPartner", e.target.value)}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>No</span>
          </label>
        </div>
        {errors.hasPartner && <p className={styles.errorText()}>{errors.hasPartner}</p>}
      </div>

      {data.hasPartner && data.hasPartner !== "No" && (
        <div className={styles.questionWrapper()}>
          <label htmlFor="partnerNationality" className={styles.label()}>
            What is your partner's nationality?
          </label>
          {/* MultiSelect expects array */}
          <MultiSelect
            id="partnerNationality"
            values={data.partnerNationality}
            onChange={(vals) => setArrayField("partnerNationality", vals)}
            placeholder="Add nationality"
            options={[
              "United States",
              "Canada",
              "United Kingdom",
              "Australia",
              "Germany",
            ]}
          />
        </div>
      )}

      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>Do you have children?</label>
        <div className={styles.checkboxGroup()}>
          <label className={styles.checkboxLabel()}>
            <input
              type="checkbox"
              checked={data.hasChildren}
              onChange={(e) => setField("hasChildren", e.target.checked)}
              className={styles.checkbox()}
            />
            <span className={styles.checkboxText()}>Yes</span>
          </label>
        </div>
      </div>

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleSubmit}
        isFirstStep={!!isFirstStep}
        isLastStep={!!isLastStep}
      />
    </div>
  );
};

export default FamilyStep;
