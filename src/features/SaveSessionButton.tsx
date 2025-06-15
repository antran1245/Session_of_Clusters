import React from "react";
import Button from "@components/ui/Button";

const SaveSessionButton: React.FC = () => {
  function saveSession() {}

  return <Button label="Save Session" onClick={saveSession} />;
};

export default SaveSessionButton;
