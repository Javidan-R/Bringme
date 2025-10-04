import { motion } from "framer-motion";
import { onboardingVariants } from "../lib/styles";
import { AncestryStep, EducationStep, FamilyStep, GeneralStep, MoneyStep, WorkStep } from "../modules/Checkout/components";
import { LeftSidebar } from "../shared/components/layout";
import { FinalizeProfileModal, ModalQuestion, PackageSelectionPage } from "../modules/Onboarding/components";
import { useOnboarding } from "../modules/Onboarding/hooks/useOnboarding";
const OnboardingPage: React.FC = () => {
  const {
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
  } = useOnboarding();

  const styles = onboardingVariants();

  if (!isLoaded) {
    return (
      <div className={styles.loading()}>
        <p className={styles.loadingText()}>Loading...</p>
      </div>
    );
  }

  if (showPackageSelection) return <PackageSelectionPage />;

  const renderStepContent = () => {
    const props = {
      onPrevious: handlePrevious,
      onNext: handleNext,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length,
    };

    switch (currentStep) {
      case 1: return <GeneralStep {...props} />;
      case 2: return <FamilyStep {...props} />;
      case 3: return <EducationStep {...props} />;
      case 4: return <WorkStep {...props} />;
      case 5: return <MoneyStep {...props} />;
      case 6: return <AncestryStep {...props} />;
      default: return null;
    }
  };

  return (
    <div className={styles.page()}>
      {isModalOpen && (
        <ModalQuestion
          title="Setting up your Visa Recommendations"
          question="We’ll ask you a few quick questions..."
          onSubmit={handleModalClose}
          onClose={handleModalClose}
        />
      )}

      {showFinalizeModal && (
        <FinalizeProfileModal
          onEdit={() => setShowFinalizeModal(false)}
          onFinalize={handleFinalize}
        />
      )}

      <LeftSidebar
        steps={steps}
        currentStep={currentStep}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onStepClick={handleStepNavigation}
        onLogout={handleLogout}
        completedSteps={completedSteps}
      />

      <motion.main className={styles.main()} initial="hidden" animate="show">
        <div className={styles.inner()}>
          <h1 className={styles.stepTitle()}>{steps[currentStep - 1]}</h1>
          <section className={styles.stepContent()}>{renderStepContent()}</section>
        </div>
      </motion.main>
    </div>
  );
};

export default OnboardingPage;
