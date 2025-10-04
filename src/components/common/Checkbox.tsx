import { Check } from "../../assets/icons/Check";
import { checkbox } from "../../lib/styles";
import clsx from "clsx";
import { CheckboxProps } from "../../types/components";

const { container, input, check, label: labelClass } = checkbox();

const Checkbox: React.FC<CheckboxProps> = ({ className, label, id, ...props }) => {
  const inputId = id || `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <label htmlFor={inputId} className={clsx(container(), className)}>
      <div className="relative flex items-center justify-center">
        <input type="checkbox" id={inputId} className={input()} {...props} />
        <span className={clsx(check(), props.checked && "opacity-100")}>
          <Check />
        </span>
      </div>
      <span className={labelClass()}>{label}</span>
    </label>
  );
};

export default Checkbox;
