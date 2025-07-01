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

/**
 * Format and select certain key from tab object to be saved into an array
 * @param tab - Chrome tab object
 * @param data - Array of object with selected detail from a URL
 * @returns - Updated data array
 */
export function saveSessionData(tab:chrome.tabs.Tab, data: any) {
  const title = tab["title"] ? tab["title"] : tab["url"];
  const url = tab["url"];
  const urlData = { title, url };
  data[String(tab["windowId"])] =
    String(tab["windowId"]) in data
      ? [...data[String(tab["windowId"])], urlData]
      : [urlData];
  return data
}

export function formatDataTime(date:string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(date));
}

export function timeAgo(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
