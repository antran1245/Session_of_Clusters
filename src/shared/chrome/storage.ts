import { lastErrorMessage } from "./helper";

let sessionKeyName: string = "sessions";

let currentStorageLocal: StorageLocalType = {}

// Data types

type URLType = {
  title: string;
  url: string;
}
type BrowserType = {
  [id: string]: URLType[]
}
type SessionType = {
  name: string;
  browsers: BrowserType
}

type StorageLocalType = {
  [sessionKey:string]: SessionType
}

/**
 * Retrieve storage data to create session for container or use the data
 * @param createSessionContainer - Boolean to determine if Session container need to be created.
 * @return - Storage or void
 */
export const getStorageLocal = (createSessionContainer:boolean = false): StorageLocalType | void => {
  chrome.storage.local.get([sessionKeyName], (result) => {
    if (lastErrorMessage("Error retrieving data from Chrome local storage.")) {
      if (createSessionContainer) {
        console.log("create sessions within container")
      }
      currentStorageLocal = result[sessionKeyName] ? result[sessionKeyName] : {};
      // return result[sessionKeyName] ? result[sessionKeyName] : {};
    }
  })
}

/**
 * Save a Session onto the Chrome Local Storage
 * @param session - Data to save
 */
export const setStorageLocal = (session: SessionType): void => {
  let newSession: StorageLocalType = {[session["name"]] : session}
  currentStorageLocal = {...currentStorageLocal, ...newSession}
  chrome.storage.local.set({[sessionKeyName] : currentStorageLocal}, () => {
    lastErrorMessage("Error saving data to Chrome local storage.")
  })
}

/**
 * Clear all data from Chrome Storage.
 */
export const clearStorageLocal = (): void => {
  chrome.storage.local.clear(() => {
    if(lastErrorMessage("Error clearing all data from Chrome storage.")) {
      console.log("Chrome Storage cleared of all data.")
    }
  })
}

/**
 * Remove a selected data from Chrome Storage.
 * @param key - A key to remove from the Chrome Storage.
 */
export const removeStorageLocal = (key: string): void => {
  chrome.storage.local.remove(key, () => {
    if(lastErrorMessage("Error removing data from Chrome storage.")) {
      console.log("Chrome Storage remove selected data.")
    }
  })
}