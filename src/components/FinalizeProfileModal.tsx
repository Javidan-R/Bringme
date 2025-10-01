import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface FinalizeProfileModalProps {
  onEdit: () => void;
  onFinalize: () => void;
}

const FinalizeProfileModal: React.FC<FinalizeProfileModalProps> = ({ onEdit, onFinalize }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Komponent yükləndikdən qısa müddət sonra modalı açır
    setTimeout(() => setIsOpen(true), 50);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Kapanma animasyon süresi
  };

  const handleFinalize = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      onFinalize();
    }, 300); // Kapanma animasyon süresi
  };

  useEffect(() => {
    // ESC basıldığında modalı bağlama
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    // Fokus tələsi (Focus Trap)
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
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      {/* DƏYİŞİKLİK BURADADIR: 
        bg-opacity-50 və backdrop-blur-sm silinib, 
        tam qara (bg-black) və tam şəffaf olmayan (opacity-100, lakin əslində bg-opacity-100 olmalıdır) istifadə olunur. 
        Tailwind-də bg-black adətən bg-opacity-100 deməkdir, amma kodu daha aydın etmək üçün bu şəkildə dəyişdiririk.
      */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-100 transition-opacity duration-300 ${
          isOpen && !isClosing ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>
      
      {/* Modalın özü */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative flex flex-col gap-[24px] w-[90%] max-w-[343px] bg-[#F4F0EF] rounded-[16px] p-[24px] transition-all duration-300 transform ${
          isOpen && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } md:max-w-[553px] md:p-[42px_36px_36px_36px]`}
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
          className="text-[24px] font-bold text-[#1F2A44] text-center leading-[32px] md:text-[30px] md:leading-[40px]"
          style={{ fontFamily: "Cormorant, serif" }}
        >
          Finalize Your Profile
        </h2>
        <p
          className="text-[14px] text-[#6B7280] text-center leading-[20px] flex-1 md:text-[16px] md:leading-[24px]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          You’re about to create your personalized reports based on your current answers. Once submitted, your profile cannot be edited and will be used to generate all recommendations. Please review your information carefully before confirming.
        </p>
        <div className="flex flex-col gap-[16px] sm:flex-row sm:justify-between mt-auto">
          <button
            onClick={onEdit}
            className="flex items-center gap-[8px] text-[#6B7280] text-[14px] leading-[20px] hover:text-[#1F2A44] transition-colors md:text-[16px] md:leading-[24px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <ArrowLeft className="w-[20px] h-[20px]" />
            Edit Profile
          </button>
          <button
            onClick={handleFinalize}
            className="flex items-center gap-[8px] bg-[#1F2A44] text-white rounded-[16px] px-[24px] py-[12px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] hover:bg-[#374151] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Finalize
            <Check className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalizeProfileModal;