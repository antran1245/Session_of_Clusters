import React from "react";
import { Button } from "@components/ui";
import ellipseIcon from "@assets/ellipsis-vertical-solid.svg";
import "./style.css";
import { cn } from "@shared/format";

interface PopoverProps {
  /**
   * Provide a name to the popover
   */
  name: string;
  iconImage?: string;
  /**
   * Positioning of the popover
   */
  anchorPosition?: string;
  children?: React.ReactNode;
  /**
   * Additional classnames
   */
  ellipseClassName?: string;
  containerClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
  name,
  iconImage = ellipseIcon,
  anchorPosition = "popover-bottom-left",
  children,
  ellipseClassName,
  containerClassName,
}) => {
  return (
    <>
      <Button
        id={`${name}-button`}
        popoverTarget={`${name}-container`}
        popoverTargetAction="toggle"
        className={cn(
          "w-fit p-0 bg-transparent hover:border-transparent ",
          ellipseClassName
        )}
        onClick={() => {}}
      >
        <img src={iconImage} alt="Option" className="w-4 h-4 invert" />
      </Button>
      <div
        id={`${name}-container`}
        popover="auto"
        {...{ anchor: `${name}-button` }}
        className={cn(
          "border rounded border-white-500 w-1/2 bg-[#595a78] p-2 ",
          anchorPosition,
          containerClassName
        )}
      >
        <div className="w-full flex flex-col justify-start gap-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default Popover;
