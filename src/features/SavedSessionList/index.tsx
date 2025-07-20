import React, { useEffect, useState } from "react";
import SessionItem from "./SessionItem";
import { useStorageContext } from "@context/StorageContext";
import type { SessionType } from "@shared/chrome/storage";
import SessionItemContent from "./SessionItemContent";

const SavedSessionContainer: React.FC = () => {
  const { sessions } = useStorageContext();

  const [sessionsList, setSessionsList] = useState<SessionType[]>([]);

  const [selectedSession, setSelectedSession] = useState<SessionType | null>(
    null
  );

  useEffect(() => {
    // Sort the session by date
    const sortedList: SessionType[] = Object.values(sessions).sort(
      (a: SessionType, b: SessionType) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    );
    setSessionsList(sortedList);
    // Remove any shown content when there is no session
    if (Object.keys(sessions).length === 0) setSelectedSession(null);
  }, [sessions]);

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <p className="text-bold text-md text-left">
        Saved Session
        {sessionsList.length > 1 && "s"}
      </p>
      <div className="flex-1 grid grid-cols-10 gap-1 min-h-0">
        <div className="flex-1 min-h-0 col-span-4 overflow-auto p-1 border rounded">
          {sessionsList.map((value, index) => {
            return (
              <SessionItem
                key={index}
                session={value}
                selectedSession={selectedSession}
                setSelectedSession={setSelectedSession}
              />
            );
          })}
        </div>
        <div className="flex-1 min-h-0 col-span-6 overflow-auto p-1 border rounded">
          {selectedSession && <SessionItemContent session={selectedSession} />}
        </div>
      </div>
    </div>
  );
};

export default SavedSessionContainer;
