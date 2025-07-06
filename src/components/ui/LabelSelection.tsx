/**
 * Label container with Input radio or checkbox type component
 *
 * A reuseable UI label+(radio/checkbox) component.
 *
 * Usage:
 * <LabelSelection type="radio" label={"click me"}/>
 */

import { cn } from "@shared/format";
import React from "react";

interface LabelSelectionProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label the selection input
   */
  label: string;
  /**
   * Optional styling for label
   */
  labelClassName?: string;
  /**
   * Optional styling for input
   */
  inputClassName?: string;
}

const LabelSelection: React.FC<LabelSelectionProps> = ({
  label,
  labelClassName,
  inputClassName,
  ...inputProps
}) => {
  return (
    <label
      className={cn("w-fit flex flex-row items-center gap-2", labelClassName)}
    >
      <input
        {...inputProps}
        className={cn(
          "w-4 h-4 accent-blue-800 bg-white rounded",
          inputClassName
        )}
      />
      {label}
    </label>
  );
};

export default LabelSelection;
