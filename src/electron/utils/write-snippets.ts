import { app } from "electron";
import { writeFile } from "fs/promises";
import path from "path";

import { SnippetCollection } from "../../shared/schemas/snippet.ts";

const snippetsFilePath = path.join(
  app.getPath("userData"),
  "rigatoni-snippets",
  "snippets.json",
);

export default async function writeToSnippetsFile(
  contents: SnippetCollection,
): Promise<void> {
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
