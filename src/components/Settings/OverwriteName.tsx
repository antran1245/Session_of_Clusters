import { Toggle } from "@components/ui";
import { useSettingsContext } from "@context/SettingsContext";
import React, { useState } from "react";

const OverwriteName: React.FC = () => {
  const { settings, setSettings } = useSettingsContext();
  const [overwrite, setOverwrite] = useState<boolean>(
    settings["overwriteSessionName"].value || false
  );

  function isChecked() {
    setSettings({
      ...settings,
      overwriteSessionName: {
        value: !overwrite,
        firstTime: false,
      },
    });
    setOverwrite((prev: boolean) => !prev);
  }

  return (
    <Toggle
      label={overwrite ? "Overwrite Existing Session" : "Save as a new Session"}
      checked={overwrite}
      onChange={() => {
        isChecked();
      }}
    />
  );
};

export default OverwriteName;
