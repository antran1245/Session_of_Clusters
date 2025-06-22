import Button from "@components/ui/Button";
import type { SessionType } from "@shared/chrome/storage";
import openIcon from "@assets/book-open-solid.svg";
import trashIcon from "@assets/trash-solid.svg";
import React from "react";

interface SessionContainerProps {
  session: SessionType;
}

const SessionItem: React.FC<SessionContainerProps> = ({ session }) => {
  return (
    <div className={"flex flex-row justify-between items-center"}>
      <p className="text-sm">{session.name}</p>
      <div className="flex flex-row gap-1">
        <Button onClick={() => {}} className="w-fit h-fit p-2">
          <img src={openIcon} alt="Open Icon" className="w-4 h-4 invert" />
        </Button>
        <Button onClick={() => {}} className="w-fit h-fit p-2">
          <img src={trashIcon} alt="Trash Icon" className="w-4 h-4 invert" />
        </Button>
      </div>
    </div>
  );
};

export default SessionItem;
