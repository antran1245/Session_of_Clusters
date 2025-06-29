import { LabelRadio } from "@components/ui";
import React, { useState } from "react";

const OpenSessionSetting: React.FC = () => {
  const [selected, setSelected] = useState<string>("close");

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    setSelected(event.target.value);
  }

  return (
    <fieldset className="flex flex-col gap-1 justify-items-start">
      <legend className="text-left mb-1">On Opening of a Session:</legend>
      <LabelRadio
        label="Close all current windows."
        value={"close"}
        checked={selected === "close"}
        onChange={handleSelect}
      />
      <LabelRadio
        label="Do not close current windows."
        value={"not close"}
        checked={selected === "not close"}
        onChange={handleSelect}
      />
      <LabelRadio
        label="Save current windows."
        value={"save"}
        checked={selected === "save"}
        onChange={handleSelect}
      />
    </fieldset>
  );
};

export default OpenSessionSetting;
