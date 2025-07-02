import React, { useEffect, useState } from "react";
import SessionItem from "./SessionItem";
import { useStorageContext } from "@context/StorageContext";
import type { SessionType } from "@shared/chrome/storage";

const SavedSessionContainer: React.FC = () => {
  const { sessions } = useStorageContext();

  const [sessionsList, setSessionsList] = useState<SessionType[]>([]);

  useEffect(() => {
    const sortedList: SessionType[] = Object.values(sessions).sort(
      (a: SessionType, b: SessionType) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    );
    setSessionsList(sortedList);
  }, [sessions]);

  return (
    <div className="flex flex-col flex-1 gap-1 mt-1">
      <p className="text-bold text-md text-left">
        {sessionsList.length > 0 && "Saved Session"}
        {sessionsList.length > 1 && "s"}
      </p>
      <div className="max-h-[125px] overflow-auto pr-1">
        {sessionsList.map((value, index) => {
          return <SessionItem key={index} session={value} />;
        })}
      </div>
    </div>
  );
};

export default SavedSessionContainer;
