import { LabelSelection } from "@components/ui";
import { useSettingsContext } from "@context/SettingsContext";
import { setStorageSetting } from "@shared/chrome/storage";
import React, { useEffect, useState } from "react";

const OpenSessionSetting: React.FC = () => {
  const { settings, setSettings } = useSettingsContext();
  const [selected, setSelected] = useState<string | boolean>("close");

  useEffect(() => {
    if (settings && settings["onSessionOpen"])
      setSelected(settings["onSessionOpen"].value);
  }, [settings]);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const onSessionOpenSetting = {
      value: event.target.value,
      firstTime: false,
    };
    const updateSetting = { ...settings, onSessionOpen: onSessionOpenSetting };
    setSettings((prev) => ({
      ...prev,
      onSessionOpen: onSessionOpenSetting,
    }));
    setSelected(event.target.value);
    setStorageSetting(updateSetting);
  }

  return (
    <fieldset className="flex flex-col gap-1 justify-items-start">
      <legend className="text-left mb-1 font-medium">
        On Opening of a Session:
      </legend>
      <LabelSelection
        type="radio"
        label="Close all current windows."
        value={"close"}
        checked={selected === "close"}
        onChange={handleSelect}
      />
      <LabelSelection
        type="radio"
        label="Do not close current windows."
        value={"not close"}
        checked={selected === "not close"}
        onChange={handleSelect}
      />
      <LabelSelection
        type="radio"
        label="Save current windows."
        value={"save"}
        checked={selected === "save"}
        onChange={handleSelect}
      />
    </fieldset>
  );
};

export default OpenSessionSetting;
