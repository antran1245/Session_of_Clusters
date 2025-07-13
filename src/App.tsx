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
        setSettings({ ...initialSetting, ...result });
      } else {
        setSettings(initialSetting);
        setStorageSetting(initialSetting);
      }
    });
  }, []);
  return (
    <>
      <div className="w-full p-2">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Session of Clusters</h1>
          <OptionsPopover />
        </div>
        <SaveSession />
        <SavedSessionList />
      </div>
    </>
  );
}

export default App;
