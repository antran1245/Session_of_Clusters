import React from "react";
import SessionItem from "./SessionItem";
import { useStorageContext } from "@context/StorageContext";

const SavedSessionContainer: React.FC = () => {
  const { sessions } = useStorageContext();

  return (
    <div className="flex flex-col gap-2 mt-1">
      <p className="text-bold text-md text-left">
        {Object.values(sessions).length > 0 && "Saved Session"}
        {Object.values(sessions).length > 1 && "s"}
      </p>
      {Object.values(sessions).map((value, index) => {
        return <SessionItem key={index} session={value} />;
      })}
    </div>
  );
};

export default SavedSessionContainer;
