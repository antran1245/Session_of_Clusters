import { type BrowserType } from "./storage";
import { lastErrorMessage } from "./helper";

/**
 * Return a list of windows currently open
 * @returns - An array of windows
 */
const getCurrentWindows = (): Promise<chrome.windows.Window[]| undefined> => {
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
const closeCurrentWindows = (windows:chrome.windows.Window[]): void => {
  console.log("Closing current windows: ", windows)
  for(const window of windows) {
    if(window.id) chrome.windows.remove(window.id)
  }
}

/**
 * Open a session by creating window(s) and tabs correlating with window(s) when saved.
 * 
 * @param browsers - Browser-URLs[] pairing
 */
export const openSession = (browsers: BrowserType): void => {
  // Get all current window(s) to close
  getCurrentWindows().then((windows:chrome.windows.Window[] | undefined) => {
    // Loop through browsers object
    for(const browser in browsers) {
      let tabArray = browsers[browser]
      let urls: string[] = []
  
      // Loop through the tabs for each browser
      for(const tab of tabArray) {
        urls.push(tab.url)
      }
      // Create a window with all the tabs from the urls array and a blank tab
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
    return windows
  }).then((windows:chrome.windows.Window[] | undefined) => {
    // Close all the currently open window(s)
    if(windows) closeCurrentWindows(windows)
  })
}