import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavigationButtons from "../common/NavigationButtons";
import { ancestryStepVariants } from "../../lib/styles";
import { Relative, StepRTKProps } from "../../types/steps";
import { RootState, AppDispatch } from '../../store';
import { nextStep, previousStep, updateAncestryStep } from "../../features/stepSlice";
import { MultiSelect } from "../common";
import { Plus, X } from "lucide-react";

// New, simplified prop interface

const AncestryStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = useSelector((state: RootState) => state.stepForm);

  const [hasAncestry, setHasAncestry] = useState<boolean>(initialData.hasAncestry);
  const [relatives, setRelatives] = useState<Relative[]>(initialData.relatives);
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
    // 1. Save data to Redux
    dispatch(updateAncestryStep({
      hasAncestry,
      relatives: hasAncestry ? relatives.filter(r => r.relative || r.passport) : [],
    }));
    
    // 2. Navigate
    dispatch(nextStep());
  }, [hasAncestry, relatives, dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch(previousStep());
  }, [dispatch]);

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
        onPrevious={handlePrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default AncestryStep;