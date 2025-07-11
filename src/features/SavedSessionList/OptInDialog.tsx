import { Button, LabelSelection } from "@components/ui";
import { useSettingsContext } from "@context/SettingsContext";
import { setStorageSetting } from "@shared/chrome/storage";
import React, { useState } from "react";

interface OptInDialogProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<((value: boolean) => void) | null>;
}

const OptInDialog: React.FC<OptInDialogProps> = ({ setOpenDialog, ref }) => {
  const { settings, setSettings } = useSettingsContext();
  const [askAgain, setAskAgain] = useState<boolean>(
    !settings["onSessionOpen"].firstTime || false
  );

  function onAskAgainHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    let updatedOnSessionOpen = {
      value: settings["onSessionOpen"].value,
      firstTime: !checked,
    };
    setSettings({ ...settings, onSessionOpen: updatedOnSessionOpen });
    setAskAgain(checked);
  }

  function closeDialog(action: string) {
    let updatedOnSessionOpen = {
      value: action,
      firstTime: !askAgain,
    };
    setSettings({ ...settings, onSessionOpen: updatedOnSessionOpen });
    setStorageSetting({ ...settings, onSessionOpen: updatedOnSessionOpen });
    setOpenDialog(false);
    ref.current?.(true);
  }

  return (
    <div
      className="absolute top-0 left-0 h-full w-full bg-[#333446ed] flex justify-center items-center"
      onClick={() => {
        setOpenDialog(false);
      }}
    >
      <div
        className="size-1/2 bg-[#595a78] flex flex-col justify-between rounded py-2"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-lg">
          How would you like to handle the current windows?
        </p>
        <LabelSelection
          type="checkbox"
          label="Don't ask me again"
          checked={askAgain}
          onChange={onAskAgainHandler}
          labelClassName="w-fit flex flex-row justify-center m-auto"
        />
        <div className="w-full flex justify-around">
          <Button
            label="Close Them"
            onClick={() => {
              closeDialog("close");
            }}
            className="p-1"
          />
          <Button
            label="Save and Close Them"
            onClick={() => {
              closeDialog("save");
            }}
            className="py-1 px-2"
          />
          <Button
            label="Remain Open"
            onClick={() => {
              closeDialog("not close");
            }}
            className="p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default OptInDialog;
