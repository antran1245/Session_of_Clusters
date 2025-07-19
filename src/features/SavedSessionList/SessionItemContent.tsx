import React, { useEffect, useState } from "react";
import type { BrowserType, SessionType } from "@shared/chrome/storage";
import { Accordion, Button } from "@components/ui";
import trashIcon from "@assets/trash-solid.svg";

interface SessionItemContentProps {
  session: SessionType;
}

const SessionItemContent: React.FC<SessionItemContentProps> = ({ session }) => {
  const [formatSessions, setFormatSessions] = useState<BrowserType>({});

  useEffect(() => {
    let updateSession: BrowserType = {};
    for (const browser in session["browsers"]) {
      let activeTabTitle = "";
      const tabList = session["browsers"][browser];
      console.log(tabList, session["browsers"], browser);
      for (const tab of tabList) {
        if (tab.active) {
          activeTabTitle = tab.title;
          break;
        }
      }
      if (activeTabTitle !== "") {
        updateSession[activeTabTitle] = tabList;
      } else {
        updateSession[browser] = tabList;
      }
    }
    setFormatSessions(updateSession);
  }, [session]);
  return (
    <div className="text-left flex flex-col gap-1">
      <p className="font-extrabold text-[#93DEFF]">{session.name}</p>
      {Object.entries(formatSessions).map(([title, tabs]) => (
        <Accordion title={title} items={Object.values(tabs)}>
          <Button onClick={() => {}} className="w-fit h-fit p-1.5 col-span-1">
            <img src={trashIcon} alt="Trash Icon" className="w-3 h-3 invert" />
          </Button>
        </Accordion>
      ))}
    </div>
  );
};

export default SessionItemContent;
