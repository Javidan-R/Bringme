import { useEffect, useRef, useState } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import Logo from "../../assets/images/BringMeAbroad_Logo.png";
import StepItem from "../common/StepItem";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex content-center items-center gap-2 bg-[#EEE8E6] px-3 py-2 border-white rounded-[250px] shadow-sm">
      {steps.map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;

        return (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              isCompleted
                ? "w-3 h-3 bg-green-500"
                : isActive
                ? "w-4 h-4 bg-white border-2 border-green-500 shadow-md scale-105"
                : "w-3 h-3 bg-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};

interface LeftSidebarProps {
  steps?: string[]; // Optional: Only passed during onboarding
  currentStep?: number; // Optional: Only passed during onboarding
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onStepClick?: (stepNumber: number) => void; // Optional: Only passed during onboarding
  onLogout: () => void; // Required: For logout functionality
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

  // Debug logging to verify currentStep
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
        <div
          className={`flex flex-col px-4 py-3 bg-[#FCF7F6] shadow-sm md:hidden fixed top-0 left-0 w-full z-50 transition-opacity duration-300 border-b border-gray-200 ${
            isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <img
              src={Logo}
              alt="Bring Me Abroad Logo"
              className="w-[120px]"
            />
            <div className="flex items-center gap-3">
              <span
                className="text-[1rem] font-semibold text-gray-800"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Setup
              </span>
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`flex flex-col py-6 px-6 w-full bg-[#FCF7F6] shadow-lg fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[280px] md:h-screen md:top-0 md:left-0 md:shadow-md md:flex`}
        role="navigation"
        aria-label={steps.length > 0 ? "Onboarding steps" : "Dashboard navigation"}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between mb-10">
          <img
            src={Logo}
            alt="Bring Me Abroad Logo"
            className="w-[150px] md:w-[150px]"
          />
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsSupportOpen(false);
            }}
            aria-label="Close menu"
            className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded md:hidden p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {steps.length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Recommendations Setup
              </h2>
            </div>
            <div className="flex flex-col gap-1 w-full">
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

        <div className="mt-auto">
          {/* Support Tab with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSupportOpen(!isSupportOpen)}
              className="flex items-center gap-3 py-3 text-gray-800 hover:text-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              aria-expanded={isSupportOpen}
              aria-label="Support menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 9v3m0 0v3m-3 0H9"
                />
              </svg>
              <span className="text-sm font-medium">Support</span>
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                  isSupportOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isSupportOpen && (
              <div className="absolute bottom-full left-0 w-full bg-white shadow-lg rounded-lg py-2 mb-2 z-50">
                {supportOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSupportOptionClick(option.subject)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
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
            className="flex items-center gap-3 py-3 text-gray-800 hover:text-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
            aria-label="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default LeftSidebar;