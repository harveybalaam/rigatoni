import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("appWindow", {
  setHeightOffset: (windowHeightOffset: number) =>
    ipcRenderer.send("set-window-height-offset", windowHeightOffset),
});
