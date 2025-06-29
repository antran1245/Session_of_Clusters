import { lastErrorPromise } from "./helpers"

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

/**
 * Retrieve all active URLs
 * @returns - A Promise<Tab[]>
 */
export const getAllActiveTabs = (): Promise<chrome.tabs.Tab[] | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true }, function (tabs) {
      lastErrorPromise(resolve, reject, tabs)
    })
  })
}

/**
 * Get a screenshot of the window
 * @param windowId - Window Id
 * @returns An image
 */
export const getCaptureVisibleTab = (windowId: number): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(windowId, {format: "png"}, (result) => {
      lastErrorPromise(resolve, reject, result)
    })
  })
}