// src/features/onboarding/components/AncestryStep.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationButtons from "../../../shared/components/complex/NavigationButtons";
import { ancestryStepVariants } from "../../../lib/styles";
import { RootState, AppDispatch } from "../../../store";
import { updateAncestryStep } from "../slice";
import { useStepForm } from "../hooks/useStepForm";

const AncestryStep: React.FC<any> = ({ isFirstStep, isLastStep, onNext, onPrevious }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initial = useSelector((s: RootState) => s.stepForm);
  const styles = ancestryStepVariants();

  const { data, setField, addArrayItem, removeArrayItem, setArrayField, handleSubmit, handlePrevious } =
    useStepForm({
      initialData: {
        hasAncestry: initial.hasAncestry || false,
        relatives: initial.relatives || [],
      },
      save: async (payload) => {
        dispatch(updateAncestryStep(payload));
      },
      onNext,
      onPrevious,
      persistKey: "onboarding.ancestry",
      autosave: true,
    });

  return (
    <div className={styles.container()}>
      <div className={styles.questionWrapper()}>
        <label className={styles.label()}>Do you have ancestry that might qualify for a visa?</label>
        <label className={styles.checkboxLabel()}>
          <input
            type="checkbox"
            checked={data.hasAncestry}
            onChange={(e) => setField("hasAncestry", e.target.checked)}
            className={styles.checkbox()}
          />
          <span className={styles.checkboxText()}>Yes</span>
        </label>
      </div>

      {data.hasAncestry && (
        <div className={styles.relativesContainer()}>
          {(data.relatives || []).map((rel: any, idx: number) => (
            <div key={idx} className={styles.relativeRow()}>
              <input
                value={rel.relative}
                onChange={(e) => {
                  const copy = [...(data.relatives || [])];
                  copy[idx] = { ...copy[idx], relative: e.target.value };
                  setArrayField("relatives", copy);
                }}
                placeholder="Relative"
                className={styles.input()}
              />
              <input
                value={rel.passport}
                onChange={(e) => {
                  const copy = [...(data.relatives || [])];
                  copy[idx] = { ...copy[idx], passport: e.target.value };
                  setArrayField("relatives", copy);
                }}
                placeholder="Passport"
                className={styles.input()}
              />
              <button onClick={() => removeArrayItem("relatives", idx)} className={styles.removeButton()}>
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => addArrayItem("relatives", { relative: "", passport: "" })}
            className={styles.addButton()}
          >
            Add another relative
          </button>
        </div>
      )}

      <NavigationButtons onPrevious={handlePrevious} onNext={handleSubmit} isFirstStep={!!isFirstStep} isLastStep={!!isLastStep} />
    </div>
  );
};

export default AncestryStep;
