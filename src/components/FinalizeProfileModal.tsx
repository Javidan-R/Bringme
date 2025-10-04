import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { finalizeProfileModalVariants } from "../lib/styles/finalizeprofile";
import { FinalizeProfileModalProps } from "@/types/components";


const FinalizeProfileModal: React.FC<FinalizeProfileModalProps> = ({ 
  onEdit, 
  onFinalize 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const visibility = isOpen && !isClosing ? "open" : "closing";
  const styles = finalizeProfileModalVariants({ visibility });

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 50);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleFinalize = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      onFinalize();
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", handleFocusTrap);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", handleFocusTrap);
    };
  }, []);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={styles.overlay()}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className={styles.backdrop()}
        onClick={handleClose}
      />
      
      <div
        ref={modalRef}
        tabIndex={-1}
        className={styles.modal()}
        style={{
          background:
            "linear-gradient(0deg, #F4F0EF, #F4F0EF), linear-gradient(26.6deg, rgba(255, 255, 255, 0.2275) 71.33%, rgba(43, 212, 162, 0.35) 122.92%)",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(73.93deg, #2BD4A2 -5.87%, rgba(43, 212, 162, 0.25) 11.51%, rgba(43, 212, 162, 0.65) 72.1%, #2BD4A2 95.89%)",
          borderImageSlice: 1,
          boxShadow: "0px 4px 80px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h2
          id="modal-title"
          className={styles.title()}
        >
          Finalize Your Profile
        </h2>
        <p className={styles.description()}>
          You're about to create your personalized reports based on your current answers. Once submitted, your profile cannot be edited and will be used to generate all recommendations. Please review your information carefully before confirming.
        </p>
        <div className={styles.buttonsWrapper()}>
          <button
            onClick={onEdit}
            className={styles.editButton()}
          >
            <ArrowLeft className={styles.icon()} />
            Edit Profile
          </button>
          <button
            onClick={handleFinalize}
            className={styles.finalizeButton()}
          >
            Finalize
            <Check className={styles.icon()} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalizeProfileModal;