import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}
 export interface LoginContainerProps {
  children: ReactNode;
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'; 
  showArrow?: boolean; 
  arrowDirection?: 'left' | 'right'; 
  className?: string; 
  children: React.ReactNode; 
}
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  id?: string; 
}


export interface DropdownProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  placeholder?: string;
}



export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; 
  className?: string; 
}

export interface ModalQuestionProps {
  title: string; 
  onSubmit: () => void; 
  onClose: () => void;
}

export  interface StepIndicatorProps {
  steps: string[];
  currentStep: number; 
}


export interface StepperProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  completedSteps?: number[];  
}

export interface ModalQuestionProps {
  title: string;
  question: string;
  onSubmit: () => void;
  onClose: () => void;
}
 
export interface MultiSelectProps {
  id?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  options?: string[];
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
  style?: React.CSSProperties;
}


export interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface NumberInputProps {
  id?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder: string;
  icon?: React.ReactNode | null;
  min?: number;
  max?: number;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ToggleButtonsProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labels?: [string, string];
}

export interface FinalizeProfileModalProps {
  onEdit: () => void;
  onFinalize: () => void;
}
export interface LeftSidebarProps {
  steps?: string[];
  currentStep?: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onStepClick?: (stepNumber: number) => void;
  onLogout: () => void;
  completedSteps?: number[];
}
