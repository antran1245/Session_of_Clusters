/**
 * Button component
 *
 * A reuseable UI button component that supports click event and customizable classes.
 *
 * Usage:
 * <Button label={"click me"} onClick={clickEvent} className={'class'}/>
 */

import React from "react";
import { cn } from "@shared/format";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * String label to the button.
   */
  label?: string;

  /**
   * Click event handler.
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional additional classes to apply to the button.
   */
  className?: string;

  /**
   * Optional elements
   */
  children?: React.ReactNode;
}

/**
 * Button component for triggering actions.
 *
 * Renders a styled button with supports for passing custom CSS classes.
 *
 * @param {ButtonProps} props - Button props
 * @returns JSX Element representing a button.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border border-solid border-transparent py-2.5 px-5 bg-[#1a1a1a] text-base text-medium font-inherit cursor-pointer transition-colors duration-[250ms] hover:border-[#646cff] focus:outline focus:outline-2 focus:outline-white-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white-300",
        className
      )}
      {...props}
    >
      {children}
      {label}
    </button>
  );
};

export default Button;
