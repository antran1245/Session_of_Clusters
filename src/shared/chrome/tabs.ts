import { lastErrorPromise } from "./helper"

/**
 * Retrieve an array of currently open URLs on Chrome browsers
 * @returns - A Promise<Tab[]>
 */
export const getTabs = (): Promise<chrome.tabs.Tab[] | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({}, function (tabs) {
      lastErrorPromise(resolve, reject, tabs)
    })
  })
}

/**
 * Retrieve the current URL where the extension is open
 * @returns - A Promise<Tab>
 */
export const getCurrentTab = (): Promise<chrome.tabs.Tab | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      lastErrorPromise(resolve, reject, tabs[0])
    })
  })
}