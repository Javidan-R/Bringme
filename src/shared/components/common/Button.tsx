import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { ButtonProps } from "../../../types/components";
import { button } from "../../../lib/styles";
type ArrowDirection = "left" | "right";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  showArrow,
  arrowDirection,
  className,
  ...props
}) => {
  const isArrowVisibleByDefault = variant === "primary";
  const defaultArrowDirection = variant === "primary" ? "right" : "left";
  const shouldDisplayArrow = showArrow ?? isArrowVisibleByDefault;
  const arrowDirectionFinal: ArrowDirection = arrowDirection ?? defaultArrowDirection;

  const arrowClasses = clsx("w-5 h-5", variant === "primary" ? "text-white" : "text-black");
  const arrowComponent = arrowDirectionFinal === "right" ? <ArrowRight className={arrowClasses} /> : <ArrowLeft className={arrowClasses} />;

  return (
    <button className={button({ variant, className })} {...props}>
      {variant === "primary" && (
        <span
          className="absolute inset-0 rounded-[1.5rem]"
          style={{
            boxShadow:
              "0 0 20px 5px rgba(255, 100, 200, 0.5), 0 0 10px 1px rgba(255, 50, 150, 0.3)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {shouldDisplayArrow && arrowDirectionFinal === "left" && arrowComponent}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {shouldDisplayArrow && arrowDirectionFinal === "right" && arrowComponent}
    </button>
  );
};

export default Button;
