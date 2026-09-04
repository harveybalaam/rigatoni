import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { IpcChannelSnippet } from "../../shared/ipc-channel.ts";
import {
  CreateSnippetResponse,
  DeleteSnippetResponse,
  GetAllSnippetsResponse,
  GetSnippetResponse,
  Snippet,
  SnippetContent,
  snippetContentSchema,
  SnippetCollection,
  snippetCollectionSchema,
  UpdateSnippetResponse,
  SnippetUpdateBody,
  snippetUpdateBodySchema,
} from "../../shared/schemas/snippet.ts";
import validateSender from "../utils/validate-sender.ts";

const snippetsFilePath = path.join(
  app.getPath("userData"),
  "rigatoni-snippets",
  "snippets.json",
);

async function readSnippetsFile(): Promise<SnippetCollection> {
  try {
    const snippetsFileContents = await readFile(snippetsFilePath, {
      encoding: "utf-8",
    });

    const parsedContents = JSON.parse(snippetsFileContents);
    const snippetCollection = snippetCollectionSchema.parse(parsedContents);

    return snippetCollection;
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Unknown error");
    throw new Error(`Failed to read snippets file: ${err.message}`, {
      cause: error,
    });
  }
}

async function writeToSnippetsFile(contents: SnippetCollection): Promise<void> {
  try {
    const stringifiedContents = JSON.stringify(contents);
    await writeFile(snippetsFilePath, stringifiedContents);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Unknown error");
    throw new Error(`Failed to write to snippets file: ${err.message}`, {
      cause: error,
    });
  }
}

async function handleCreateSnippet(
  event: IpcMainInvokeEvent,
  snippetContent: SnippetContent,
): Promise<CreateSnippetResponse> {
  try {
    if (!validateSender(event.senderFrame)) {
      throw new Error("Invalid sender");
    }

    const { snippets: fetchedSnippets = [] } = await readSnippetsFile();
    const parsedSnippetContent = snippetContentSchema.parse(snippetContent);

    const now = new Date().toISOString();

    const newSnippet: Snippet = {
      id: crypto.randomUUID(),
      dateCreated: now,
      dateLastUpdated: now,
      dateLastUsed: now,
      ...parsedSnippetContent,
    };

    fetchedSnippets.push(newSnippet);
    await writeToSnippetsFile({ snippets: fetchedSnippets });

    return { success: true };
  } catch {
    return { success: false };
  }
}

async function handleGetSnippetById(
  event: IpcMainInvokeEvent,
  snippetId: Snippet["id"],
): Promise<GetSnippetResponse> {
  try {
    if (!validateSender(event.senderFrame)) {
      throw new Error("Invalid sender");
    }

    const snippetCollection = await readSnippetsFile();

    const targetSnippet = snippetCollection.snippets?.find(
      ({ id }) => id === snippetId,
    );

    return {
      success: true,
      snippet: targetSnippet,
    };
  } catch {
    return { success: false };
  }
}

async function handleGetAllSnippets(
  event: IpcMainInvokeEvent,
): Promise<GetAllSnippetsResponse> {
  try {
    if (!validateSender(event.senderFrame)) {
      throw new Error("Invalid sender");
    }

    const { snippets: fetchedSnippets = [] } = await readSnippetsFile();

    return {
      snippets: fetchedSnippets,
      success: true,
    };
  } catch {
    return { success: false };
  }
}

async function handleUpdateSnippetById(
  event: IpcMainInvokeEvent,
  snippetBody: SnippetUpdateBody,
  snippetId: Snippet["id"],
): Promise<UpdateSnippetResponse> {
  try {
    if (!validateSender(event.senderFrame)) {
      throw new Error("Invalid sender");
    }

    const { snippets: fetchedSnippets = [] } = await readSnippetsFile();
    const parsedSnippetContent = snippetUpdateBodySchema.parse(snippetBody);

    const targetSnippet = fetchedSnippets.find(({ id }) => id === snippetId);
    if (!targetSnippet) return { success: false };

    const updatedSnippet: Snippet = {
      ...targetSnippet,
      ...parsedSnippetContent,
      dateLastUpdated: new Date().toISOString(),
    };

    const updatedSnippets = fetchedSnippets.map((snippet) => {
      if (snippet.id === snippetId) {
        return updatedSnippet;
      }
      return snippet;
    });

    await writeToSnippetsFile({ snippets: updatedSnippets });

    return {
      snippet: updatedSnippet,
      success: true,
    };
  } catch {
    return { success: false };
  }
}

async function handleDeleteSnippetById(
  event: IpcMainInvokeEvent,
  snippetId: Snippet["id"],
): Promise<DeleteSnippetResponse> {
  try {
    if (!validateSender(event.senderFrame)) {
      throw new Error("Invalid sender");
    }

    const { snippets: fetchedSnippets = [] } = await readSnippetsFile();

    if (fetchedSnippets.length === 0) {
      return { success: true };
    }

    const filteredSnippets = fetchedSnippets.filter(
      ({ id }) => id !== snippetId,
    );

    await writeToSnippetsFile({ snippets: filteredSnippets });

    return { success: true };
  } catch {
    return { success: false };
  }
}

export default function registerSnippetIpcHandlers() {
  ipcMain.handle(IpcChannelSnippet.CREATE, handleCreateSnippet);
  ipcMain.handle(IpcChannelSnippet.GET, handleGetSnippetById);
  ipcMain.handle(IpcChannelSnippet.GET_ALL, handleGetAllSnippets);
  ipcMain.handle(IpcChannelSnippet.UPDATE, handleUpdateSnippetById);
  ipcMain.handle(IpcChannelSnippet.DELETE, handleDeleteSnippetById);
}
