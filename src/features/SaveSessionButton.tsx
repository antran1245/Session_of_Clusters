import React from "react";
import Button from "@components/ui/Button";
import { getTabs } from "@shared/chrome/tabs";

const SaveSessionButton: React.FC = () => {
  async function saveSession() {
    let tabs = await getTabs();
    console.log(tabs);
  }

  return <Button label="Save Session" onClick={saveSession} />;
};

export default SaveSessionButton;
