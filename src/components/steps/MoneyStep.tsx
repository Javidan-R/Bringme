import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavigationButtons from "../common/NavigationButtons";
import NumberInput from "../common/NumberInput";
import { form } from "../../lib/styles/ui";
import { RootState, AppDispatch } from '../../store';
import { updateMoneyStep, nextStep, previousStep } from "../../features/stepSlice";
import { StepRTKProps } from "../../types/steps";

const { wrapper, label, checkboxWrapper, checkbox } = form();

const MoneyStep: React.FC<StepRTKProps> = ({
  isFirstStep,
  isLastStep,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData = useSelector((state: RootState) => state.stepForm);

  const [interestedInInvestmentVisa, setInterestedInInvestmentVisa] = useState(
    initialData.interestedInInvestmentVisa
  );
  const [savings, setSavings] = useState<number | null>(initialData.savings);

  const handleSubmit = useCallback(() => {
    // 1. Save data to Redux
    dispatch(updateMoneyStep({ 
        interestedInInvestmentVisa, 
        savings: interestedInInvestmentVisa ? savings : null,
    }));
    
    // 2. Navigate
    dispatch(nextStep());
  }, [interestedInInvestmentVisa, savings, dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch(previousStep());
  }, [dispatch]);

  return (
    <div className={wrapper()}>
      <div className="flex flex-col gap-2">
        <label className={label()}>Are you interested in pursuing an investment visa?</label>
        <div className={checkboxWrapper()}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={interestedInInvestmentVisa}
              onChange={(e) => setInterestedInInvestmentVisa(e.target.checked)}
              className={checkbox()}
            />
            <span className="text-sm md:text-base font-inter text-[#1F2A44]">Yes</span>
          </label>
        </div>
      </div>

      {interestedInInvestmentVisa && (
        <div className="flex flex-col gap-2">
          <label htmlFor="savings" className={label()}>
            How much do you have in savings?
          </label>
          <NumberInput
            id="savings"
            value={savings}
            onChange={setSavings}
            placeholder="Enter amount"
            min={0}
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

export default MoneyStep;
