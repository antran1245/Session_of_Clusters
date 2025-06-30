import { Button } from "@components/ui";
import {
  getAllActiveTabs,
  getCaptureVisibleTab,
  getTabs,
} from "@shared/chrome/tabs";
import React, { useState } from "react";
import "./style.css";
import { setStorageSession } from "@shared/chrome/storage";
import { useStorageContext } from "@context/StorageContext";
import { createSaveWindowsObject } from "@shared/helpers";

type ImageTab = chrome.tabs.Tab & {
  image?: string;
};

const SaveSelectedWindows: React.FC<{ name: string }> = ({ name }) => {
  const { setSessions } = useStorageContext();

  const [activeTabsImage, setActiveTabsImage] = useState<ImageTab[]>([]);

  const [selectedWindows, setSelectedWindows] = useState<number[]>([]);

  /**
   * Add image to Tab object to show image
   */
  function showActiveTabs() {
    getAllActiveTabs().then(async (result) => {
      let addImageToTab = [];
      if (result) {
        for (const tab of result) {
          const image = await getCaptureVisibleTab(tab.windowId);
          addImageToTab.push({ ...tab, image });
        }
      }
      setActiveTabsImage(addImageToTab);
    });
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
          let session = {
            name,
            browsers: data,
          };
          // Store session into storage
          setStorageSession(session).then((result) => {
            if (result) {
              setSessions((prev) => ({ ...prev, [session.name]: session }));
              // setShowMessage(true);
            }
          });
        }
      }
    });
  }

  return (
    <>
      <Button
        id="save-selected-windows-button"
        popoverTarget="save-selected-windows-container"
        popoverTargetAction="toggle"
        label="Save Selected Windows"
        onClick={showActiveTabs}
        className="p-2"
      />
      <div
        id="save-selected-windows-container"
        popover="auto"
        className="w-[90%] h-[90%] rounded bg-[#595a78]"
      >
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-wrap gap-2 max-h-[200px] bg-[#7F8CAA] rounded overflow-y-auto p-2">
            {activeTabsImage.map((item, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name={`checkbox-${index}`}
                      checked={isSelected(item.windowId)}
                      onChange={() => toggleWindow(item)}
                    />
                    <label>Window {index + 1}</label>
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
              popoverTarget="save-selected-windows-container"
              popoverTargetAction="toggle"
              onClick={() => {
                SaveSelectedWindows();
              }}
              className="w-fit p-2"
            />
            <Button
              label="Close"
              popoverTarget="save-selected-windows-container"
              popoverTargetAction="toggle"
              onClick={() => {}}
              className="w-fit p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveSelectedWindows;
