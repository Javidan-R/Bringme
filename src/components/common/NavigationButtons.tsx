import Button from "./Button";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between mt-[2rem]">
      <Button
        variant="outline"
        onClick={onPrevious}
        className={`w-[7.5rem] h-[3rem] text-[#1F2A44] border-[0.0625rem] border-[#1F2A44] rounded-[0.75rem] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.125rem] text-[1rem] font-medium ${
          isFirstStep ? "invisible" : "visible"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
        aria-label="Previous Step"
        disabled={isFirstStep}
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        className="w-[7.5rem] h-[3rem] bg-[#1F2A44] text-white rounded-full hover:bg-[#2f3a5f] transition-colors duration-200 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.125rem] text-[1rem] font-medium"
        style={{ fontFamily: "Inter, sans-serif" }}
        aria-label={isLastStep ? "Finalize" : "Next Step"}
      >
        {isLastStep ? "Finalize" : "Next"}
      </Button>
    </div>
  );
};

export default NavigationButtons;