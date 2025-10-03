import { useState } from "react";
import clsx from "clsx";
import { input } from "../../lib/styles/ui";
import { InputProps } from "../../types/components";

const Input: React.FC<InputProps> = ({ label, className, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const state = error ? "error" : isFocused ? "focused" : "normal";

  return (
    <div className="flex flex-col gap-2 w-full mx-auto min-w-[18.3125rem] max-w-[29.75rem]">
      {error && <p className="text-xs text-red-500 mt-1 font-inter">{error}</p>}
      <input
        className={clsx(input({ state }), className)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeholder || label || "Enter value"}
        {...props}
      />
    </div>
  );
};

export default Input;
