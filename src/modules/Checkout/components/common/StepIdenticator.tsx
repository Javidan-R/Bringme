
import {stepIndicatorVariants } from "../../../../lib/styles/layout";
import { StepIndicatorProps } from "../../../../types/components";


const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const styles = stepIndicatorVariants();

  return (
    <div className={styles.container()}>
      {steps.map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        const dotState = isCompleted ? "completed" : isActive ? "active" : "inactive";

        return (
          <div
            key={index}
            className={stepIndicatorVariants({ dotState }).dot()}
          />
        );
      })}
    </div>
  );
};
export default StepIndicator;