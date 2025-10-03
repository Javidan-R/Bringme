import { useEffect, useRef, useState } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import Logo from "../../assets/images/BringMeAbroad_Logo.png";
import StepItem from "../common/StepItem";
import { leftSidebarVariants, stepIndicatorVariants } from "../../lib/styles/layout";


interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const styles = stepIndicatorVariants();

  return (
    <div className={styles.container()}>
      {steps.map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        const dotState = isCompleted ? "completed" : isActive ? "active" : "inactive";

        return (
          <div
            key={index}
            className={stepIndicatorVariants({ dotState }).dot()}
          />
        );
      })}
    </div>
  );
};

interface LeftSidebarProps {
  steps?: string[];
  currentStep?: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onStepClick?: (stepNumber: number) => void;
  onLogout: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  steps = [],
  currentStep = 1,
  isMenuOpen,
  setIsMenuOpen,
  onStepClick,
  onLogout,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const menuState = isMenuOpen ? "open" : "closed";
  const chevronState = isSupportOpen ? "open" : "closed";
  const styles = leftSidebarVariants({ menuState, chevronState });

  if (steps.length > 0) {
    console.log(`LeftSidebar: currentStep=${currentStep}`);
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        setIsSupportOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!sidebarRef.current || !isMenuOpen) return;
      const focusableElements = sidebarRef.current.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
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
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && sidebarRef.current) {
      sidebarRef.current.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsSupportOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, setIsMenuOpen]);

  const supportOptions = [
    { label: "General", subject: "General Inquiry" },
    { label: "Billing & Payment", subject: "Billing & Payment Inquiry" },
    { label: "Technical Issue", subject: "Technical Issue" },
    { label: "Feature Request", subject: "Feature Request" },
  ];

  const handleSupportOptionClick = (subject: string) => {
    const email = "support@conveer.app";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
    setIsSupportOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      {steps.length > 0 && (
        <div className={styles.mobileHeader()}>
          <div className={styles.mobileHeaderRow()}>
            <img
              src={Logo}
              alt="Bring Me Abroad Logo"
              className={styles.logo()}
            />
            <div className={styles.setupGroup()}>
              <span className={styles.setupLabel()}>
                Setup
              </span>
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={styles.menuButton()}
            >
              <Menu className={styles.menuIcon()} />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={styles.sidebar()}
        role="navigation"
        aria-label={steps.length > 0 ? "Onboarding steps" : "Dashboard navigation"}
        tabIndex={-1}
      >
        <div className={styles.sidebarHeader()}>
          <img
            src={Logo}
            alt="Bring Me Abroad Logo"
            className={styles.logo()}
          />
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsSupportOpen(false);
            }}
            aria-label="Close menu"
            className={styles.closeButton()}
          >
            <X className={styles.menuIcon()} />
          </button>
        </div>

        {steps.length > 0 && (
          <>
            <div className={styles.sectionTitleWrapper()}>
              <h2 className={styles.sectionTitle()}>
                Recommendations Setup
              </h2>
            </div>
            <div className={styles.stepsContainer()}>
              {steps.map((stepLabel, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;

                console.log(
                  `Rendering Step ${stepNumber}: currentStep=${currentStep}, isActive=${isActive}, isCompleted=${isCompleted}`
                );

                return (
                  <StepItem
                    key={stepLabel}
                    stepNumber={stepNumber}
                    label={stepLabel}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    onClick={() => onStepClick?.(stepNumber)}
                  />
                );
              })}
            </div>
          </>
        )}

        <div className={styles.footerContainer()}>
          {/* Support Tab with Dropdown */}
          <div className={styles.supportDropdownWrapper()}>
            <button
              onClick={() => setIsSupportOpen(!isSupportOpen)}
              className={styles.supportButton()}
              aria-expanded={isSupportOpen}
              aria-label="Support menu"
            >
              <svg className={styles.supportIcon()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 9v3m0 0v3m-3 0H9"
                />
              </svg>
              <span className={styles.supportLabel()}>Support</span>
              <ChevronDown className={styles.chevronIcon()} />
            </button>
            {isSupportOpen && (
              <div className={styles.dropdownMenu()}>
                {supportOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSupportOptionClick(option.subject)}
                    className={styles.dropdownItem()}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout Tab */}
          <button
            onClick={onLogout}
            className={styles.logoutButton()}
            aria-label="Logout"
          >
            <svg className={styles.logoutIcon()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className={styles.logoutLabel()}>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default LeftSidebar;