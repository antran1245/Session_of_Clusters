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

/**
 * Check and update name if it exist in the sessions list already
 * @param name - String to compare
 * @param sessionNameList - List of session name
 * @returns - Name
 */
export function checkIfSessionNameExist(name:string, sessionNameList: string[]) {
  let count = 0;
  let originalName = name
  while (sessionNameList.includes(name)) {
    name = originalName
    count++;
    name += `_${count}`;
  }
  return name
}