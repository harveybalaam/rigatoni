import { contextBridge, ipcRenderer } from "electron/renderer";
import {
  Snippet,
  SnippetContent,
  SnippetUpdateBody,
} from "../shared/schemas/snippet";

contextBridge.exposeInMainWorld("appWindow", {
  setHeightOffset: (windowHeightOffset: number) =>
    ipcRenderer.send("set-window-height-offset", windowHeightOffset),
});

contextBridge.exposeInMainWorld("api", {
  createSnippet: async (snippetContent: SnippetContent) =>
    ipcRenderer.invoke("create-snippet", snippetContent),
  getSnippetById: async (snippetId: Snippet["id"]) => {
    ipcRenderer.invoke("get-snippet-by-id", snippetId);
  },
  getAllSnippets: async () => {
    ipcRenderer.invoke("get-all-snippets");
  },
  updateSnippetById: async (snippetBody: SnippetUpdateBody) => {
    ipcRenderer.invoke("update-snippet-by-id", snippetBody);
  },
  deleteSnippetById: async (snippetId: Snippet["id"]) => {
    ipcRenderer.invoke("delete-snippet-by-id", snippetId);
  },
});
