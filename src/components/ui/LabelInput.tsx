/**
 * Label container with Input component
 *
 * A reuseable UI label+input component that supports click event and customizable classes.
 *
 * Usage:
 * <LabelInput label={"click me"} forLabel={"label"} labelClassName={'class'} inputClassName={'class'}/>
 */

import React from "react";
import { cn } from "@shared/format";

interface LabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label the input form
   */
  label: string;
  /**
   * Specify purpose for input
   */
  forLabel: string;
  /**
   * Optional styling for label
   */
  labelClassName?: string;
  /**
   * Optional styling for input
   */
  inputClassName?: string;
  /**
   * Optional Message
   */
  messageComponent?: React.ReactNode;
}

/**
 * Label and Input component for Form,
 *
 * Renders a styled label container with an input.
 *
 * @param {LabelProps} props - LabelInput props
 * @returns JSX Element representing a label container with an input textbox
 */
const LabelInput: React.FC<LabelProps> = ({
  label,
  forLabel,
  required = false,
  labelClassName,
  inputClassName,
  messageComponent,
  ...inputProps
}) => {
  return (
    <label
      htmlFor={forLabel}
      className={cn("flex flex-col text-start", labelClassName)}
    >
      <div className="flex gap-4">
        <p>
          {label}
          <span className="text-red-500">{required && "*"}</span>
        </p>
        {messageComponent}
      </div>
      <input
        type="text"
        name={forLabel}
        className={cn("border-1 p-1 rounded-sm", inputClassName)}
        required={required}
        {...inputProps}
      />
    </label>
  );
};

export default LabelInput;
