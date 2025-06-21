import type { StorageLocalType } from "@shared/chrome/storage";
import React from "react";

interface SessionContainerProps {
  sessions: StorageLocalType;
}

const SavedSessionContainer: React.FC<SessionContainerProps> = ({
  sessions,
}) => {
  return (
    <div>
      {Object.entries(sessions).map(([key], index) => {
        return <p key={index}>{key}</p>;
      })}
    </div>
  );
};

export default SavedSessionContainer;
