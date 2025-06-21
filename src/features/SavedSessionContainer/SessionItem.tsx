import Button from "@components/ui/Button";
import type { SessionType } from "@shared/chrome/storage";
import React from "react";

interface SessionContainerProps {
  session: SessionType;
}

const SessionItem: React.FC<SessionContainerProps> = ({ session }) => {
  return (
    <div>
      <p>{session.name}</p>;
      <Button label="open" onClick={() => {}} />
    </div>
  );
};

export default SessionItem;
