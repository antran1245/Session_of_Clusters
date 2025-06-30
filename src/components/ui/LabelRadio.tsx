/**
 * Label container with Input radio component
 *
 * A reuseable UI label+radio component.
 *
 * Usage:
 * <LabelRadio label={"click me"}/>
 */

import React from "react";

interface LabelRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label the radio
   */
  label: string;
}

const LabelRadio: React.FC<LabelRadioProps> = ({ label, ...inputProps }) => {
  return (
    <label className="w-fit flex flex-row items-center gap-2">
      <input
        type="radio"
        {...inputProps}
        className="w-4 h-4 accent-blue-800 bg-white"
      />
      {label}
    </label>
  );
};

export default LabelRadio;
