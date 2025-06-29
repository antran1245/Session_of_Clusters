import React from "react";
import { Button } from "@components/ui";
import arrowOpenIcon from "@assets/arrow-up-right-from-square-solid.svg";
import trashIcon from "@assets/trash-solid.svg";
import {
  updateStorageSession,
  type BrowserType,
  type SessionType,
} from "@shared/chrome/storage";
import { useStorageContext } from "@context/StorageContext";
import { useSettingsContext } from "@context/SettingsContext";
import {
  closeCurrentWindows,
  createWindowsWithTabs,
  getCurrentWindows,
} from "@shared/chrome/windows";

interface SessionContainerProps {
  session: SessionType;
}

const SessionItem: React.FC<SessionContainerProps> = ({ session }) => {
  const { sessions, setSessions } = useStorageContext();
  const { onSessionOpen } = useSettingsContext();

  /**
   * Delete a session from the store sessions and update the Chrome storage
   * @param key - Session name to remove
   */
  function deleteSession(key: string) {
    const copy = sessions;
    delete copy[key];
    setSessions((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    updateStorageSession(copy);
  }

  /**
   * Open a session by creating window(s) and tabs correlating with window(s) when saved.
   * @param browsers - Browser-URLs[] pairing
   */
  function openSession(browsers: BrowserType) {
    // Get all current window(s) to close
    getCurrentWindows()
      .then((windows: chrome.windows.Window[] | undefined) => {
        // Loop through browsers object
        for (const browser in browsers) {
          let tabArray = browsers[browser];
          let urls: string[] = [];

          // Loop through the tabs for each browser
          for (const tab of tabArray) {
            urls.push(tab.url);
          }
          // Create a window with all the tabs from the urls array and a blank tab
          createWindowsWithTabs(urls);
        }
        return windows;
      })
      .then((windows: chrome.windows.Window[] | undefined) => {
        // Close all the currently open window(s)
        if (windows && onSessionOpen === "close") closeCurrentWindows(windows);
        if (onSessionOpen === "save") console.log("save");
      });
  }

  return (
    <div
      className={"flex flex-row justify-between items-center border-b-1 p-1"}
    >
      <p className="text-sm cursor-pointer truncate">{session.name}</p>
      <div className="flex flex-row gap-1">
        <Button
          onClick={() => {
            openSession(session.browsers);
          }}
          className="w-fit h-fit p-1.5"
        >
          <img src={arrowOpenIcon} alt="Open Icon" className="w-3 h-3 invert" />
        </Button>
        <Button
          onClick={() => {
            deleteSession(session.name);
          }}
          className="w-fit h-fit p-1.5"
        >
          <img src={trashIcon} alt="Trash Icon" className="w-3 h-3 invert" />
        </Button>
      </div>
    </div>
  );
};

export default SessionItem;
