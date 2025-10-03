// styles/ui.ts
import { tv } from "tailwind-variants";
 //!SECTION: Button

export const form = tv({
  slots: {
    wrapper: "flex flex-col gap-6 w-full",
    label: "text-[#1F2A44] font-medium text-sm md:text-base leading-5 md:leading-6 font-inter",
    input: "w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#03BCA3] focus:border-[#03BCA3] p-2 text-[#1F2A44] text-sm md:text-base font-inter outline-none transition-all duration-200",
    checkboxWrapper: "flex items-center gap-2",
    checkbox: "w-4 h-4 text-[#03BCA3] rounded transition-all duration-200",
    button: "w-full rounded-lg py-3 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#03BCA3]",
    primaryButton: "bg-[#1F2A44] hover:bg-[#374151]",
    outlineButton: "bg-white border border-[#1F2A44] text-[#1F2A44] hover:bg-gray-100",
  },
});

export const layout = tv({
  slots: {
    loginContainer: "flex flex-col md:flex-row min-h-screen",
    left: "flex-1 flex items-center justify-center p-6 md:min-h-screen",
    rightImageWrapper:
      "hidden md:block md:w-[45%] bg-cover bg-center rounded-lg relative m-2",
    rightOverlay: "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg pointer-events-none",
    logoWrapper: "absolute bottom-10 left-4 z-10",
    logoImage: "w-40",
  },
});



