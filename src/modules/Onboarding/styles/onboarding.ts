// src/lib/styles/onboarding.ts
import { tv } from "tailwind-variants";

export const onboardingVariants = tv({
  slots: {
    // page wrapper
    page: [
      "flex",
      "flex-col",
      "md:flex-row",
      "min-h-screen",
      "bg-gradient-to-b",
      "from-[#F4F0EF]",
      "to-[#FFF]",
    ],

    // main content area (takes into account sidebar width on md+)
    main: [
      "flex-1",
      "p-4",
      "overflow-y-auto",
      "md:p-10",
      "md:ml-[17.5rem]", // keeps same visual offset as before (no inline in component)
    ],

    // inner container to limit width and center
    inner: ["max-w-[1200px]", "mx-auto", "md:mx-[3rem]"],

    // header row with title and actions
    headerRow: ["flex", "justify-between", "items-center", "mb-6"],

    // step/title typography
    stepTitle: [
      "text-[1.5rem]",
      "font-bold",
      "text-[#1F2A44]",
      "leading-[2rem]",
      "md:text-[1.875rem]",
      "md:leading-[2.5rem]",
      "font-cormorant",
    ],

    // content wrapper for the form area
    stepContent: [
      "bg-transparent",
      "rounded-lg",
      "transition-all",
      "duration-300",
      "animate-in",
      "fade-in",
      "slide-in-from-bottom-4",
    ],

    // modals/wrappers (keeps page overlay style when modal open)
    modalBackdrop: [
      "fixed",
      "inset-0",
      "z-50",
      "flex",
      "items-center",
      "justify-center",
      "bg-black/50",
      "backdrop-blur-sm",
    ],

    // small utility classes for messages / status
    loading: ["flex", "items-center", "justify-center", "min-h-screen"],
    loadingText: ["text-[#1F2A44]", "text-base", "font-inter"],

    // grid for cards
    cardsGrid: ["mt-6", "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"],

    // card style
    card: [
      "p-6",
      "bg-white",
      "rounded-[16px]",
      "shadow-[0_8px_20px_-8px_rgba(0,0,0,0.12)]",
      "transition-transform",
      "duration-200",
      "hover:translate-y-[-6px]",
    ],
    cardTitle: ["text-[20px]", "font-bold", "text-[#1F2A44]", "mb-2", "font-cormorant"],
    cardDesc: ["text-[14px]", "text-[#6B7280]", "leading-[20px]", "font-inter"],
  },
});
