import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Format classes to remove duplicates and solve conflicts.
 * @param inputs - Unformatted Classes
 * @returns - A string classes 
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}