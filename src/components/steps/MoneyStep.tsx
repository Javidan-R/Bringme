import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import NumberInput from "../common/NumberInput";
import { form } from "../../lib/styles/ui";
const { wrapper, label, checkboxWrapper, checkbox } = form();

interface MoneyStepData {
  interestedInInvestmentVisa: boolean;
  savings: number | null;
}

interface MoneyStepProps {
  data: MoneyStepData;
  onSubmit: (data: MoneyStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const MoneyStep: React.FC<MoneyStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  const [interestedInInvestmentVisa, setInterestedInInvestmentVisa] = useState(
    data.interestedInInvestmentVisa
  );
  const [savings, setSavings] = useState<number | null>(data.savings);

  const handleSubmit = useCallback(() => {
    onSubmit({ interestedInInvestmentVisa, savings });
    onNext();
  }, [interestedInInvestmentVisa, savings, onSubmit, onNext]);

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
        onPrevious={onPrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default MoneyStep;
