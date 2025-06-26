import React, { useEffect, useState } from "react";
import { getTabs } from "@shared/chrome/tabs";
import { setStorageSession } from "@shared/chrome/storage";
import { LabelInput, Button, Message } from "@components/ui";
import { useStorageContext } from "@context/StorageContext";
import SaveSelectedWindows from "./SaveSelectedWindows";

const SaveSession: React.FC = () => {
  // Preset name for Session
  const [name, setName] = useState("R2BC");
  // Control showing a message on successful saved of Session
  const [showMessage, setShowMessage] = useState(false);

  const { setSessions } = useStorageContext();

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
              setSessions((prev) => ({ ...prev, [session.name]: session }));
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
        label="Session Name"
        forLabel="name"
        required={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputClassName="mb-3"
      />
      {showMessage && <Message message="Session Saved" />}
      <div className="flex flex-row gap-2">
        <Button
          label="Save Session"
          onClick={saveSession}
          className="text-xs p-2 mt-1"
        />
        <SaveSelectedWindows name={name} />
      </div>
    </form>
  );
};

export default SaveSession;