export const button = tv({
  base: "font-medium flex items-center justify-center transition-all duration-200 font-inter text-base gap-2 px-6 py-3 w-full max-w-[18.3125rem] h-[3.5rem]",
  variants: {
    variant: {
      primary:
        "bg-black text-white rounded-[1.5rem] shadow-xl shadow-pink-900/50 hover:scale-[1.02] hover:bg-gray-800 active:scale-95",
      outline:
        "bg-white text-black font-semibold rounded-[1.5rem] border border-gray-300 hover:bg-gray-50 shadow-md active:scale-95",
      google:
        "bg-white text-black border border-gray-300 hover:bg-gray-100 shadow-md active:scale-95 flex items-center justify-center gap-3",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});


// Sidebar
export const sidebar = tv({
  slots: {
    wrapper: "w-full md:w-[280px] bg-[#1F2A44] text-white p-6 flex-shrink-0 flex flex-col",
    title: "text-2xl font-bold mb-8 font-cormorant",
    navItem:
      "flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#374151] rounded-lg transition-colors duration-200 font-inter",
    navItemActive:
      "flex items-center gap-2 px-3 py-2 text-white bg-[#374151] rounded-lg font-inter",
    logoutButton:
      "mt-8 flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-[#374151] rounded-lg w-full transition-colors font-inter",
  },
});

// Cards
export const card = tv({
  slots: {
    wrapper:
      "p-6 bg-white rounded-xl shadow-md transition-transform duration-200 hover:translate-y-[-2px]",
    title: "text-lg font-bold text-[#1F2A44] mb-2 font-cormorant",
    description: "text-sm text-[#6B7280] font-inter",
  },
});

//!SECTION: Checkbox

export const checkbox = tv({
  slots: {
    container: "flex items-center gap-2 text-gray-600",
    input: "w-6 h-6 appearance-none rounded-[4px] border border-gray-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#03BCA3] bg-[#F5F2F0]",
    check: "absolute w-6 h-6 flex items-center justify-center rounded-[4px] bg-[#03BCA3] opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none",
    label: "font-inter text-base leading-6",
  },
});
//!SECTION: INPUT

export const input = tv({
  base: "w-full bg-[#F5F2F0] border rounded-lg text-base transition-all duration-200 font-inter placeholder:text-gray-500 focus:outline-none h-[48px] px-3 md:h-[56px] md:px-4 py-2",
  variants: {
    state: {
      normal: "",
      focused: "border-[#03BCA3] ring-1 ring-[#03BCA3]",
      error: "border-red-400 ring-2 ring-red-200",
    },
  },
  defaultVariants: {
    state: "normal",
  },
});


//!SECTION: Dropdown

export const dropdown = {
  wrapper: tv({
    base: "relative w-full",
  }),
  trigger: tv({
    base: "relative flex items-center justify-between w-full h-[48px] md:h-[56px] px-3 md:px-4 py-2 bg-[#F5F2F0] border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none",
    variants: {
      error: { true: "border-[#F87171]" },
      open: { true: "ring-1 ring-[#03BCA3] border-[#03BCA3] bg-[#03BCA3]/10" },
    },
  }),
  label: tv({
    base: "font-inter text-sm truncate flex-1 text-left",
    variants: {
      selected: {
        true: "text-gray-800",
        false: "text-gray-500",
      },
    },
  }),
  menu: tv({
    base: "absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto",
  }),
  option: tv({
    base: "px-3 py-2 text-sm font-inter cursor-pointer rounded-lg transition-colors duration-300",
    variants: {
      active: {
        true: "bg-[#03BCA3]/20 text-gray-900",
        false: "hover:bg-gray-200 hover:text-gray-800",
      },
    },
  }),
  errorText: tv({
    base: "text-xs text-red-500 mt-1 font-inter",
  }),
};



//!SECTION: multiSelectStyles



export const multiSelect = tv({
  slots: {
    wrapper: "relative w-full",
    container:
      "flex flex-wrap gap-2 w-full min-h-[3rem] px-3 py-2 bg-[#E5DEDB] border-[0.0625rem] rounded-[0.5rem] focus-within:ring-[0.125rem] focus-within:ring-[#03BCA3] focus-within:border-[#03BCA3] transition-all duration-200",
    tag: "flex items-center gap-2 px-2 py-1 bg-[#03BCA3] text-white rounded-[0.25rem]",
    tagText: "text-[0.875rem] md:text-[1rem] font-medium",
    removeButton:
      "text-white hover:text-gray-300 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] rounded",
    input:
      "flex-1 min-w-[8rem] bg-transparent outline-none text-[#1F2A44] text-[0.875rem] font-medium placeholder:text-[#9CA3AF] md:text-[1rem]",
    dropdown:
      "absolute z-10 mt-1 w-full max-h-[12.5rem] overflow-y-auto bg-white border border-[#D1D5DB] rounded-[0.5rem] shadow-[0_0.25rem_0.375rem_-0.0625rem_rgba(0,0,0,0.1)]",
    option:
      "px-3 py-2 text-[#1F2A44] text-[0.875rem] hover:bg-[#F3F4F6] cursor-pointer focus:bg-[#F3F4F6] focus:outline-none md:text-[1rem]",
  },
});




//!SECTION: numberInputStyles



export const numberInputWrapper = tv({
  base: "flex items-center gap-2 w-full h-[3rem] px-3 py-2 border rounded-lg transition-all duration-200 font-inter bg-[#F0EDEB] focus-within:ring-2 focus-within:ring-[#22C55E] focus-within:border-[#22C55E]",
  variants: {
    error: {
      true: "border-[#EF4444]",
      false: "border-[#D1D5DB]",
    },
  },
});

export const numberInputField = tv({
  base: "flex-1 bg-transparent outline-none text-[#1F2A44] text-sm font-medium placeholder:text-[#9CA3AF] md:text-base",
});
//!SECTION: toggleButtonStyles

// src/lib/styles/toggleButtons.ts

export const toggleButton = tv({
  base: "flex items-center gap-[0.25rem] h-[2rem] px-[0.75rem] py-[0.5rem] border rounded-full text-[0.875rem] leading-[1.25rem] transition-colors duration-200 focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.125rem] font-inter md:text-[1rem] md:leading-[1.5rem]",
  variants: {
    active: {
      true: "bg-[#22C55E] text-white border-[#22C55E]",
      false: "bg-[#F3F4F6] text-[#1F2A44] border-[#D1D5DB]",
    },
    inactive: {
      true: "border-[#D1D5DB] text-[#4B5563] hover:bg-[#E5E7EB]",
    },
  },
});


//!SECTION: Textarea
export const textareaStyles = tv({
  base: "w-full rounded-lg font-inter text-sm md:text-base transition-all duration-200 px-3 py-2 h-24 md:h-32 bg-[#F0EDEB] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-1",
  variants: {
    state: {
      default: "border border-gray-300",
      error: "border-red-400 ring-2 ring-red-200",
    },
  },
  defaultVariants: {
    state: "default",
  },
}); 

//!SECTION: Navigation (Previous/Next Buttons)
export const navigation = tv({
  slots: {
    wrapper: "flex justify-between mt-8",
    button: "transition-all duration-200 font-medium text-[1rem] font-inter focus:outline-none focus:ring-[0.125rem] focus:ring-[#22C55E] focus:ring-offset-[0.125rem]",
    previous: "w-30 h-12 rounded-[0.75rem] border-[0.0625rem] border-[#1F2A44] hover:bg-gray-100",
    next: "w-30 h-12 rounded-full bg-[#1F2A44] text-white hover:bg-[#2f3a5f]",
    hidden: "invisible",
  },
});


//!SECTION: StepItem

// Design System: Component Variants
export const stepItemVariants = tv({
  slots: {
    button: [
      "flex",
      "items-center",
      "gap-4",
      "p-[6px]",
      "transition-all",
      "duration-300",
      "hover:bg-gray-50",
      "rounded-[100px]",
      "w-full",
      "outline-none",
      "cursor-pointer",
    ],
    indicator: [
      "relative",
      "w-8",
      "h-8",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "z-10",
    ],
    circle: [
      "absolute",
      "inset-0",
      "rounded-full",
      "transition-all",
      "duration-300",
    ],
    number: [
      "text-[14px]",
      "font-semibold",
      "font-inter",
      "z-20",
    ],
    checkmark: [
      "absolute",
      "w-5",
      "h-5",
      "text-white",
      "z-10",
    ],
    label: [
      "text-[14px]",
      "font-semibold",
      "font-inter",
      "tracking-wide",
      "transition-colors",
      "duration-300",
    ],
  },
  variants: {
    state: {
      inactive: {
        button: "",
        circle: "bg-white border-2 border-[#E5DEDB]",
        number: "text-[#E5DEDB]",
        label: "text-[#E5DEDB]",
      },
      active: {
        button: "bg-white",
        circle: "bg-white border-2 border-green-500 shadow-md",
        number: "text-gray-600",
        label: "text-gray-900",
      },
      completed: {
        button: "",
        circle: "bg-green-500 text-white",
        number: "",
        label: "text-gray-800",
      },
    },
  },
  defaultVariants: {
    state: "inactive",
  },
});;


// Design System: Finalize Profile Modal Variants



export const label = "block mb-1 font-medium text-gray-700 font-inter";
export const errorTextStyles = "text-xs text-red-500 mt-1 font-inter";
export const helperTextStyles = "text-xs text-gray-500 mt-1 font-inter";  