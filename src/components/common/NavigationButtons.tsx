import Button from "./Button";
import { navigation } from "../../lib/styles/ui";
import { NavigationButtonsProps } from "@/types/components";

const { wrapper, button, previous, next, hidden } = navigation();


const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <div className={wrapper()}>
      <Button
        variant="outline"
        onClick={onPrevious}
        className={`${button()} ${previous()} ${isFirstStep ? hidden() : ""}`}
        aria-label="Previous Step"
        disabled={isFirstStep}
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        className={`${button()} ${next()}`}
        aria-label={isLastStep ? "Finalize" : "Next Step"}
      >
        {isLastStep ? "Finalize" : "Next"}
      </Button>
    </div>
  );
};

export default NavigationButtons;
