import React from "react";
import {
  ClearSession,
  OpenSessionSetting,
  OverwriteName,
} from "@components/Settings";
import { Popover } from "@components/ui";
import gearIcon from "@assets/gear-solid.svg";

const OptionsPopover: React.FC = () => {
  return (
    <>
      <Popover
        name="options"
        iconImage={gearIcon}
        ellipseClassName="rounded-lg"
      >
        <ClearSession />
        <OpenSessionSetting />
        <OverwriteName />
      </Popover>
    </>
  );
};

export default OptionsPopover;
