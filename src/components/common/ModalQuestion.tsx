import { X } from "lucide-react";
import Button from "./Button";

interface ModalQuestionProps {
  title: string;
  question: string;
  onSubmit: () => void;
  onClose: () => void;
}

const ModalQuestion: React.FC<ModalQuestionProps> = ({
  title,
  question,
  onSubmit,
  onClose,
}) => {
  // Split the question into parts to bold the specific sentence
  const parts = question.split("You can’t change these answers after we’ve generated your report.");
  const boldSentence = "You can’t change these answers after we’ve generated your report.";

  return (
    <div
      // Arxa planı yüngül qaraltma və bulanıq etmək
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      // Arxa plana klikləməklə bağlama funksiyası (əgər tələb olunursa)
      onClick={onClose}
    >
      <div
        // Modalın özünün yeni dizaynı
        className="relative flex flex-col gap-[24px] rounded-[16px] p-[24px] w-[90%] max-w-[343px] md:max-w-[553px] md:p-[42px_36px_36px_36px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          // Şəkildəki açıq arxa fonu və parıltılı haşiyəni simulyasiya edir
          background:
            "linear-gradient(0deg, #F4F0EF, #F4F0EF), linear-gradient(26.6deg, rgba(255, 255, 255, 0.2275) 71.33%, rgba(43, 212, 162, 0.35) 122.92%)",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(73.93deg, #2BD4A2 -5.87%, rgba(43, 212, 162, 0.25) 11.51%, rgba(43, 212, 162, 0.65) 72.1%, #2BD4A2 95.89%)",
          borderImageSlice: 1,
          boxShadow: "0px 4px 80px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Şəkildə X düyməsi olmadığı üçün silinir */}
        
        <h2
          id="modal-title"
          className="text-[24px] font-bold text-[#1F2A44] text-center leading-[32px] md:text-[30px] md:leading-[40px]"
          style={{ fontFamily: "Cormorant, serif" }}
        >
          {title}
        </h2>
        
        <p
          className="text-[14px] text-[#6B7280] text-center leading-[20px] flex-1 md:text-[16px] md:leading-[24px]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {parts[0]}
          <span className="font-bold">{boldSentence}</span>
          {parts[1]}
        </p>

        <div className="flex justify-center">
          {/* Got It düyməsini şəkildəki kimi qara/tünd rəngli etmək üçün Button komponentini yoxlayın. 
          Hazırkı Button komponentinin necə göründüyünü bilmədiyim üçün yalnız onClick funksiyasını saxlayıram. */}
          <Button 
            onClick={onSubmit}
            className="bg-[#1F2A44] text-white rounded-[16px] px-[24px] py-[12px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] hover:bg-[#374151] transition-colors"
          >
            Got It
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalQuestion;