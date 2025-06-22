import Button from "@components/ui/Button";
import { currentStorageSession } from "@shared/chrome/storage";
import React from "react";

const PrintStorage: React.FC = () => {
  /**
   * Print all the sessions by getting the Chrome storage
   */
  function printStorage() {
    console.log("currentStorageSession: ", currentStorageSession);
  }
  return (
    <Button
      label="Print Storage"
      onClick={printStorage}
      className="text-xs p-2 mt-1"
    />
  );
};

export default PrintStorage;
