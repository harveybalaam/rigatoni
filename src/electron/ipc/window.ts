import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { IpcChannelWindow } from "../../shared/ipc-channel.ts";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
} from "../constants/window.ts";

function handleSetWindowHeightOffset(
  event: IpcMainEvent,
  windowHeightOffset: number,
) {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) return;

  window.setSize(
    DEFAULT_WINDOW_WIDTH,
    DEFAULT_WINDOW_HEIGHT + windowHeightOffset,
  );
}

export default function registerWindowIpcHandlers() {
  ipcMain.on(IpcChannelWindow.SET_HEIGHT_OFFSET, handleSetWindowHeightOffset);
}
