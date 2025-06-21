import PrintStorage from "@features/PrintStorage";
import "./App.css";
import SaveSession from "@features/SaveSession";
import { useEffect } from "react";
import { getStorageSession } from "@shared/chrome/storage";
import SavedSessionContainer from "@features/SavedSessionContainer";
import { useStorageContext } from "@context/StorageContext";

function App() {
  const { sessions, setSessions } = useStorageContext();

  useEffect(() => {
    getStorageSession().then((result) => {
      if (result) setSessions(result);
    });
  }, []);
  return (
    <>
      <h1 className="font-bold">Tabmark</h1>
      <SaveSession />
      <PrintStorage />
      <SavedSessionContainer sessions={sessions} />
    </>
  );
}

export default App;
