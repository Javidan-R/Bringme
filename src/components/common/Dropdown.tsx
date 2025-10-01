import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import { DropdownProps } from "../../types/components";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  error,
  className = "",
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={clsx("relative w-full", className)} ref={dropdownRef}>
      {/* Trigger */}
      <div
        className={clsx(
          "relative flex items-center justify-between w-full h-[48px] md:h-[56px] px-3 md:px-4 py-2 bg-[#F5F2F0] border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none",
          error && "border-[#F87171]",
          isOpen && "ring-1 ring-[#03BCA3] border-[#03BCA3] bg-[#03BCA3]/10"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={clsx(
            "font-inter text-sm truncate flex-1 text-left",
            value ? "text-gray-800" : "text-gray-500"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>

      {/* Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx(
                "px-3 py-2 text-sm font-inter cursor-pointer rounded-lg transition-colors duration-300",
                option.value === value
                  ? "bg-[#03BCA3]/20 text-gray-900"
                  : "hover:bg-gray-200 hover:text-gray-800"
              )}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500 mt-1 font-inter">{error}</p>}
    </div>
  );
};

export default Dropdown;
