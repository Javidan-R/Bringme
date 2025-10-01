import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

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


export interface StepItemProps {
  stepNumber: number;
  label: string;
  isActive: boolean; 
  isCompleted: boolean;
  onClick: () => void;
}