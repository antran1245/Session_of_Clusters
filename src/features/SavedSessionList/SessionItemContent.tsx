import React, { useEffect, useState } from "react";
import {
  updateStorageSession,
  type SessionType,
  type URLType,
} from "@shared/chrome/storage";
import { Accordion, Button } from "@components/ui";
import trashIcon from "@assets/trash-solid.svg";
import { useStorageContext } from "@context/StorageContext";

interface SessionItemContentProps {
  session: SessionType;
}

const SessionItemContent: React.FC<SessionItemContentProps> = ({ session }) => {
  const { sessions } = useStorageContext();
  const [selectedSession, setSelectedSession] = useState<SessionType>(session);
  const [activeTabs, setActiveTabs] = useState<{
    [id: string]: string;
  }>({});

  /**
   * Delete a tab from a selected browser/window within a selected Session.
   * @param urlData - Data to update
   * @param browserID - Browser key to update
   */
  function deleteTab(urlData: URLType, browserID: string) {
    let updateSession = session.browsers[browserID];
    // Index to remove
    const indexToRemove = updateSession.findIndex(
      (obj) => obj.url === urlData.url
    );
    // If exist then remove the selected data
    if (indexToRemove !== -1) updateSession.splice(indexToRemove, 1);
    session.browsers[browserID] = updateSession;
    // If browser/window is empty after deleting, then remove the window/browser.
    if (session.browsers[browserID].length === 0)
      delete session.browsers[browserID];

    // Update the state and cause re-render.
    setSelectedSession({ ...sessions[selectedSession.name] });
    updateStorageSession({ ...sessions });
  }

  /**
   * On change to selectedSession, an object will be created to show the title of active for each browser.
   */
  useEffect(() => {
    let filterTitleBrowser: { [id: string]: string } = {};
    // Filter session for active tab for each browser.
    for (const browser in session["browsers"]) {
      let activeTabTitle = "";
      const tabList = session["browsers"][browser];
      for (const tab of tabList) {
        if (tab.active) {
          activeTabTitle = tab.title;
          break;
        }
      }
      if (activeTabTitle !== "") {
        filterTitleBrowser[browser] = activeTabTitle;
      } else {
        filterTitleBrowser[browser] = browser;
      }
    }
    setActiveTabs(filterTitleBrowser);
  }, [selectedSession]);

  return (
    <div className="text-left flex flex-col gap-1">
      <p className="font-extrabold text-[#93DEFF]">{selectedSession.name}</p>
      {/**
       * Iterate through session browers.
       * id: Browser ID
       * tabs: Array of url objects
       */}
      {Object.entries(selectedSession.browsers).map(([id, tabs]) => (
        <Accordion title={activeTabs[id]}>
          {/**
           * Iterate through each tab object
           * key: object key
           * index: array index
           */}
          {tabs.map((key, index) => (
            <div
              className={`grid grid-cols-12 gap-1 items-center border-b border-x border-[#F7F7F7] p-2 ${
                index === Object.values(tabs).length - 1 ? "rounded-b" : ""
              }`}
            >
              <a href={key.url} title={key.url} className="text-xs col-span-11">
                {key.title}
              </a>
              <Button
                onClick={() => {
                  deleteTab(key, id);
                }}
                className="w-fit h-fit p-1.5 col-span-1"
              >
                <img
                  src={trashIcon}
                  alt="Trash Icon"
                  className="w-3 h-3 invert"
                />
              </Button>
            </div>
          ))}
        </Accordion>
      ))}
    </div>
  );
};

export default SessionItemContent;
