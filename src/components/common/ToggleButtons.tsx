import { Check, X } from "lucide-react";

interface ToggleButtonsProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labels?: [string, string];
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  value,
  onChange,
  labels = ["No", "Yes"],
}) => {
  return (
    <div className="flex gap-[0.5rem]">
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-[0.25rem] h-[2rem] px-[0.75rem] py-[0.5rem] border-[0.0625rem] rounded-full text-[0.875rem] leading-[1.25rem] transition-colors duration-200 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.125rem] md:text-[1rem] md:leading-[1.5rem] ${
          !value
            ? "bg-[#F3F4F6] text-[#1F2A44] border-[#D1D5DB]"
            : "border-[#D1D5DB] text-[#4B5563] hover:bg-[#E5E7EB]"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
        aria-label={`Set to ${labels[0]}`}
        aria-pressed={!value}
      >
        <X className="w-[1rem] h-[1rem]" />
        {labels[0]}
      </button>
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-[0.25rem] h-[2rem] px-[0.75rem] py-[0.5rem] border-[0.0625rem] rounded-full text-[0.875rem] leading-[1.25rem] transition-colors duration-200 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.125rem] md:text-[1rem] md:leading-[1.5rem] ${
          value
            ? "bg-[#22C55E] text-white border-[#22C55E]"
            : "border-[#D1D5DB] text-[#4B5563] hover:bg-[#E5E7EB]"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
        aria-label={`Set to ${labels[1]}`}
        aria-pressed={value}
      >
        <Check className="w-[1rem] h-[1rem]" />
        {labels[1]}
      </button>
    </div>
  );
};

export default ToggleButtons;