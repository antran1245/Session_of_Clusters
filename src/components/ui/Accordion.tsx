/**
 * Accordion component with a require title.
 * Children will be the items inside the accordion.
 *
 * Usage: <Accordion title="title">{children}</Accordion>
 */
import React, { useState } from "react";
import chevronDownIcon from "@assets/chevron-down-solid.svg";

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  // Control to show the items
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="w-full flex flex-row justify-between items-center cursor-pointer border border-[#93DEFF] p-1 rounded-t"
      >
        <span className="font-bold text-left">{title}</span>
        <img
          src={chevronDownIcon}
          alt="down arrow"
          className="h-4 w-4 invert"
        />
      </button>
      {show && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
