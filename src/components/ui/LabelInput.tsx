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

interface LabelProps {
  /**
   * Label the input form
   */
  label: string;
  /**
   * Specify purpose for input
   */
  forLabel: string;
  /**
   * Input value
   */
  value: string;
  /**
   * Handler for input event
   * @param event - action
   * @returns
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optional required
   */
  required?: boolean;
  /**
   * Optional Input placholder
   */
  placeholder?: string;
  /**
   * Optional styling for label
   */
  labelClassName?: string;
  /**
   * Optional styling for input
   */
  inputClassName?: string;
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
  value = "",
  onChange,
  required = false,
  placeholder = "",
  labelClassName,
  inputClassName,
}) => {
  return (
    <label
      htmlFor={forLabel}
      className={cn("flex flex-col text-start", labelClassName)}
    >
      <p>
        {label}
        <span className="text-red-500">{required && "*"}</span>
      </p>
      <input
        type="text"
        name={forLabel}
        className={cn("border-1 p-1 rounded-sm", inputClassName)}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default LabelInput;
