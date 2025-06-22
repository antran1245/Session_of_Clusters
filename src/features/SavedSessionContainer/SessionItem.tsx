import { Button } from "@components/ui";
import { openSession } from "@shared/chrome/windows";
import arrowOpenIcon from "@assets/arrow-up-right-from-square-solid.svg";
import trashIcon from "@assets/trash-solid.svg";
import { updateStorageSession, type SessionType } from "@shared/chrome/storage";
import React from "react";
import { useStorageContext } from "@context/StorageContext";

interface SessionContainerProps {
  session: SessionType;
}

const SessionItem: React.FC<SessionContainerProps> = ({ session }) => {
  const { sessions, setSessions } = useStorageContext();

  /**
   * Delete a session from the store sessions and update the Chrome storage
   * @param key - Session name to remove
   */
  function deleteSession(key: string) {
    setSessions((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    updateStorageSession(sessions);
    console.log(sessions);
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
