import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format local time in Lagos, Nigeria (WAT: UTC+1)
 */
export function getLagosTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    const now = new Date();
    // Fallback: UTC + 1 hour
    const utcHours = now.getUTCHours() + 1;
    const hours = (utcHours % 24).toString().padStart(2, "0");
    const minutes = now.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
