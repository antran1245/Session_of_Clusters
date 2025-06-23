import { Button } from "@components/ui";
import { useStorageContext } from "@context/StorageContext";
import { clearStorageLocal } from "@shared/chrome/storage";
import React from "react";

const ClearSession: React.FC = () => {
  const { setSessions } = useStorageContext();
  return (
    <Button
      label="Delete All Sessions"
      onClick={async () => {
        await clearStorageLocal();
        setSessions({});
      }}
      className="flex w-fit text-md bg-transparent border-none hover:underline focus:outline-none focus-visible:outline-none focus:underline focus:font-bold"
    />
  );
};

export default ClearSession;
