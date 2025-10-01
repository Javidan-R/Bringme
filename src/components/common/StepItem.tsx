import { Check } from "lucide-react";

interface StepItemProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const StepItem: React.FC<StepItemProps> = ({
  stepNumber,
  label,
  isActive,
  isCompleted,
  onClick,
}) => {
  // Debug logging to verify props
  console.log(`StepItem ${stepNumber}: isActive=${isActive}, isCompleted=${isCompleted}`);

  // Determine visibility
  const isNumberVisible = !isCompleted; // Number visible in active and inactive states
  const isCheckVisible = isCompleted; // Checkmark visible in complete state

  // Define styles for clarity
  const circleStyle = isCompleted
    ? "bg-green-500 text-white" // Complete: Green background, no border
    : isActive
    ? "bg-white border-2 border-green-500 shadow-md" // Active: White background, green border, shadow
    : "bg-white border-2 border-[#E5DEDB]"; // Inactive: White background, #E5DEDB border

  const numberStyle = isActive ? "text-gray-600" : "text-[#E5DEDB]"; // Number color
  const labelStyle = isCompleted
    ? "text-gray-800" // Complete: Dark gray
    : isActive
    ? "text-gray-900" // Active: Darkest gray
    : "text-[#E5DEDB]"; // Inactive: #E5DEDB

  return (
    <button
      className={`flex items-center gap-4 p-[6px] transition-all duration-300 hover:bg-gray-50 rounded-[100px] w-full outline-none cursor-pointer ${
        isActive ? "bg-white" : ""
      }`}
      onClick={onClick}
      aria-current={isActive ? "step" : undefined}
      aria-label={`Step ${stepNumber}: ${label}`}
    >
      {/* Step Indicator */}
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center z-10">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${circleStyle}`}
        />
        {isNumberVisible && (
          <span
            className={`text-[14px] font-semibold font-inter ${numberStyle} z-20`}
          >
            {stepNumber}
          </span>
        )}
        {isCheckVisible && (
          <Check className="absolute w-5 h-5 text-white z-10" />
        )}
      </div>
      {/* Step Label */}
      <span
        className={`text-[14px] font-semibold font-inter tracking-wide transition-colors duration-300 ${labelStyle}`}
      >
        {label}
      </span>
    </button>
  );
};

export default StepItem;