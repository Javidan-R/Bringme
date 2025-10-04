// src/hooks/useOnboarding.ts
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setUser, clearUser } from "../../../modules/Auth/slice";
import { nextStep, previousStep, setCurrentStep, resetFormData } from "../slice";


const steps = ["General", "Family", "Education", "Work", "Funds", "Ancestry"];

export const useOnboarding = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  const { currentStep } = useAppSelector((state) => state.onboarding);

  // New states
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepTime, setStepTime] = useState<{ [key: number]: number }>({});
  const [stepStartTime, setStepStartTime] = useState<number | null>(null);

  // Auth kontrol
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && user) {
      dispatch(
        setUser({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        })
      );
    } else {
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
  }, [isLoaded, isSignedIn, user, dispatch, navigate]);

  // Step vaxtını izləmək
  useEffect(() => {
    if (stepStartTime) {
      const duration = Date.now() - stepStartTime;
      setStepTime((prev) => ({ ...prev, [currentStep]: (prev[currentStep] || 0) + duration }));
    }
    setStepStartTime(Date.now());
  }, [currentStep]);

  // Auto-save currentStep
  useEffect(() => {
    localStorage.setItem("onboardingState", JSON.stringify({ currentStep, completedSteps }));
  }, [currentStep, completedSteps]);

  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const handleNext = useCallback(() => {
    if (isModalOpen) return;
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    if (currentStep < steps.length) {
      dispatch(nextStep());
    } else {
      setShowFinalizeModal(true);
    }
  }, [isModalOpen, currentStep, completedSteps, dispatch]);

  const handlePrevious = useCallback(() => {
    if (isModalOpen) return;
    if (currentStep > 1) dispatch(previousStep());
  }, [isModalOpen, currentStep, dispatch]);

  const handleStepNavigation = useCallback(
    (stepNumber: number) => {
      if (isModalOpen) return;
      if (stepNumber >= 1 && stepNumber <= steps.length && stepNumber <= currentStep) {
        dispatch(setCurrentStep(stepNumber));
      }
    },
    [isModalOpen, currentStep, dispatch]
  );

  const handleFinalize = useCallback(() => {
    setShowFinalizeModal(false);
    setShowPackageSelection(true);
    dispatch(resetFormData());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    signOut();
    dispatch(clearUser());
    dispatch(resetFormData());
    navigate("/login", { replace: true });
  }, [signOut, dispatch, navigate]);

  return {
    steps,
    currentStep,
    isLoaded,
    isModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    showFinalizeModal,
    showPackageSelection,
    completedSteps,
    stepTime,
    handleModalClose,
    handleNext,
    handlePrevious,
    handleStepNavigation,
    handleFinalize,
    handleLogout,
    setShowFinalizeModal,
  };
};
