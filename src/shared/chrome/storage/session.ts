import { lastErrorMessage } from "../helpers";

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
 * @return - Storage or void
 */
export const getStorageSession = (): Promise<StorageSessionType | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([sessionKeyName], (result) => {
      let data = result[sessionKeyName] ? result[sessionKeyName] : {};
      if (lastErrorMessage("Error retrieving data from Chrome local storage.")) {
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
