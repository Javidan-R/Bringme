import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";
import { familyStepVariants } from "../../lib/styles";
import { RootState, AppDispatch } from '../../store';
import { updateFamilyStep, nextStep, previousStep } from "../../features/stepSlice";
import { StepRTKProps } from "../../types/steps";

const nationalities = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany",
  "France", "India", "China", "Brazil", "South Africa",
];

const FamilyStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = useSelector((state: RootState) => state.stepForm);

  const [hasPartner, setHasPartner] = useState<string>(initialData.hasPartner);
  const [partnerNationality, setPartnerNationality] = useState<string[]>(initialData.partnerNationality);
  const [hasChildren, setHasChildren] = useState<boolean>(initialData.hasChildren);
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
    
    // 1. Save data to Redux
    dispatch(updateFamilyStep({
      hasPartner,
      partnerNationality: hasPartner !== "No" ? partnerNationality : [],
      hasChildren,
    }));
    
    // 2. Navigate
    dispatch(nextStep());
  }, [hasPartner, partnerNationality, hasChildren, validateForm, dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch(previousStep());
  }, [dispatch]);

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
        onPrevious={handlePrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default FamilyStep;