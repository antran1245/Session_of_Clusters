import React from "react";
import SessionItem from "./SessionItem";
import { useStorageContext } from "@context/StorageContext";

const SavedSessionContainer: React.FC = () => {
  const { sessions } = useStorageContext();
  return (
    <div className="flex flex-col gap-2 mt-1">
      {Object.values(sessions).map((value, index) => {
        return <SessionItem key={index} session={value} />;
      })}
    </div>
  );
};

export default SavedSessionContainer;
