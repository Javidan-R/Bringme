import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import LeftSidebar from "../components/layout/LeftSidebar";
import ModalQuestion from "../components/common/ModalQuestion";
import GeneralStep from "../components/steps/GeneralStep";
import FamilyStep from "../components/steps/FamilyStep";
import EducationStep from "../components/steps/EducationStep";
import WorkStep from "../components/steps/WorkStep";
import MoneyStep from "../components/steps/MoneyStep";
import AncestryStep from "../components/steps/AncestryStep";

import { useAppSelector, useAppDispatch } from "../hooks";
import {
  updateFormData,
  setCurrentStep,
  resetFormData,
} from "../features/onboardingSlice";
import { setUser, clearUser } from "../features/authSlice";
import { useEffect, useState, useCallback, useMemo } from "react";
import PackageSelectionPage from "../components/PackageSelectionPage";
import FinalizeProfileModal from "../components/FinalizeProfileModal";

interface FormData {
  general: {
    nationality: string[];
    age: number | null;
    homeSize: number | null;
    bedrooms: number | null;
    regions: string[];
  };
  family: {
    hasPartner: string;
    partnerNationality: string[];
    hasChildren: boolean;
  };
  education: {
    highestLevel: string;
    field: string;
    interestedInEducationVisa: boolean;
    educationFields: string;
  };
  work: {
    remoteWork: string;
    passiveIncome: number | null;
    jobType: string;
    monthlyIncome: number | null;
    interestedInBusinessVisa: boolean;
  };
  money: {
    interestedInInvestmentVisa: boolean;
    savings: number | null;
  };
  ancestry: {
    hasAncestry: boolean;
    relatives: { relative: string; passport: string }[];
  };
}

const steps = ["General", "Family", "Education", "Work", "Funds", "Ancestry"];

const OnboardingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  const { formData, currentStep } = useAppSelector((state) => state.onboarding);
  
  // *** ƏSAS DƏYİŞİKLİK: Modalın ilkin dəyərini TRUE olaraq təyin edirik.
  // Bu, səhifə yüklənən kimi modalın görünməsini təmin edir.
  const [isModalOpen, setIsModalOpen] = useState(true); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  /** Check if the user is signed in and show modal if first visit */
  useEffect(() => {
    if (!isLoaded) return;

    // *** LOCAL STORAGE YOXLAMASI LƏĞV EDİLİR, ÇÜNKİ İLKİN DƏYƏR TRUE-dur.
    // Əgər modalı yalnız bir dəfə göstərmək istəsəniz, bu hissəni bərpa edə bilərsiniz:
    // const hasSeenModal = localStorage.getItem("hasSeenOnboardingModal");
    // if (!hasSeenModal) setIsModalOpen(true);

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

  /** Modal close handler */
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    // Hər dəfə açılma tələbinə uyğun olaraq, bu sətir lazım deyil:
    // localStorage.setItem("hasSeenOnboardingModal", "true");
  }, []);

  /** Handle form step submission */
  const handleStepSubmit = useCallback(
    (stepData: Partial<FormData[keyof FormData]>, stepName: keyof FormData) => {
      dispatch(updateFormData({ stepName, data: stepData }));
    },
    [dispatch]
  );

  /** Navigate to next step or show finalize modal */
  const handleNext = useCallback(() => {
    // Əgər modal hələ də açıqdırsa, heç nə etmə
    if (isModalOpen) return; 

    if (currentStep < steps.length) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      setShowFinalizeModal(true);
    }
  }, [currentStep, dispatch, isModalOpen]);

  /** Navigate to previous step */
  const handlePrevious = useCallback(() => {
    // Əgər modal hələ də açıqdırsa, heç nə etmə
    if (isModalOpen) return;

    if (currentStep > 1) dispatch(setCurrentStep(currentStep - 1));
  }, [currentStep, dispatch, isModalOpen]);

  /** Navigate to a specific step */
  const handleStepNavigation = useCallback(
    (stepNumber: number) => {
      // Əgər modal hələ də açıqdırsa, heç nə etmə
      if (isModalOpen) return;

      if (stepNumber >= 1 && stepNumber <= steps.length && stepNumber <= currentStep) {
        dispatch(setCurrentStep(stepNumber));
      }
    },
    [currentStep, dispatch, isModalOpen]
  );

  /** Finalize onboarding and show package selection */
  const handleFinalize = useCallback(() => {
    setShowFinalizeModal(false);
    setShowPackageSelection(true);
    dispatch(resetFormData());
  }, [dispatch]);

  /** Logout user */
  const handleLogout = useCallback(() => {
    signOut();
    dispatch(clearUser());
    dispatch(resetFormData());
    navigate("/login", { replace: true });
  }, [signOut, dispatch, navigate]);

  /** Render the current step content */
  const renderStepContent = useMemo(() => {
    const props = {
      onPrevious: handlePrevious,
      onNext: handleNext,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length,
    };

    switch (currentStep) {
      case 1:
        return (
          <GeneralStep
            data={formData.general}
            onSubmit={(data) => handleStepSubmit(data, "general")}
            {...props}
          />
        );
      case 2:
        return (
          <FamilyStep
            data={formData.family}
            onSubmit={(data) => handleStepSubmit(data, "family")}
            {...props}
          />
        );
      case 3:
        return (
          <EducationStep
            data={formData.education}
            onSubmit={(data) => handleStepSubmit(data, "education")}
            {...props}
          />
        );
      case 4:
        return (
          <WorkStep
            data={formData.work}
            onSubmit={(data) => handleStepSubmit(data, "work")}
            {...props}
          />
        );
      case 5:
        return (
          <MoneyStep
            data={formData.money}
            onSubmit={(data) => handleStepSubmit(data, "money")}
            {...props}
          />
        );
      case 6:
        return (
          <AncestryStep
            data={formData.ancestry}
            onSubmit={(data) => handleStepSubmit(data, "ancestry")}
            {...props}
          />
        );
      default:
        return null;
    }
  }, [currentStep, formData, handleNext, handlePrevious, handleStepSubmit]);

  /** Loading state */
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F0EF] to-[#FFF]">
        <p className="text-[#1F2A44] text-base font-inter">Loading...</p>
      </div>
    );
  }

  /** Show package selection if finalized */
  if (showPackageSelection) return <PackageSelectionPage />;

  /** Main Onboarding Page */
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-[#F4F0EF] to-[#FFF]">
      {/* First visit modal */}
      {/* isModalOpen TRUE olduğu üçün, səhifə açılan kimi görünəcək */}
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
        <FinalizeProfileModal
          onEdit={() => setShowFinalizeModal(false)}
          onFinalize={handleFinalize}
        />
      )}

      {/* Sidebar */}
      <LeftSidebar
        steps={steps}
        currentStep={currentStep}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        // Modal açıq olduqda naviqasiyanı bloklayır (istifadəçinin addımlara keçməsinin qarşısını alır)
        onStepClick={handleStepNavigation} 
        onLogout={handleLogout}
        aria-label="Onboarding Steps Navigation"
      />

      {/* Step Content */}
      <div className="flex-1 p-4 md:ml-[17.5rem] md:p-10 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto md:mx-[3rem]">
          <div className="flex justify-between items-center mb-6">
            <h1
              className="text-[1.5rem] font-bold text-[#1F2A44] leading-[2rem] md:text-[1.875rem] md:leading-[2.5rem]"
              style={{ fontFamily: "Cormorant, serif" }}
            >
              {steps[currentStep - 1]}
            </h1>
          </div>
          <main aria-live="polite">{renderStepContent}</main>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;