import { Button } from "@components/ui";
import { useStorageContext } from "@context/StorageContext";
import { removeStorageLocal, sessionKeyName } from "@shared/chrome/storage";
import trashIcon from "@assets/trash-solid.svg";
import React from "react";

const ClearSession: React.FC = () => {
  const { setSessions } = useStorageContext();
  return (
    <div className="flex flex-row gap-1 items-center">
      <img
        src={trashIcon}
        alt="trash icon"
        width={12}
        height={12}
        className="invert"
      />
      <Button
        label="Delete All Sessions"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          removeStorageLocal(sessionKeyName).then(() => {
            setSessions({});
          });
          event.currentTarget.blur();
        }}
        className="flex w-fit text-md font-medium text-blue-500 bg-transparent border-none p-0 hover:underline hover:font-extrabold focus:outline-none focus-visible:outline-none focus:underline focus:font-bold"
      />
    </div>
  );
};

export default ClearSession;
