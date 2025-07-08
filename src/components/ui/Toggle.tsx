/**
 * Toggle component
 *
 * A reuseable UI checkbox toggle component.
 *
 * Usage:
 * <Toggle label={"click me"}/>
 */
import { cn } from "@shared/format";
import React from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

const Toggle: React.FC<ToggleProps> = ({
  label,
  labelClassName,
  inputClassName,
  ...inputProps
}) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input {...inputProps} type="checkbox" className="peer sr-only" />
      <div
        className={cn(
          "peer relative h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:start-[2.1px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800",
          inputClassName
        )}
      ></div>
      <span
        className={cn(
          "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300",
          labelClassName
        )}
      >
        {label}
      </span>
    </label>
  );
};

export default Toggle;
