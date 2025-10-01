import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface MultiSelectProps {
  id?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  options?: string[];
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
  style?: React.CSSProperties;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  values,
  onChange,
  placeholder,
  options = [],
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className = "",
  style,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = (value: string) => {
    if (value && !values.includes(value)) {
      onChange([...values, value]);
      setInputValue("");
      setIsDropdownOpen(false);
    }
  };

  const handleRemove = (value: string) => {
    onChange(values.filter((v) => v !== value));
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={`flex flex-wrap gap-[0.5rem] w-full min-h-[3rem] px-[0.75rem] py-[0.5rem] bg-[#E5DEDB] border-[0.0125rem] ${
          ariaInvalid ? "border-[#EF4444]" : "border-[#D1D5DB]"
        } rounded-[0.5rem] focus-within:ring-[0.125rem] focus-within:ring-[#03BCA3] focus-within:border-[#03BCA3] transition-all duration-200 ${className}`}
        style={style}
      >
        {values.map((value) => (
          <div
            key={value}
            className="flex items-center gap-[0.5rem] px-[0.5rem] py-[0.8rem] bg-[#03BCA3] text-white rounded-[0.25rem]"
          >
            <span
              className="text-[0.875rem] font-medium md:text-[1rem]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {value}
            </span>
            <button
              onClick={() => handleRemove(value)}
              className="text-white hover:text-gray-300 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] rounded"
              aria-label={`Remove ${value}`}
            >
              <X className="w-[1.2rem] h-[1.2rem]" />
            </button>
          </div>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (options.length > 0 && e.target.value) {
              setIsDropdownOpen(true);
            }
          }}
          onFocus={() => options.length > 0 && setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !options.length) {
              e.preventDefault();
              handleAdd(inputValue);
            }
          }}
          placeholder={values.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[8rem] bg-transparent outline-none text-[#1F2A44] text-[0.875rem] font-medium placeholder:text-[#9CA3AF] md:text-[1rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
        />
      </div>
      {options.length > 0 && isDropdownOpen && (
        <ul
          className="absolute z-10 mt-[0.25rem] w-full max-h-[12.5rem] overflow-y-auto bg-white border-[0.0625rem] border-[#D1D5DB] rounded-[0.5rem] shadow-[0_0.25rem_0.375rem_-0.0625rem_rgba(0,0,0,0.1)]"
          role="listbox"
          aria-label="Select options"
        >
          {options
            .filter(
              (option) =>
                !values.includes(option) &&
                option.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option) => (
              <li
                key={option}
                onClick={() => handleAdd(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAdd(option);
                  }
                }}
                tabIndex={0}
                className="px-[0.75rem] py-[0.5rem] text-[#1F2A44] text-[0.875rem] hover:bg-[#F3F4F6] cursor-pointer focus:bg-[#F3F4F6] focus:outline-none md:text-[1rem]"
                style={{ fontFamily: "Inter, sans-serif" }}
                role="option"
                aria-selected={values.includes(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;