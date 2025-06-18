/**
 * Display an error message if there is any Chrome runtime error.
 * @param errorMessage - Error message to display
 * @returns - A boolean if there is an error
 */
export const lastErrorMessage = (errorMessage: string = "Error Unknown"): boolean => {
  if(chrome.runtime.lastError) {
    console.log(errorMessage)
    return false
  }
  return true
}

/**
 * Display an error message if there is any Chrome runtime error.
 * @param resolve - Success
 * @param reject - Fail
 * @param value - Value to return
 */
export const lastErrorPromise = (resolve: (value: any) => void, reject: (reason?: any) => void, value: any): void => {
  if(chrome.runtime.lastError) {
    reject(chrome.runtime.lastError)
  } else {
    resolve(value)
  }
}