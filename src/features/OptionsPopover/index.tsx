import React from "react";
import { Button } from "@components/ui";
import ellipseIcon from "@assets/ellipsis-vertical-solid.svg";
import "./style.css";
import {
  ClearSession,
  OpenSessionSetting,
  OverwriteName,
} from "@components/Settings";

const OptionsPopover: React.FC = () => {
  return (
    <>
      <Button
        id="options-button"
        popoverTarget={"options-container"}
        popoverTargetAction="toggle"
        className="w-fit p-0 bg-transparent hover:border-transparent"
        onClick={() => {}}
      >
        <img src={ellipseIcon} alt="Option" className="w-4 h-4 invert" />
      </Button>
      <div
        id="options-container"
        popover="auto"
        {...{ anchor: "options-button" }}
        className="border rounded border-white-500 w-1/2 bg-[#595a78] p-2"
      >
        <div className="w-full flex flex-col justify-start gap-2">
          <ClearSession />
          <OpenSessionSetting />
          <OverwriteName />
        </div>
      </div>
    </>
  );
};

export default OptionsPopover;
