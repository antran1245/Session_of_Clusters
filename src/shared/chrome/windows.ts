import { useStorageContext } from "@context/StorageContext";
import { updateStorageSession, type BrowserType } from "./storage";

/**
 * Open a session by creating window(s) and tabs correlating with window(s) when saved.
 * 
 * @param browsers - Browser-URLs[] pairing
 */
export const openSession = (browsers: BrowserType): void => {
  
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
}

/**
 * Delete a session from the store sessions and update the Chrome storage
 * @param key - Session name to remove
 */
export const deleteSession = (key: string): void => {
  const {sessions, setSessions} = useStorageContext()
  let currentSessions = sessions
  delete currentSessions[key]
  setSessions(currentSessions)
  updateStorageSession(currentSessions)
}