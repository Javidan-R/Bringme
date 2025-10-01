interface NumberInputProps {
  id?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder: string;
  icon?: React.ReactNode | null;
  min?: number;
  max?: number;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
  style?: React.CSSProperties;
}

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
  className = "",
  style,
}) => {
  return (
    <div
      className={`flex items-center gap-[0.5rem] w-full h-[3rem] px-[0.75rem] py-[0.5rem] bg-[#F0EDEB] border-[0.0625rem] ${
        ariaInvalid ? "border-[#EF4444]" : "border-[#D1D5DB]"
      } rounded-[0.5rem] focus-within:ring-[0.125rem] focus-within:ring-[#22C55E] focus-within:border-[#22C55E] transition-all duration-200 ${className}`}
      style={style}
    >
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
        className="flex-1 bg-transparent outline-none text-[#1F2A44] text-[0.875rem] font-medium placeholder:text-[#9CA3AF] md:text-[1rem]"
        style={{ fontFamily: "Inter, sans-serif" }}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
};

export default NumberInput;