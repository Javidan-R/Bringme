import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavigationButtons from "../common/NavigationButtons";
import MultiSelect from "../common/MultiSelect";
import { educationStepVariants } from "../../lib/styles";
import { RootState, AppDispatch } from '../../store';
import { nextStep, previousStep, updateEducationStep } from "../../features/stepSlice";
import { StepRTKProps } from "@/types/steps";

const educationLevels = [
  "High School",
  "Trade School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

const EducationStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = useSelector((state: RootState) => state.stepForm);

  const [highestLevel, setHighestLevel] = useState<string>(initialData.highestLevel);
  const [field, setField] = useState<string>(initialData.field);
  const [interestedInEducationVisa, setInterestedInEducationVisa] = useState<boolean>(
    initialData.interestedInEducationVisa
  );
  const [educationFields, setEducationFields] = useState<string>(initialData.educationFields);
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
    
    // 1. Save data to Redux
    dispatch(updateEducationStep({
      highestLevel,
      field,
      interestedInEducationVisa,
      educationFields: interestedInEducationVisa ? educationFields : "",
    }));
    
    // 2. Navigate
    dispatch(nextStep());
  }, [highestLevel, field, interestedInEducationVisa, educationFields, validateForm, dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch(previousStep());
  }, [dispatch]);


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
        onPrevious={handlePrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default EducationStep;