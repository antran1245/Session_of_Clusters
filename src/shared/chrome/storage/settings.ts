import { lastErrorMessage } from "../helpers";

export const settingsName = "settings"

export let initialSetting = {
  onSessionOpen: {
    value: "close",
    firstTime: true,
  },
  overwriteSessionName: {
    value: false,
    firstTime: true
  }
};

// Data types
export type SettingType = {
  onSessionOpen: {
    value: string,
    firstTime?: boolean,
  };
  overwriteSessionName: {
    value: boolean,
    firstTime?: boolean
  };
}

/**
 * Retrieve storage data for settings
 * @returns - Object of settings
 */
export const getStorageSetting = (): Promise<SettingType | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(settingsName, (result) => {
      let data = result[settingsName]? result[settingsName] : {}
      if (lastErrorMessage("Error retrieving data from Chrome local storage.")) {
        resolve(data)
      }
    })
  })
}

/**
 * Save the storage settings into Chrome storage local
 * @param settings - Object to save in storage
 * @returns - Boolean
 */
export const setStorageSetting = (settings: SettingType): Promise<boolean | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({[settingsName]: settings}, () => {
      if(lastErrorMessage("Error saving data to Chrome local storage.")){
        resolve(true)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}