import { contextBridge, ipcRenderer } from "electron/renderer";
import {
  CreateSnippetResponse,
  DeleteSnippetResponse,
  GetAllSnippetsResponse,
  GetSnippetResponse,
  Snippet,
  SnippetContent,
  SnippetUpdateBody,
  UpdateSnippetResponse,
} from "../shared/schemas/snippet";

contextBridge.exposeInMainWorld("appWindow", {
  setHeightOffset: (windowHeightOffset: number) => {
    ipcRenderer.send("set-window-height-offset", windowHeightOffset);
  },
});

contextBridge.exposeInMainWorld("api", {
  createSnippet: async (
    snippetContent: SnippetContent,
  ): Promise<CreateSnippetResponse> => {
    return ipcRenderer.invoke("create-snippet", snippetContent);
  },
  getSnippetById: async (
    snippetId: Snippet["id"],
  ): Promise<GetSnippetResponse> => {
    return ipcRenderer.invoke("get-snippet-by-id", snippetId);
  },
  getAllSnippets: async (): Promise<GetAllSnippetsResponse> => {
    return ipcRenderer.invoke("get-all-snippets");
  },
  updateSnippetById: async (
    snippetBody: SnippetUpdateBody,
  ): Promise<UpdateSnippetResponse> => {
    return ipcRenderer.invoke("update-snippet-by-id", snippetBody);
  },
  deleteSnippetById: async (
    snippetId: Snippet["id"],
  ): Promise<DeleteSnippetResponse> => {
    return ipcRenderer.invoke("delete-snippet-by-id", snippetId);
  },
});
