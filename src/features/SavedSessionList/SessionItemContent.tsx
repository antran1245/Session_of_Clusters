import React, { useEffect, useState } from "react";
import type { BrowserType, SessionType } from "@shared/chrome/storage";

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
    <div>
      <p>{session.name}</p>
      {Object.entries(formatSessions).map(([title, tabs]) => (
        <div>
          <p>{title}</p>
          <div>
            {Object.values(tabs).map((key) => (
              <div>{key.title}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionItemContent;
