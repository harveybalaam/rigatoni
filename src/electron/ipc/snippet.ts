import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { IpcChannelSnippet } from "../../shared/ipc-channel.ts";
import {
  CreateSnippetResponse,
  Snippet,
  SnippetContent,
  snippetContentSchema,
  SnippetCollection,
  snippetCollectionSchema,
} from "../../shared/schemas/snippet.ts";

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
  _event: IpcMainInvokeEvent,
  snippetContent: SnippetContent,
): Promise<CreateSnippetResponse> {
  try {
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

export default function registerSnippetIpcHandlers() {
  ipcMain.handle(IpcChannelSnippet.CREATE, handleCreateSnippet);
}
