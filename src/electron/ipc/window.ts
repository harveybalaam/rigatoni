import { BrowserWindow, ipcMain, IpcMainEvent, screen } from "electron";
import { IpcChannelWindow } from "../../shared/ipc-channel.ts";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_OFFSET_Y,
} from "../constants/window.ts";

function handleSetWindowHeightOffset(
  event: IpcMainEvent,
  windowHeightOffset: number,
) {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) return;

  const displaySize = screen.getPrimaryDisplay().workAreaSize;
  const offsetY = displaySize.height - DEFAULT_WINDOW_OFFSET_Y;

  const prevBounds = window.getBounds();

  window.setBounds({
    ...prevBounds,
    y: offsetY - windowHeightOffset,
    height: DEFAULT_WINDOW_HEIGHT + windowHeightOffset,
  });
}

export default function registerWindowIpcHandlers() {
  ipcMain.on(IpcChannelWindow.SET_HEIGHT_OFFSET, handleSetWindowHeightOffset);
}
