import Button from "@components/ui/Button";
import { currentStorageLocal } from "@shared/chrome/storage";
import React from "react";

const PrintStorage: React.FC = () => {
  /**
   * Print all the sessions by getting the Chrome storage
   */
  function printStorage() {
    // getStorageLocal();
    // .then((result) => {
    //   console.log("CurrentStorageLocal: ", currentStorageLocal);
    //   console.log("Result: ", result);
    // });
    console.log("CurrentStorageLocal: ", currentStorageLocal);
  }
  return <Button label="Print Storage" onClick={printStorage} />;
};

export default PrintStorage;
