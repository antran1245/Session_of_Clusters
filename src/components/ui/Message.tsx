/**
 * Message component
 *
 * A reuseable message component with a custom style and possibility to add more styling.
 *
 * Usage:
 * <Message message={"Message"} className={"classes"}/>
 */
import React from "react";
import { cn } from "@shared/format";

interface MessageProps {
  /**
   * Text to display.
   */
  message: string;
  /**
   * Optional styling.
   */
  className?: string;
}

const Message: React.FC<MessageProps> = ({ message, className }) => {
  return <p className={cn("", className)}>{message}</p>;
};

export default Message;
