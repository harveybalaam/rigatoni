import { ipcMain } from "electron";
import {
  IpcChannelSnippet,
  IpcChannelWindow,
} from "../../shared/ipc-channel.ts";
import {
  handleCreateSnippet,
  handleGetAllSnippets,
  handleGetSnippetById,
  handleUpdateSnippetById,
  handleDeleteSnippetById,
} from "./snippet.ts";
import handleSetWindowHeightOffset from "./window.ts";

export default function registerIpcHandlers() {
  // register window handlers
  ipcMain.on(IpcChannelWindow.SET_HEIGHT_OFFSET, handleSetWindowHeightOffset);

  // register snippet handlers
  ipcMain.handle(IpcChannelSnippet.CREATE, handleCreateSnippet);
  ipcMain.handle(IpcChannelSnippet.GET, handleGetSnippetById);
  ipcMain.handle(IpcChannelSnippet.GET_ALL, handleGetAllSnippets);
  ipcMain.handle(IpcChannelSnippet.UPDATE, handleUpdateSnippetById);
  ipcMain.handle(IpcChannelSnippet.DELETE, handleDeleteSnippetById);
}
