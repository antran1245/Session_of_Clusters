import "./App.css";
import { useEffect } from "react";
import {
  getStorageSession,
  getStorageSetting,
  initialSetting,
  setStorageSetting,
} from "@shared/chrome/storage";
import { useStorageContext } from "@context/StorageContext";
import SaveSession from "@features/SavedSession";
import SavedSessionList from "@features/SavedSessionList";
import OptionsPopover from "@features/OptionsPopover";
import { useSettingsContext } from "@context/SettingsContext";

function App() {
  const { setSessions } = useStorageContext();
  const { setSettings } = useSettingsContext();

  useEffect(() => {
    getStorageSession().then((result) => {
      if (result) setSessions(result);
    });
    getStorageSetting().then((result) => {
      if (result && Object.keys(result).length > 0) {
        setSettings(result);
      } else {
        setSettings(initialSetting);
        setStorageSetting(initialSetting);
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-row justify-end mt-1">
        <OptionsPopover />
      </div>
      <div className="pb-3 w-[85%] mx-auto">
        <h1 className="font-bold mb-3">Tabmark</h1>
        <SaveSession />
        <SavedSessionList />
      </div>
    </>
  );
}

export default App;
