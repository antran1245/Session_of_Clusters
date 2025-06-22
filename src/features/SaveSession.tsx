import React, { useEffect, useState } from "react";
import LabelInput from "@components/ui/LabelInput";
import Button from "@components/ui/Button";
import { getTabs } from "@shared/chrome/tabs";
import { setStorageSession } from "@shared/chrome/storage";
import Message from "@components/ui/Message";

const SaveSession: React.FC = () => {
  // Preset name for Session
  const [name, setName] = useState("hello");
  // Control showing a message on successful saved of Session
  const [showMessage, setShowMessage] = useState(false);

  // Run on update to showMessage
  useEffect(() => {
    // Timer to set showMessage as false
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  /**
   * Save Session onto Storage
   */
  function saveSession() {
    // Get all current tabs
    getTabs().then((tabs) => {
      if (tabs) {
        // Parse all tabs into an object
        let data: any = {};
        for (const tab of tabs) {
          if (tab["url"] !== "") {
            const title = tab["title"] ? tab["title"] : tab["url"];
            const url = tab["url"];
            const urlData = { title, url };
            data[String(tab["windowId"])] =
              String(tab["windowId"]) in data
                ? [...data[String(tab["windowId"])], urlData]
                : [urlData];
          }
        }
        if (Object.keys(data).length > 0) {
          let session = {
            name,
            browsers: data,
          };
          // Store session into storage
          setStorageSession(session).then((result) => {
            if (result) {
              setShowMessage(true);
            }
          });
        }
      }
    });
  }

  return (
    <form>
      <LabelInput
        label="Name"
        forLabel="name"
        required={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {showMessage && <Message message="Session Saved" />}
      <Button
        label="Save Session"
        onClick={saveSession}
        className="text-xs p-2 mt-1"
      />
    </form>
  );
};

export default SaveSession;
