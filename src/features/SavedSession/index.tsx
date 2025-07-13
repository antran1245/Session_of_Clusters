import React, { useEffect, useState } from "react";
import { getTabs } from "@shared/chrome/tabs";
import { setStorageSession } from "@shared/chrome/storage";
import { LabelInput, Button, Message, Popover } from "@components/ui";
import { useStorageContext } from "@context/StorageContext";
import { useSettingsContext } from "@context/SettingsContext";
import SaveSelectedWindows from "./SaveSelectedWindows";
import {
  checkIfSessionNameExist,
  createSaveSessionObject,
} from "@shared/helpers";

const SaveSession: React.FC = () => {
  // Global session
  const { sessions, setSessions } = useStorageContext();
  // Global settings
  const { settings } = useSettingsContext();
  // Preset name for Session
  const [name, setName] = useState<string>("R2BC");
  // Control showing a message on successful saved of Session
  const [showMessage, setShowMessage] = useState(false);
  // Display the number of char for Session name
  const [wordCount, setWordCount] = useState<number>(0);

  const nameMaxLength: number = 100;

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

  // Update the number of name length
  useEffect(() => {
    setWordCount(name.length);
  }, [name]);

  /**
   * Save Session onto Storage
   */
  function saveSession() {
    // Get all current tabs
    getTabs().then((tabs) => {
      if (tabs) {
        // Parse all tabs into an object
        let data = createSaveSessionObject(tabs);
        if (Object.keys(data).length > 0) {
          const checkName = settings["overwriteSessionName"].value
            ? name
            : checkIfSessionNameExist(name, Object.keys(sessions));
          let session = {
            name: checkName,
            browsers: data,
            date: new Date().toISOString(),
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
    <form className="flex gap-2">
      <LabelInput
        label="Session Name"
        forLabel="name"
        required={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
        labelClassName="flex-1"
        maxLength={nameMaxLength}
        messageComponent={
          <div className={`flex flex-row flex-1`}>
            {showMessage && (
              <Message message="Session Saved" className="font-bold" />
            )}
            <p className="ml-auto">
              {wordCount}/{nameMaxLength}
            </p>
          </div>
        }
      />
      <div className="flex flex-row gap-2 items-end w-fit">
        <Button
          label="Save Session"
          onClick={saveSession}
          className="px-2 py-1 h-fit"
        />
        <Popover name="session-form" ellipseClassName="mb-1">
          <SaveSelectedWindows name={name} />
        </Popover>
      </div>
    </form>
  );
};

export default SaveSession;
