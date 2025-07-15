import React from "react";
import type { SessionType } from "@shared/chrome/storage";

interface SessionItemContentProps {
  session: SessionType;
}

const SessionItemContent: React.FC<SessionItemContentProps> = ({ session }) => {
  return <div>{session && <p>{session.name}</p>}</div>;
};

export default SessionItemContent;
