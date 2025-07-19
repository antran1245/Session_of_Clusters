import React, { useState } from "react";
import chevronDownIcon from "@assets/chevron-down-solid.svg";

interface AccordionProps {
  title: string;
  items: any[];
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, items, children }) => {
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
      {show && (
        <div>
          {items.map((key, index) => (
            <div
              className={`grid grid-cols-12 gap-1 items-center border-b border-x border-[#F7F7F7] p-2 ${
                index === items.length - 1 ? "rounded-b" : ""
              }`}
            >
              <a href={key.url} title={key.url} className="text-xs col-span-11">
                {key.title}
              </a>
              {children}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
