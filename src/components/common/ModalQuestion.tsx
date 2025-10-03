import { ModalQuestionProps } from "@/types/components";
import { modal } from "../../lib/styles/modal";
import Button from "./Button";


const { overlay, content, title: titleClass, description, bold, buttonWrapper } = modal();

const ModalQuestion: React.FC<ModalQuestionProps> = ({ title, question, onSubmit, onClose }) => {
  const parts = question.split("You can’t change these answers after we’ve generated your report.");
  const boldSentence = "You can’t change these answers after we’ve generated your report.";

  return (
    <div className={overlay()} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div
        className={content()}
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(0deg, #F4F0EF, #F4F0EF), linear-gradient(26.6deg, rgba(255, 255, 255, 0.2275) 71.33%, rgba(43, 212, 162, 0.35) 122.92%)",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(73.93deg, #2BD4A2 -5.87%, rgba(43, 212, 162, 0.25) 11.51%, rgba(43, 212, 162, 0.65) 72.1%, #2BD4A2 95.89%)",
          borderImageSlice: 1,
          boxShadow: "0px 0.25rem 5rem rgba(0, 0, 0, 0.25)",
        }}
      >
        <h2 id="modal-title" className={titleClass()} style={{ fontFamily: "Cormorant, serif" }}>
          {title}
        </h2>

        <p className={description()} style={{ fontFamily: "Inter, sans-serif" }}>
          {parts[0]}
          <span className={bold()}>{boldSentence}</span>
          {parts[1]}
        </p>

        <div className={buttonWrapper()}>
          <Button
            onClick={onSubmit}
            className="bg-[#1F2A44] text-white rounded-[1rem] px-6 py-3 text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem] hover:bg-[#374151] transition-colors"
          >
            Got It
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalQuestion;
