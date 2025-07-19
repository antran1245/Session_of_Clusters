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

  function deleteTab(urlData: URLType, browserID: string) {
    let updateSession = session.browsers[browserID];
    const indexToRemove = updateSession.findIndex(
      (obj) => obj.url === urlData.url
    );
    if (indexToRemove !== -1) updateSession.splice(indexToRemove, 1);
    session.browsers[browserID] = updateSession;
    if (session.browsers[browserID].length === 0) {
      delete session.browsers[browserID];
    }
    setSelectedSession({ ...sessions[selectedSession.name] });
    updateStorageSession({ ...sessions });
  }

  useEffect(() => {
    let filterTitleBrowser: { [id: string]: string } = {};
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
      {Object.entries(selectedSession.browsers).map(([title, tabs]) => (
        <Accordion title={activeTabs[title]}>
          {Object.values(tabs).map((key, index) => (
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
                  deleteTab(key, title);
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
