import { Toggle } from "@components/ui";
import { useSettingsContext } from "@context/SettingsContext";
import React from "react";

interface OverwriteNameProps {
  overwrite: boolean;
  setOverwrite: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverwriteName: React.FC<OverwriteNameProps> = ({
  overwrite,
  setOverwrite,
}) => {
  const { settings, setSettings } = useSettingsContext();

  function isChecked() {
    setSettings({
      ...settings,
      overwriteSessionName: {
        value: !overwrite,
        firstTime: settings["overwriteSessionName"].firstTime,
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
