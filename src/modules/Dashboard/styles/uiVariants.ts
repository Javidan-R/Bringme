import { tv } from "tailwind-variants";

export const visaCardVariants = tv({
  base: "relative rounded-2xl border p-5 cursor-pointer transition transform bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5",
  variants: {
    type: {
      digital: "border-blue-300",
      investment: "border-orange-300",
    },
  },
  defaultVariants: {
    type: "digital",
  },
});

export const visaBadgeVariants = tv({
  base: "px-3 py-1 rounded-full text-xs font-bold shadow-sm text-white",
  variants: {
    type: {
      digital: "bg-blue-500",
      investment: "bg-orange-500",
    },
  },
  defaultVariants: {
    type: "digital",
  },
});
