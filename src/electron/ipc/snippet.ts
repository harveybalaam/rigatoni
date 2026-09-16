import { IpcMainInvokeEvent } from "electron";
import {
  CreateSnippetResponse,
  DeleteSnippetResponse,
  GetAllSnippetsResponse,
  GetSnippetResponse,
  Snippet,
  SnippetContent,
  snippetContentSchema,
  UpdateSnippetResponse,
  SnippetUpdateBody,
  snippetUpdateBodySchema,
} from "../../shared/schemas/snippet.ts";
import validateSender from "../utils/validate-sender.ts";
import readSnippetsFile from "../utils/read-snippets.ts";
import writeToSnippetsFile from "../utils/write-snippets.ts";

export async function handleCreateSnippet(
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

export async function handleGetSnippetById(
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

export async function handleGetAllSnippets(
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

export async function handleUpdateSnippetById(
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

export async function handleDeleteSnippetById(
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
