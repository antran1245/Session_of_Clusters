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
    <label className="w-fit">
      <input type="radio" {...inputProps} />
      {label}
    </label>
  );
};

export default LabelRadio;
