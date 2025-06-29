import { saveSessionData } from "./format";

/**
 * Create an object to save as a Session
 * @param tabs - Chrome tabs array
 * @returns - Data object with selected tabs detail
 */
export function createSaveSessionObject(tabs: chrome.tabs.Tab[]) {
  let data: any = {};
  for (const tab of tabs) {
    if (tab["url"] !== "") {
      data = saveSessionData(tab, data)
    }
  }
  return data
}

/**
 * Create an object to save selected window(s)
 * @param tabs - Chrome tabs array
 * @param windows - Arrays of window ID
 * @returns - Data object with selected tabs detail
 */
export function createSaveWindowsObject(tabs: chrome.tabs.Tab[], windows: number[]) {
  let data: any = {};
  for (const tab of tabs) {
    if (tab["url"] !== "" && windows.includes(tab.windowId)) {
      data = saveSessionData(tab, data)
    }
  }
  return data
}