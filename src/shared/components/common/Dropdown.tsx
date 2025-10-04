import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DropdownProps } from "../../../types/components";

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
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>
      <div
        className={`dropdown-wrapper ${error ? "dropdown-wrapper--error" : ""} ${
          isOpen ? "dropdown-wrapper--open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`dropdown-text ${value ? "" : "dropdown-text--placeholder"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp
            className={`dropdown-icon ${isOpen ? "dropdown-icon--open" : ""}`}
          />
        ) : (
          <ChevronDown
            className={`dropdown-icon ${isOpen ? "dropdown-icon--open" : ""}`}
          />
        )}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${
                option.value === value
                  ? "dropdown-item--selected"
                  : "dropdown-item--hover"
              }`}
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
      {error && <p className="dropdown-error">{error}</p>}
    </div>
  );
};

export default Dropdown;