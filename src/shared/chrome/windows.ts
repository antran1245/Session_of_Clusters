import { lastErrorMessage } from "./helpers";

/**
 * Return a list of windows currently open
 * @returns - An array of windows
 */
export const getCurrentWindows = (): Promise<chrome.windows.Window[]| undefined> => {
  return new Promise((resolve,reject) => {
    chrome.windows.getAll((windows:chrome.windows.Window[]) => {
      if (lastErrorMessage("Error retrieving data from Chrome local storage.")) {
        resolve(windows)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}

/**
 * Close all the current open windows
 * @param windows - Chrome windows
 */
export const closeCurrentWindows = (windows:chrome.windows.Window[]): void => {
  console.log("Closing current windows: ", windows)
  for(const window of windows) {
    if(window.id) chrome.windows.remove(window.id)
  }
}

/**
 * Create window(s) with an array of tab(s) that was saved
 * @param urls - URLs array to open tabs
 */
export const createWindowsWithTabs = (urls:string[]): void => {
  chrome.windows.create({state:"normal"}, (newWindow: chrome.windows.Window | undefined) => {
    urls.forEach((url, index) => {
      chrome.tabs.create({
        windowId:newWindow?.id, 
        url: url, 
        active: index == urls.length-1
      })
    })
    // Remove a blank tabs that was created when the new window was created.
    chrome.tabs.query({
      windowId: newWindow?.id
    }, (tabs: chrome.tabs.Tab[] | undefined) => {
      if (tabs && tabs.length > 0 && tabs[0].id) chrome.tabs.remove(tabs[0].id)
    })
  })
}

/**
 * Create a window with a google.com tab
 */
export const createBlankWindow = (): void => {
    chrome.windows.create({state: "maximized", url: "http://www.google.com"}, () => {
      lastErrorMessage("Error creating a blank window.")
    })
}