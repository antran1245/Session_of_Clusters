import "./App.css";
import { useEffect } from "react";
import { getStorageSession } from "@shared/chrome/storage";
import { useStorageContext } from "@context/StorageContext";
import PrintStorage from "@features/PrintStorage";
import SaveSession from "@features/SaveSession";
import SavedSessionContainer from "@features/SavedSessionContainer";
import OptionsPopover from "@features/OptionsPopover";

function App() {
  const { setSessions } = useStorageContext();

  useEffect(() => {
    getStorageSession().then((result) => {
      if (result) setSessions(result);
    });
  }, []);
  return (
    <>
      <div className="flex flex-row justify-end mt-1">
        <OptionsPopover />
      </div>
      <div className="pb-3 w-[80%] mx-auto">
        <h1 className="font-bold mb-3">Tabmark</h1>
        <SaveSession />
        <PrintStorage />
        <SavedSessionContainer />
      </div>
    </>
  );
}

export default App;
