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