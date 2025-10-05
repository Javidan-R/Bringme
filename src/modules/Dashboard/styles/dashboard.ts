// src/lib/styles/dashboard.ts
import { tv } from "tailwind-variants";

export const dashboardVariants = tv({
  slots: {
    container: [
      "w-full",
      "max-w-[1600px]",
      "mx-auto",
      "p-6",
      "lg:p-10",
      "space-y-8",
    ],
    header: [
      "flex",
      "flex-col",
      "lg:flex-row",
      "justify-between",
      "items-start",
      "lg:items-center",
      "gap-4",
      "mb-8",
    ],
    titleSection: [
      "flex",
      "items-center",
      "gap-3",
    ],
    starIcon: [
      "w-8",
      "h-8",
      "lg:w-10",
      "lg:h-10",
      "text-yellow-500",
    ],
    title: [
      "text-3xl",
      "lg:text-4xl",
      "font-bold",
      "text-[#1F2A44]",
      "font-cormorant",
    ],
    tabsContainer: [
      "flex",
      "gap-1",
      "bg-white",
      "p-1",
      "rounded-xl",
      "shadow-sm",
      "border",
      "border-gray-200",
    ],
    tab: [
      "px-4",
      "lg:px-6",
      "py-2",
      "text-sm",
      "font-semibold",
      "rounded-lg",
      "transition-all",
      "duration-200",
      "cursor-pointer",
      "font-inter",
    ],
    searchSection: [
      "relative",
      "w-full",
      "max-w-lg",
      "mb-6",
    ],
    searchIcon: [
      "absolute",
      "left-3",
      "top-1/2",
      "-translate-y-1/2",
      "w-5",
      "h-5",
      "text-gray-400",
    ],
    searchInput: [
      "w-full",
      "pl-11",
      "pr-4",
      "py-2.5",
      "border",
      "border-gray-300",
      "rounded-xl",
      "shadow-sm",
      "focus:ring-2",
      "focus:ring-[#2BD4A2]",
      "focus:border-transparent",
      "outline-none",
      "font-inter",
      "text-sm",
      "transition-all",
    ],
    visasGrid: [
      "space-y-4",
    ],
    emptyState: [
      "text-center",
      "py-16",
      "bg-white",
      "rounded-2xl",
      "border",
      "border-gray-200",
    ],
    emptyText: [
      "text-lg",
      "text-gray-500",
      "font-inter",
    ],
  },
  variants: {
    tabActive: {
      true: {
        tab: [
          "bg-white",
          "text-[#1F2A44]",
          "shadow-md",
        ],
      },
      false: {
        tab: [
          "text-gray-600",
          "hover:text-[#1F2A44]",
          "hover:bg-gray-50",
        ],
      },
    },
  },
});

export const visaCardVariants = tv({
  slots: {
    card: [
      "bg-white",
      "p-5",
      "lg:p-6",
      "border",
      "rounded-2xl",
      "shadow-sm",
      "hover:shadow-md",
      "transition-all",
      "duration-300",
    ],
    cardHeader: [
      "flex",
      "flex-col",
      "lg:flex-row",
      "justify-between",
      "items-start",
      "lg:items-center",
      "gap-4",
      "mb-5",
    ],
    titleSection: [
      "flex",
      "items-center",
      "gap-3",
    ],
    flag: [
      "text-3xl",
    ],
    countryName: [
      "text-xl",
      "lg:text-2xl",
      "font-bold",
      "text-[#1F2A44]",
      "font-cormorant",
    ],
    visaName: [
      "text-gray-600",
      "font-medium",
      "font-cormorant",
    ],
    badgesSection: [
      "flex",
      "flex-wrap",
      "items-center",
      "gap-3",
    ],
    duration: [
      "text-sm",
      "font-medium",
      "text-gray-600",
      "font-inter",
    ],
    badge: [
      "px-4",
      "py-1.5",
      "rounded-full",
      "text-sm",
      "font-semibold",
      "border",
      "font-inter",
    ],
    requirementsSection: [
      "space-y-3",
      "mb-5",
    ],
    sectionTitle: [
      "text-xs",
      "font-semibold",
      "text-gray-500",
      "uppercase",
      "tracking-wider",
      "mb-3",
      "font-inter",
    ],
    requirementsList: [
      "space-y-2",
    ],
    requirementItem: [
      "flex",
      "items-start",
      "gap-2",
      "text-sm",
      "text-gray-700",
      "font-inter",
    ],
    bullet: [
      "w-1.5",
      "h-1.5",
      "rounded-full",
      "bg-[#1F2A44]",
      "mt-1.5",
      "flex-shrink-0",
    ],
    benefitsSection: [
      "flex",
      "flex-wrap",
      "items-center",
      "justify-end",
      "gap-6",
      "pt-4",
      "border-t",
      "border-gray-100",
    ],
    benefit: [
      "flex",
      "items-center",
      "gap-2",
      "text-sm",
      "font-medium",
      "text-gray-700",
      "font-inter",
    ],
    benefitIcon: [
      "w-4",
      "h-4",
    ],
  },
  variants: {
    visaType: {
      digital: {
        badge: [
          "bg-blue-50",
          "text-blue-700",
          "border-blue-200",
        ],
        card: [
          "border-blue-100",
        ],
      },
      investment: {
        badge: [
          "bg-orange-50",
          "text-orange-700",
          "border-orange-200",
        ],
        card: [
          "border-orange-100",
        ],
      },
      freelance: {
        badge: [
          "bg-green-50",
          "text-green-700",
          "border-green-200",
        ],
        card: [
          "border-green-100",
        ],
      },
    },
  },
});