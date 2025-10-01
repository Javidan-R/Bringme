// src/components/steps/WorkStep.tsx
import { useState, useCallback } from "react";
import NavigationButtons from "../common/NavigationButtons";
import NumberInput from "../common/NumberInput";

interface WorkStepData {
  remoteWork: string;
  passiveIncome: number | null;
  jobType: string;
  monthlyIncome: number | null;
  interestedInBusinessVisa: boolean;
}

interface WorkStepProps {
  data: WorkStepData;
  onSubmit: (data: WorkStepData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const WorkStep: React.FC<WorkStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  const [remoteWork, setRemoteWork] = useState<string>(data.remoteWork);
  const [passiveIncome, setPassiveIncome] = useState<number | null>(data.passiveIncome);
  const [jobType, setJobType] = useState<string>(data.jobType);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(data.monthlyIncome);
  const [interestedInBusinessVisa, setInterestedInBusinessVisa] = useState<boolean>(
    data.interestedInBusinessVisa
  );
  const [errors, setErrors] = useState<{ remoteWork?: string }>({});

  const validateForm = useCallback(() => {
    const newErrors: { remoteWork?: string } = {};
    if (!remoteWork) {
      newErrors.remoteWork = "Please select an option";
    }
    return newErrors;
  }, [remoteWork]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit({
      remoteWork,
      passiveIncome,
      jobType,
      monthlyIncome,
      interestedInBusinessVisa,
    });
    onNext();
  }, [remoteWork, passiveIncome, jobType, monthlyIncome, interestedInBusinessVisa, onSubmit, onNext, validateForm]);

  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Q1: Do you work remotely? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Do you work remotely? *
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="radio"
              name="remoteWork"
              value="Yes"
              checked={remoteWork === "Yes"}
              onChange={(e) => setRemoteWork(e.target.value)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes
            </span>
          </label>
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="radio"
              name="remoteWork"
              value="No"
              checked={remoteWork === "No"}
              onChange={(e) => setRemoteWork(e.target.value)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No
            </span>
          </label>
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="radio"
              name="remoteWork"
              value="Retired"
              checked={remoteWork === "Retired"}
              onChange={(e) => setRemoteWork(e.target.value)}
              className="w-[1rem] h-[1rem] text-[#03BCA3]"
            />
            <span
              className="text-[0.875rem] text-[#1F2A44]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Retired
            </span>
          </label>
        </div>
        {errors.remoteWork && (
          <p
            className="text-[0.75rem] text-red-500 mt-[0.25rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {errors.remoteWork}
          </p>
        )}
      </div>

      {/* Q2: Passive income (only if remoteWork is "Retired") */}
      {remoteWork === "Retired" && (
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="passiveIncome"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
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
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="jobType"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What type of job do you have?
          </label>
          <input
            id="jobType"
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="Enter job type"
            className="px-[1rem] py-[0.75rem] bg-[#E5DEDB] rounded-[0.5rem] text-[#1F2A44] text-[1rem] font-medium placeholder-[#6B7280] outline-none focus:border-[#03BCA3] focus:ring-[0.0625rem] focus:ring-[#03BCA3]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
      )}

      {/* Q4: Monthly income (only if remoteWork is "Yes") */}
      {remoteWork === "Yes" && (
        <div className="flex flex-col gap-[0.5rem]">
          <label
            htmlFor="monthlyIncome"
            className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            How much do you make a month?
          </label>
          <NumberInput
            id="monthlyIncome"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            placeholder="Enter amount"
            icon={null}
            min={0}
          />
        </div>
      )}

      {/* Q5: Interested in business visa? */}
      <div className="flex flex-col gap-[0.5rem]">
        <label
          className="text-[#1F2A44] font-medium text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Are you interested in pursuing a business visa?
        </label>
        <div className="flex gap-[1rem]">
          <label className="flex items-center gap-[0.5rem]">
            <input
              type="checkbox"
              checked={interestedInBusinessVisa}
              onChange={(e) => setInterestedInBusinessVisa(e.target.checked)}
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

      <NavigationButtons
        onPrevious={onPrevious}
        onNext={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default WorkStep;