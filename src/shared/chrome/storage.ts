import { lastErrorMessage } from "./helper";

export let sessionKeyName: string = "sessions";

export let currentStorageLocal: StorageLocalType = {}

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

export type StorageLocalType = {
  [sessionKey:string]: SessionType
}

/**
 * Retrieve storage data to create session for container or use the data
 * @param createSessionContainer - Boolean to determine if Session container need to be created.
 * @return - Storage or void
 */
export const getStorageLocal = (createSessionContainer:boolean = false): Promise<StorageLocalType | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([sessionKeyName], (result) => {
      let data = result[sessionKeyName] ? result[sessionKeyName] : {};
      if (lastErrorMessage("Error retrieving data from Chrome local storage.")) {
        if (createSessionContainer) {
          console.log("create sessions within container")
        }
        currentStorageLocal = data
        resolve(data)
        }
      })
    })
}

/**
 * Save a Session onto the Chrome Local Storage
 * @param session - Data to save
 */
export const setStorageLocal = (session: SessionType): Promise<boolean | undefined> => {
  return new Promise((resolve, reject) => {
    let newSession: StorageLocalType = {[session["name"]] : session}
    currentStorageLocal = {...currentStorageLocal, ...newSession}
    chrome.storage.local.set({[sessionKeyName] : currentStorageLocal}, () => {
      if(lastErrorMessage("Error saving data to Chrome local storage.")){
        resolve(true)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}

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