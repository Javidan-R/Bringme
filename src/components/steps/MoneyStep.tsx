// src/components/steps/MoneyStep.tsx
import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import NumberInput from "../common/NumberInput";

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
  const [interestedInInvestmentVisa, setInterestedInInvestmentVisa] = useState<boolean>(
    data.interestedInInvestmentVisa
  );
  const [savings, setSavings] = useState<number | null>(data.savings);

  const handleSubmit = useCallback(() => {
    onSubmit({
      interestedInInvestmentVisa,
      savings,
    });
    onNext();
  }, [interestedInInvestmentVisa, savings, onSubmit, onNext]);

  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Q1: Interested in investment visa? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Are you interested in pursuing an investment visa?
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="checkbox"
              checked={interestedInInvestmentVisa}
              onChange={(e) => setInterestedInInvestmentVisa(e.target.checked)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes
            </span>
          </label>
        </div>
      </div>

      {/* Q2: Savings (only if interestedInInvestmentVisa is true) */}
      {interestedInInvestmentVisa && (
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="savings"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            How much do you have in savings?
          </label>
          <NumberInput
            id="savings"
            value={savings}
            onChange={setSavings}
            placeholder="Enter amount"
            icon={null}
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