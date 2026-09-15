import { app } from "electron";
import { readFile } from "fs/promises";
import path from "path";

import {
  SnippetCollection,
  snippetCollectionSchema,
} from "../../shared/schemas/snippet.ts";

const snippetsFilePath = path.join(
  app.getPath("userData"),
  "rigatoni-snippets",
  "snippets.json",
);

export default async function readSnippetsFile(): Promise<SnippetCollection> {
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
