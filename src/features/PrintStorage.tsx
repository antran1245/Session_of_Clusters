import Button from "@components/ui/Button";
import { currentStorageSession } from "@shared/chrome/storage";
import React from "react";

const PrintStorage: React.FC = () => {
  /**
   * Print all the sessions by getting the Chrome storage
   */
  function printStorage() {
    // getStorageSession();
    // .then((result) => {
    //   console.log("currentStorageSession: ", currentStorageSession);
    //   console.log("Result: ", result);
    // });
    console.log("currentStorageSession: ", currentStorageSession);
  }
  return <Button label="Print Storage" onClick={printStorage} />;
};

export default PrintStorage;
