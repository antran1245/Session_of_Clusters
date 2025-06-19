import Button from "@components/ui/Button";
import { currentStorageLocal, getStorageLocal } from "@shared/chrome/storage";
import React from "react";

const PrintStorage: React.FC = () => {
  function printStorage() {
    getStorageLocal().then((result) => {
      console.log("CurrentStorageLocal: ", currentStorageLocal);
      console.log("Result: ", result);
    });
  }
  return <Button label="Print Storage" onClick={printStorage} />;
};

export default PrintStorage;
