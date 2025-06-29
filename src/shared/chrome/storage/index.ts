export * from './storage'

import { lastErrorMessage } from "@shared/chrome/helpers"

/**
 * Clear all data from Chrome Storage.
 */
export const clearStorageLocal = (): Promise<void | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.clear(() => {
      if(lastErrorMessage("Error clearing all data from Chrome storage.")) {
        console.log("Chrome Storage cleared of all data.")
        resolve()
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}

/**
 * Remove a selected data from Chrome Storage.
 * @param key - A key to remove from the Chrome Storage.
 */
export const removeStorageLocal = (key: string): Promise<void | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      if(lastErrorMessage("Error removing data from Chrome storage.")) {
        console.log("Chrome Storage remove selected data.")
        resolve()
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}