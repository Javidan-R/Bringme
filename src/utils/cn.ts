// utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// className birləşdirmə helperi
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
