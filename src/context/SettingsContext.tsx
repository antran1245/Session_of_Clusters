import React, { createContext, useContext, useState } from "react";

type SettingsContextType = {
  onSessionOpen: string;
  setOnSessionOpen: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onSessionOpen, setOnSessionOpen] = useState<string>("close");
  return (
    <SettingsContext.Provider value={{ onSessionOpen, setOnSessionOpen }}>
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
