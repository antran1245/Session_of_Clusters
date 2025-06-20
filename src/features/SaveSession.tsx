import React, { useEffect, useState } from "react";
import LabelInput from "@components/ui/LabelInput";
import Button from "@components/ui/Button";
import { getTabs } from "@shared/chrome/tabs";
import { setStorageLocal } from "@shared/chrome/storage";
import Message from "@components/ui/Message";

const SaveSession: React.FC = () => {
  const [name, setName] = useState("hello");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  function saveSession() {
    getTabs().then((tabs) => {
      if (tabs) {
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
          setStorageLocal(session).then((result) => {
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
      <Button label="Save Session" onClick={saveSession} />
    </form>
  );
};

export default SaveSession;
