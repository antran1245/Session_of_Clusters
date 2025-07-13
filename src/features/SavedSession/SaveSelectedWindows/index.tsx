import { Button, LabelSelection } from "@components/ui";
import {
  getAllActiveTabs,
  getCaptureVisibleTab,
  getTabs,
} from "@shared/chrome/tabs";
import React, { useState } from "react";
import "./style.css";
import { setStorageSession } from "@shared/chrome/storage";
import { useStorageContext } from "@context/StorageContext";
import {
  checkIfSessionNameExist,
  createSaveWindowsObject,
} from "@shared/helpers";

interface SaveSelectedWindowsProps {
  name: string;
  overwrite: boolean;
}

type ImageTab = chrome.tabs.Tab & {
  image?: string;
};

const SaveSelectedWindows: React.FC<SaveSelectedWindowsProps> = ({
  name,
  overwrite,
}) => {
  const { sessions, setSessions } = useStorageContext();
  // Array of active tabs with an image
  const [activeTabsImage, setActiveTabsImage] = useState<ImageTab[]>([]);
  // Array of window ids to be saved as a Session
  const [selectedWindows, setSelectedWindows] = useState<number[]>([]);
  // Toggle the dialog box
  const [showDialog, setShowDialog] = useState<boolean>(false);

  /**
   * Add image to Tab object to show image
   */
  async function showActiveTabs() {
    const tabs = await getAllActiveTabs();

    if (!tabs) return;

    const addImageToTab = await Promise.all(
      tabs.map(async (tab) => {
        const image = await getCaptureVisibleTab(tab.windowId);
        return { ...tab, image };
      })
    );

    setActiveTabsImage(addImageToTab);
    setShowDialog(true);
  }

  /**
   * Add or remove tab from selected array based on toggle of checkbox
   * @param tab - Chrome tab to save
   */
  function toggleWindow(tab: ImageTab) {
    setSelectedWindows((prev) => {
      const exist = prev.some((i) => i === tab.windowId);
      if (exist) {
        return prev.filter((i) => i !== tab.windowId);
      }
      return [...prev, tab.windowId];
    });
  }

  /**
   * Determine if checkbox should be checked
   * @param windowId - Id to check if checkbox should be checked
   * @returns A boolean value
   */
  function isSelected(windowId: number) {
    return selectedWindows.some((item) => item === windowId);
  }

  function SaveSelectedWindows() {
    // Get all current tabs
    getTabs().then((tabs) => {
      if (tabs) {
        // Parse all tabs into an object
        let data = createSaveWindowsObject(tabs, selectedWindows);
        if (Object.keys(data).length > 0) {
          const checkName = overwrite
            ? name
            : checkIfSessionNameExist(name, Object.keys(sessions));
          let session = {
            name: checkName,
            browsers: data,
            date: new Date().toISOString(),
          };
          // Store session into storage
          setStorageSession(session).then((result) => {
            if (result) {
              setSessions((prev) => ({ ...prev, [session.name]: session }));
            }
          });
        }
      }
    });
  }

  return (
    <>
      <Button
        label="Save Selected Windows"
        onClick={showActiveTabs}
        className="p-2"
      />
      {showDialog && (
        <div
          id="save-selected-windows-container"
          className="w-[90%] h-[90%] rounded bg-[#595a78]"
        >
          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-wrap gap-2 max-h-[200px] bg-[#7F8CAA] rounded overflow-y-auto p-2">
              {/* {activeTabsImage.length} */}
              {activeTabsImage.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <LabelSelection
                        label={`Window ${index + 1}`}
                        type="checkbox"
                        name={`checkbox-${index}`}
                        checked={isSelected(item.windowId)}
                        onChange={() => toggleWindow(item)}
                      />
                    </div>
                    <img
                      src={item.image}
                      alt={item.title}
                      width={175}
                      height={175}
                    />
                  </div>
                );
              })}
            </div>
            <div className="self-end flex gap-2 flex-wrap">
              <Button
                label="Save"
                onClick={async () => {
                  await SaveSelectedWindows();
                  setShowDialog(false);
                }}
                className="w-fit p-2"
              />
              <Button
                label="Close"
                onClick={() => {
                  setShowDialog(false);
                }}
                className="w-fit p-2"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveSelectedWindows;
