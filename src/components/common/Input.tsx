import { useState } from "react";
import clsx from "clsx";
import { InputProps } from "../../types/components";

const Input: React.FC<InputProps> = ({ label, className = "", error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full mx-auto min-w-[18.3125rem] max-w-[29.75rem]">
      {error && <p className="text-xs text-red-500 mt-1 font-inter">{error}</p>}

      <input
        className={clsx(
          "w-full bg-[#F5F2F0] border rounded-lg text-base transition-all duration-200 font-inter placeholder:text-gray-500 focus:outline-none h-[48px] px-3 md:h-[56px] md:px-4 py-2",
          isFocused && "border-[#03BCA3] ring-1 ring-[#03BCA3]",
          error && "border-red-400 ring-2 ring-red-200",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeholder || label || "Enter value"}
        {...props}
      />
    </div>
  );
};

export default Input;
