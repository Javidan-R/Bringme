import { Check } from "../../assets/icons/Check";
import clsx from "clsx";
import { CheckboxProps } from "../../types/components";

const Checkbox: React.FC<CheckboxProps> = ({ className, label, id, ...props }) => {
  const inputId = id || `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <label
      htmlFor={inputId}
      className={clsx("flex items-center gap-2 text-gray-600", className)}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={inputId}
          className="w-6 h-6 appearance-none rounded-[4px] border border-gray-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#03BCA3] bg-[#F5F2F0]"
          {...props}
        />
        <span
          className={clsx(
            "absolute w-6 h-6 flex items-center justify-center rounded-[4px] bg-[#03BCA3] opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none",
            props.checked && "opacity-100"
          )}
        >
          <Check />
        </span>
      </div>
      <span className="font-inter text-base leading-6">{label}</span>
    </label>
  );
};

export default Checkbox;
