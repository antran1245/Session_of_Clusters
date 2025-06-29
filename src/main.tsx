import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StorageProvider } from "@context/StorageContext";
import { SettingProvider } from "@context/SettingsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </SettingProvider>
  </StrictMode>
);
