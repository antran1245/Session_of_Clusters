import PrintStorage from "@features/PrintStorage";
import "./App.css";
import SaveSession from "@features/SaveSession";
import { useEffect, useState } from "react";
import { getStorageLocal } from "@shared/chrome/storage";
import SavedSessionContainer from "@features/SavedSessionContainer";

function App() {
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    getStorageLocal().then((result) => {
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
