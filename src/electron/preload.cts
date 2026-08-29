import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("appWindow", {
  setIsWindowExpanded: (isWindowExpanded: boolean) =>
    ipcRenderer.send("set-window-expanded", isWindowExpanded),
});
