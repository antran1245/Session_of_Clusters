import React, { useEffect, useState } from "react";
import { updateStorageSession, type SessionType } from "@shared/chrome/storage";
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

  function deleteTab(url: string, browserID: string) {
    let updateSession = session.browsers[browserID];
    updateSession = updateSession.filter((obj) => obj.url !== url);
    session.browsers[browserID] = updateSession;
    setSelectedSession({ ...sessions[selectedSession.name] });
    updateStorageSession(sessions);
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
  }, [session]);

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
                  deleteTab(key.url, title);
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
