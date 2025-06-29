import type { SettingType } from "@shared/chrome/storage";
import React, { createContext, useContext, useState } from "react";

type SettingsContextType = {
  settings: SettingType;
  setSettings: React.Dispatch<React.SetStateAction<SettingType>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<SettingType>({});
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within a StorageProvider");
  }
  return context;
};
