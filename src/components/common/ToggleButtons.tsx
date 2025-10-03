import { Check, X } from "lucide-react";
import { toggleButton } from "../../lib/styles/ui";
import { ToggleButtonsProps } from "@/types/components";


const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  value,
  onChange,
  labels = ["No", "Yes"],
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(false)}
        className={value ? toggleButton({ inactive: true }) : toggleButton({ active: false })}
        aria-label={`Set to ${labels[0]}`}
        aria-pressed={!value}
      >
        <X className="w-4 h-4" />
        {labels[0]}
      </button>

      <button
        onClick={() => onChange(true)}
        className={value ? toggleButton({ active: true }) : toggleButton({ inactive: true })}
        aria-label={`Set to ${labels[1]}`}
        aria-pressed={value}
      >
        <Check className="w-4 h-4" />
        {labels[1]}
      </button>
    </div>
  );
};

export default ToggleButtons;
