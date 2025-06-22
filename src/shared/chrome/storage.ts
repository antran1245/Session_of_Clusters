import { lastErrorMessage } from "./helper";

export let sessionKeyName: string = "sessions";

export let currentStorageSession: StorageSessionType = {}

// Data types

type URLType = {
  title: string;
  url: string;
}
export type BrowserType = {
  [id: string]: URLType[]
}
export type SessionType = {
  name: string;
  browsers: BrowserType
}

export type StorageSessionType = {
  [sessionKey:string]: SessionType
}

/**
 * Retrieve storage data to create session for container or use the data
 * @param createSessionContainer - Boolean to determine if Session container need to be created.
 * @return - Storage or void
 */
export const getStorageSession = (createSessionContainer:boolean = false): Promise<StorageSessionType | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([sessionKeyName], (result) => {
      let data = result[sessionKeyName] ? result[sessionKeyName] : {};
      if (lastErrorMessage("Error retrieving data from Chrome local storage.")) {
        if (createSessionContainer) {
          console.log("create sessions within container")
        }
        currentStorageSession = data
        resolve(data)
        }
      })
    })
}

/**
 * Save a Session onto the Chrome Local Storage
 * @param session - Data to save
 */
export const setStorageSession = (session: SessionType): Promise<boolean | undefined> => {
  return new Promise((resolve, reject) => {
    let newSession: StorageSessionType = {[session["name"]] : session}
    currentStorageSession = {...currentStorageSession, ...newSession}
    chrome.storage.local.set({[sessionKeyName] : currentStorageSession}, () => {
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

/**
 * Update the current sessions in Chrome Storage
 * @param sessions - Sessions object
 * @returns boolean on result of operation
 */
export const updateStorageSession = (sessions: StorageSessionType): Promise<boolean | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({[sessionKeyName] : sessions}, () => {
      if(lastErrorMessage("Error saving data to Chrome local storage.")){
        resolve(true)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}