// src/lib/styles/countryInfo.ts
import { tv } from "tailwind-variants";

export const countryInfoVariants = tv({
  slots: {
    container: [
      "space-y-6",
    ],
    countryHeader: [
      "bg-white",
      "rounded-2xl",
      "p-6",
      "flex",
      "items-center",
      "justify-between",
      "shadow-sm",
    ],
    countryTitle: [
      "flex",
      "items-center",
      "gap-4",
    ],
    flag: [
      "w-16",
      "h-16",
      "rounded-lg",
      "text-4xl",
      "flex",
      "items-center",
      "justify-center",
    ],
    countryName: [
      "text-2xl",
      "font-bold",
      "text-[#1F2A44]",
      "font-cormorant",
    ],
    quickStats: [
      "flex",
      "gap-6",
    ],
    statItem: [
      "text-center",
    ],
    statValue: [
      "text-xl",
      "font-bold",
      "text-[#1F2A44]",
      "font-inter",
    ],
    statLabel: [
      "text-xs",
      "text-[#6B7280]",
      "uppercase",
      "tracking-wide",
      "font-inter",
    ],
    grid: [
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "gap-6",
    ],
    section: [
      "bg-white",
      "rounded-2xl",
      "p-6",
      "shadow-sm",
    ],
    sectionTitle: [
      "text-lg",
      "font-bold",
      "text-[#1F2A44]",
      "mb-4",
      "flex",
      "items-center",
      "gap-2",
      "font-cormorant",
    ],
    sectionIcon: [
      "w-5",
      "h-5",
      "text-[#2BD4A2]",
    ],
    infoList: [
      "space-y-3",
    ],
    infoItem: [
      "flex",
      "justify-between",
      "items-center",
      "py-2",
      "border-b",
      "border-gray-100",
      "last:border-0",
    ],
    infoLabel: [
      "text-sm",
      "text-[#6B7280]",
      "font-inter",
    ],
    infoValue: [
      "text-sm",
      "font-semibold",
      "text-[#1F2A44]",
      "font-inter",
    ],
    categoryGrid: [
      "grid",
      "grid-cols-2",
      "gap-3",
    ],
    categoryCard: [
      "p-4",
      "border",
      "border-gray-200",
      "rounded-xl",
      "hover:border-[#2BD4A2]",
      "hover:bg-[#F0FDF4]",
      "transition-all",
      "cursor-pointer",
    ],
    categoryTitle: [
      "text-sm",
      "font-semibold",
      "text-[#1F2A44]",
      "mb-1",
      "font-inter",
    ],
    categoryDesc: [
      "text-xs",
      "text-[#6B7280]",
      "font-inter",
    ],
  },
});