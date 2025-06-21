import type { StorageSessionType } from "@shared/chrome/storage";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type StorageContextType = {
  sessions: StorageSessionType;
  setSessions: React.Dispatch<React.SetStateAction<StorageSessionType>>;
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState({});

  return (
    <StorageContext.Provider value={{ sessions, setSessions }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorageContext must be used within a StorageProvider");
  }
  return context;
};
