import { tv } from "tailwind-variants";

export const modal = tv({
  slots: {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
    content:
      "relative flex flex-col gap-6 rounded-[1rem] w-[90%] max-w-[21.4375rem] md:max-w-[34.5625rem] md:p-[2.625rem_2.25rem_2.25rem_2.25rem] transition-all",
    title: "text-[1.5rem] md:text-[1.875rem] font-bold text-[#1F2A44] text-center leading-[2rem] md:leading-[2.5rem]",
    description: "text-[0.875rem] md:text-[1rem] text-[#6B7280] text-center leading-[1.25rem] md:leading-[1.5rem] flex-1",
    bold: "font-bold",
    buttonWrapper: "flex justify-center",
  },
});
