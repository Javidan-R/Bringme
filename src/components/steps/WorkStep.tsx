import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavigationButtons from "../common/NavigationButtons";
import NumberInput from "../common/NumberInput";
import { workStepVariants } from "../../lib/styles";
import { Info } from "lucide-react";
import { RootState, AppDispatch } from '../../store';
import { nextStep, previousStep, updateWorkStep } from "../../features/stepSlice";
import { StepRTKProps } from "../../types/steps";



const WorkStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = useSelector((state: RootState) => state.stepForm);

  const [remoteWork, setRemoteWork] = useState<string>(initialData.remoteWork);
  const [passiveIncome, setPassiveIncome] = useState<number | null>(initialData.passiveIncome);
  const [jobType, setJobType] = useState<string>(initialData.jobType);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(initialData.monthlyIncome);
  const [interestedInBusinessVisa, setInterestedInBusinessVisa] = useState<boolean>(
    initialData.interestedInBusinessVisa
  );
  const [errors, setErrors] = useState<{ remoteWork?: string; monthlyIncome?: string }>({});

  const styles = workStepVariants();

  const validateForm = useCallback(() => {
    const newErrors: { remoteWork?: string; monthlyIncome?: string } = {};
    if (!remoteWork) newErrors.remoteWork = "Please select an option";
    if (remoteWork === "Yes" && monthlyIncome === null) {
      newErrors.monthlyIncome = "Monthly income is required for remote workers";
    }
    return newErrors;
  }, [remoteWork, monthlyIncome]);

  const getIncomeInfo = () => {
    if (remoteWork === "Retired") return "This helps us identify retirement visa options suitable for your situation.";
    if (remoteWork === "Yes") return "Income information helps determine eligibility for digital nomad and freelancer visas.";
    return null;
  };

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    // 1. Save data to Redux (with conditional clearing)
    dispatch(updateWorkStep({
        remoteWork,
        passiveIncome: remoteWork === "Retired" ? passiveIncome : null,
        jobType: remoteWork === "Yes" ? jobType : "",
        monthlyIncome: remoteWork === "Yes" ? monthlyIncome : null,
        interestedInBusinessVisa,
    }));
    
    // 2. Navigate
    dispatch(nextStep());
  }, [remoteWork, passiveIncome, jobType, monthlyIncome, interestedInBusinessVisa, validateForm, dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch(previousStep());
  }, [dispatch]);

  return (
    <div className={styles.container()}>
      {/* Q1: Do you work remotely? */}
      <div className={styles.questionWrapper()} style={{ animationDelay: "100ms" }}>
        <label className={styles.label()}>
          Do you work remotely? <span className={styles.required()}>*</span>
        </label>
        <div className={styles.radioGroup()}>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="remoteWork"
              value="Yes"
              checked={remoteWork === "Yes"}
              onChange={(e) => {
                setRemoteWork(e.target.value);
                setErrors({ ...errors, remoteWork: undefined });
              }}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>Yes</span>
          </label>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="remoteWork"
              value="No"
              checked={remoteWork === "No"}
              onChange={(e) => {
                setRemoteWork(e.target.value);
                setErrors({ ...errors, remoteWork: undefined });
              }}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>No</span>
          </label>
          <label className={styles.radioLabel()}>
            <input
              type="radio"
              name="remoteWork"
              value="Retired"
              checked={remoteWork === "Retired"}
              onChange={(e) => {
                setRemoteWork(e.target.value);
                setErrors({ ...errors, remoteWork: undefined });
              }}
              className={styles.radio()}
            />
            <span className={styles.radioText()}>Retired</span>
          </label>
        </div>
        {errors.remoteWork && (
          <p className={styles.errorText()}>
            {errors.remoteWork}
          </p>
        )}
      </div>

      {/* Info Card */}
      {getIncomeInfo() && (
        <div className={styles.infoCard()}>
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className={styles.infoText()}>
              {getIncomeInfo()}
            </p>
          </div>
        </div>
      )}

      {/* Q2: Passive income (only if remoteWork is "Retired") */}
      {remoteWork === "Retired" && (
        <div className={styles.questionWrapper()} style={{ animationDelay: "200ms" }}>
          <label htmlFor="passiveIncome" className={styles.label()}>
            How much passive income do you have annually?
          </label>
          <NumberInput
            id="passiveIncome"
            value={passiveIncome}
            onChange={setPassiveIncome}
            placeholder="Enter amount"
            icon={null}
            min={0}
          />
        </div>
      )}

      {/* Q3: Job type (only if remoteWork is "Yes") */}
      {remoteWork === "Yes" && (
        <div className={styles.questionWrapper()} style={{ animationDelay: "200ms" }}>
          <label htmlFor="jobType" className={styles.label()}>
            What type of job do you have?
          </label>
          <input
            id="jobType"
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="e.g., Software Developer, Designer, Writer"
            className={styles.input()}
          />
        </div>
      )}

      {/* Q4: Monthly income (only if remoteWork is "Yes") */}
      {remoteWork === "Yes" && (
        <div className={styles.questionWrapper()} style={{ animationDelay: "300ms" }}>
          <label htmlFor="monthlyIncome" className={styles.label()}>
            How much do you make a month? <span className={styles.required()}>*</span>
          </label>
          <NumberInput
            id="monthlyIncome"
            value={monthlyIncome}
            onChange={(value) => {
              setMonthlyIncome(value);
              setErrors({ ...errors, monthlyIncome: undefined });
            }}
            placeholder="Enter amount"
            icon={null}
            min={0}
          />
          {errors.monthlyIncome && (
            <p className={styles.errorText()}>
              {errors.monthlyIncome}
            </p>
          )}
        </div>
      )}

      {/* Q5: Interested in business visa? */}
      <div className={styles.questionWrapper()} style={{ animationDelay: "400ms" }}>
        <label className={styles.label()}>
          Are you interested in pursuing a business visa?
        </label>
        <div className={styles.checkboxGroup()}>
          <label className={styles.checkboxLabel()}>
            <input
              type="checkbox"
              checked={interestedInBusinessVisa}
              onChange={(e) => setInterestedInBusinessVisa(e.target.checked)}
              className={styles.checkbox()}
            />
            <span className={styles.checkboxText()}>Yes, I'm interested</span>
          </label>
        </div>
        {interestedInBusinessVisa && (
          <div className={styles.infoCard()}>
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className={styles.infoText()}>
                Business visas typically require a detailed business plan and proof of investment capital.
              </p>
            </div>
          </div>
        )}
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

export default WorkStep;