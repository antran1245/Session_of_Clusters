/**
 * Button component
 *
 * A reuseable UI button component that supports click event and customizable classes.
 *
 * Usage:
 * <Button label={"click me"} onClick={clickEvent} className={'class'}/>
 */

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  /**
   * String label to the button.
   */
  label: string;

  /**
   * Click event handler.
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional additional classes to apply to the button.
   */
  className?: string;
}

/**
 * Button component for triggering actions.
 *
 * Renders a styled button with supports for passing custom CSS classes.
 *
 * @param {ButtonProps} props - Button props
 * @returns JSX Element representing a button.
 */
const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button type="button" onClick={onClick} className={clsx(className)}>
      {label}
    </button>
  );
};

export default Button;
