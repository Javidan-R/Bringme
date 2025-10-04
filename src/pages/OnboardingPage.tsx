// src/pages/OnboardingPage.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  // updateFormData artıq lazım deyil, çünki hər komponent özü Redux-u yeniləyir.
  setCurrentStep, 
  resetFormData, 
  nextStep, // Yeni: Redux naviqasiya action-larını import et
  previousStep, // Yeni: Redux naviqasiya action-larını import et
} from "../features/onboardingSlice";
import { setUser, clearUser } from "../features/authSlice";
import {ModalQuestion} from "../components/common";
import { onboardingVariants } from "../lib/styles";
import { AncestryStep, EducationStep, FamilyStep, GeneralStep, MoneyStep, WorkStep } from "../components/steps";
import { FinalizeProfileModal, PackageSelectionPage } from "../components";
import { LeftSidebar } from "../components/layout";
// FormData type artıq step-ləri birləşdirmək üçün lazım deyil, store-da birləşib.

const steps = ["General", "Family", "Education", "Work", "Funds", "Ancestry"];

const OnboardingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Yalnız currentStep-i izləmək kifayətdir, çünki step komponentləri özləri datanı alacaq.
  const { currentStep } = useAppSelector((state) => state.onboarding);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  const styles = onboardingVariants();

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

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  
  const handleNext = useCallback(() => {
    if (isModalOpen) return;
    if (currentStep < steps.length) {
      dispatch(nextStep()); 
    } else {
      setShowFinalizeModal(true);
    }
  }, [currentStep, dispatch, isModalOpen]);

  const handlePrevious = useCallback(() => {
    if (isModalOpen) return;
    if (currentStep > 1) dispatch(previousStep());
  }, [currentStep, dispatch, isModalOpen]);

  const handleStepNavigation = useCallback(
    (stepNumber: number) => {
      if (isModalOpen) return;
      if (stepNumber >= 1 && stepNumber <= steps.length && stepNumber <= currentStep) {
        dispatch(setCurrentStep(stepNumber));
      }
    },
    [currentStep, dispatch, isModalOpen]
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

  // <<< Dəyişiklik 4: renderStepContent funksiyası komponentlərə yalnız naviqasiya prop-larını ötürür. >>>
  const renderStepContent = useMemo(() => {
    const props = {
      // handlePrevious və handleNext artıq sadəcə naviqasiya action-larını dispatch edir.
      onPrevious: handlePrevious,
      onNext: handleNext, 
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length,
    };

    switch (currentStep) {
      case 1:
        // 'data' və 'onSubmit' prop-ları silinib.
        return <GeneralStep {...props} />;
      case 2:
        return <FamilyStep {...props} />;
      case 3:
        return <EducationStep {...props} />;
      case 4:
        return <WorkStep {...props} />;
      case 5:
        return <MoneyStep {...props} />;
      case 6:
        return <AncestryStep {...props} />;
      default:
        return null;
    }
  }, [currentStep, handleNext, handlePrevious]); // 'formData' və 'handleStepSubmit' dependencies silindi

  if (!isLoaded) {
    return (
      <div className={styles.loading()}>
        <p className={styles.loadingText()}>Loading...</p>
      </div>
    );
  }

  if (showPackageSelection) return <PackageSelectionPage />;

  // Framer Motion variants for the main content
  const containerMotion = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: 0.4 } },
  };
  const itemMotion = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36 } },
  };

  return (
    <div className={styles.page()}>
      {/* Modal (first-visit) */}
      {isModalOpen && (
        <ModalQuestion
          title="Setting up your Visa Recommendations"
          question="To give you the best recommendations, we’ll ask you a few quick questions about your life, education, work, and what you’re looking for out of your move. ALL of these questions help us narrow in on potential work, investment, education, and ancestry based visas. It’s important to be detailed. You can’t change these answers after we’ve generated your report."
          onSubmit={handleModalClose}
          onClose={handleModalClose}
        />
      )}

      {/* Finalize profile modal */}
      {showFinalizeModal && (
        <FinalizeProfileModal onEdit={() => setShowFinalizeModal(false)} onFinalize={handleFinalize} />
      )}

      {/* Sidebar (LeftSidebar internally should avoid inline classes) */}
      <LeftSidebar
        steps={steps}
        currentStep={currentStep}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onStepClick={handleStepNavigation}
        onLogout={handleLogout}
        aria-label="Onboarding Steps Navigation"
      />

      {/* Main content */}
      <motion.main
        className={styles.main()}
        initial="hidden"
        animate="show"
        variants={containerMotion}
      >
        <div className={styles.inner()}>
          <motion.div className={styles.headerRow()} variants={itemMotion}>
            <h1 className={styles.stepTitle()}>{steps[currentStep - 1]}</h1>
          </motion.div>

          <motion.section className={styles.stepContent()} variants={itemMotion} aria-live="polite">
            {renderStepContent}
          </motion.section>

          {/* Example cards / summary (keeps previous placeholders but driven by tv) */}
          <motion.div className={styles.cardsGrid()} variants={itemMotion}>
            <div className={styles.card()}>
              <h2 className={styles.cardTitle()}>Visa Recommendations</h2>
              <p className={styles.cardDesc()}>
                View personalized visa options based on your profile.
              </p>
            </div>
            <div className={styles.card()}>
              <h2 className={styles.cardTitle()}>Next Steps</h2>
              <p className={styles.cardDesc()}>
                Complete your profile to unlock more features.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default OnboardingPage;