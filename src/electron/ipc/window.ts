import { BrowserWindow, IpcMainEvent } from "electron";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
} from "../constants/window.ts";

export default function handleSetWindowHeightOffset(
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
