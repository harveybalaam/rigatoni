import { contextBridge, ipcRenderer } from "electron/renderer";
import {
  Snippet,
  SnippetContent,
  SnippetUpdateBody,
} from "../shared/schemas/snippet";

contextBridge.exposeInMainWorld("appWindow", {
  setHeightOffset: (windowHeightOffset: number) => {
    ipcRenderer.send("set-window-height-offset", windowHeightOffset);
  },
});

contextBridge.exposeInMainWorld("api", {
  createSnippet: async (snippetContent: SnippetContent) => {
    return ipcRenderer.invoke("create-snippet", snippetContent);
  },
  getSnippetById: async (snippetId: Snippet["id"]) => {
    return ipcRenderer.invoke("get-snippet-by-id", snippetId);
  },
  getAllSnippets: async () => {
    return ipcRenderer.invoke("get-all-snippets");
  },
  updateSnippetById: async (snippetBody: SnippetUpdateBody) => {
    return ipcRenderer.invoke("update-snippet-by-id", snippetBody);
  },
  deleteSnippetById: async (snippetId: Snippet["id"]) => {
    return ipcRenderer.invoke("delete-snippet-by-id", snippetId);
  },
});
