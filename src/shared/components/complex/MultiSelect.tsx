import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { multiSelect } from "../../../lib/styles";
import { MultiSelectProps } from "@/types/components";

const { wrapper, container, tag, tagText, removeButton, input, dropdown, option } = multiSelect();

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
    <div ref={wrapperRef} className={wrapper()}>
      <div className={`${container()} ${className}`} style={style}>
        {values.map((value) => (
          <div key={value} className={tag()}>
            <span className={tagText()}>{value}</span>
            <button onClick={() => handleRemove(value)} className={removeButton()} aria-label={`Remove ${value}`}>
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (options.length > 0 && e.target.value) setIsDropdownOpen(true);
          }}
          onFocus={() => options.length > 0 && setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !options.length) {
              e.preventDefault();
              handleAdd(inputValue);
            }
          }}
          placeholder={values.length === 0 ? placeholder : ""}
          className={input()}
          style={{ fontFamily: "Inter, sans-serif" }}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
        />
      </div>

      {options.length > 0 && isDropdownOpen && (
        <ul className={dropdown()} role="listbox" aria-label="Select options">
          {options
            .filter((optionText) => !values.includes(optionText) && optionText.toLowerCase().includes(inputValue.toLowerCase()))
            .map((optionText) => (
              <li
                key={optionText}
                onClick={() => handleAdd(optionText)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAdd(optionText);
                  }
                }}
                tabIndex={0}
                className={option()}
                role="option"
                aria-selected={values.includes(optionText)}
              >
                {optionText}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
