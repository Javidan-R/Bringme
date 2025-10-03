import { Check } from "lucide-react";
import { stepItemVariants } from "../../lib/styles/ui";
import { StepItemProps } from "../../types/components";





const StepItem: React.FC<StepItemProps> = ({
  stepNumber,
  label,
  isActive,
  isCompleted,
  onClick,
}) => {
  console.log(`StepItem ${stepNumber}: isActive=${isActive}, isCompleted=${isCompleted}`);

  const isNumberVisible = !isCompleted;
  const isCheckVisible = isCompleted;

  const state = isCompleted ? "completed" : isActive ? "active" : "inactive";
  const styles = stepItemVariants({ state });

  return (
    <button
      className={styles.button()}
      onClick={onClick}
      aria-current={isActive ? "step" : undefined}
      aria-label={`Step ${stepNumber}: ${label}`}
    >
      <div className={styles.indicator()}>
        <div className={styles.circle()} />
        {isNumberVisible && (
          <span className={styles.number()}>
            {stepNumber}
          </span>
        )}
        {isCheckVisible && (
          <Check className={styles.checkmark()} />
        )}
      </div>
      <span className={styles.label()}>
        {label}
      </span>
    </button>
  );
};

export default StepItem;