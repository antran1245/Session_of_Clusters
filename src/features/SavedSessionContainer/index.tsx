import type { StorageSessionType } from "@shared/chrome/storage";
import React from "react";
import SessionItem from "./SessionItem";

interface SessionContainerProps {
  sessions: StorageSessionType;
}

const SavedSessionContainer: React.FC<SessionContainerProps> = ({
  sessions,
}) => {
  return (
    <div>
      {Object.values(sessions).map((value, index) => {
        return <SessionItem key={index} session={value} />;
      })}
    </div>
  );
};

export default SavedSessionContainer;
