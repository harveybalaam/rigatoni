import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { IpcChannelWindow } from "../../shared/ipc-channel.ts";

function handleSetIsWindowExpanded(
  event: IpcMainEvent,
  isWindowExpanded: boolean,
) {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) return;

  const prevBounds = window.getBounds();
  const expandedHeightDiff = 168;

  if (isWindowExpanded) {
    window.setBounds({
      ...prevBounds,
      y: prevBounds.y - expandedHeightDiff,
      height: prevBounds.height + expandedHeightDiff,
    });

    return;
  }

  window.setBounds({
    ...prevBounds,
    y: prevBounds.y + expandedHeightDiff,
    height: prevBounds.height - expandedHeightDiff,
  });
}

export default function registerWindowIpcHandlers() {
  ipcMain.on(IpcChannelWindow.SET_EXPANDED, handleSetIsWindowExpanded);
}
