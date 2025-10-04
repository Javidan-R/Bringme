import { NumberInputProps } from "@/types/components";
import { numberInputWrapper, numberInputField } from "../../../lib/styles";



const NumberInput: React.FC<NumberInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  icon,
  min,
  max,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className,
  style,
}) => {
  return (
    <div className={numberInputWrapper({ error: !!ariaInvalid, className })} style={style}>
      {icon && <span>{icon}</span>}
      <input
        id={id}
        type="number"
        value={value ?? ""}
        onChange={(e) => {
          const val = e.target.value ? parseInt(e.target.value) : null;
          if (min !== undefined && val !== null && val < min) return;
          if (max !== undefined && val !== null && val > max) return;
          onChange(val);
        }}
        placeholder={placeholder}
        className={numberInputField()}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
};

export default NumberInput;
