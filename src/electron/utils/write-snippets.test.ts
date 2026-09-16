import { describe, expect, test, vi } from "vitest";
import { writeFile } from "fs/promises";
import { SnippetCollection } from "../../shared/schemas/snippet";
import writeToSnippetsFile from "./write-snippets.ts";

const snippetCollection = vi.hoisted((): SnippetCollection => {
  const nowISO = new Date().toISOString();

  return {
    snippets: ["1", "2", "3"].map((snippetId) => {
      return {
        id: snippetId,
        name: `Name ${snippetId}`,
        value: `Value ${snippetId}`,
        pinned: false,
        dateCreated: nowISO,
        dateLastUpdated: nowISO,
        dateLastUsed: nowISO,
      };
    }),
  };
});

vi.mock("fs/promises", () => {
  return {
    writeFile: vi.fn(),
  };
});

vi.mock("electron", () => {
  return {
    app: {
      getPath: vi.fn().mockReturnValue("path/test.json"),
    },
  };
});

describe("Write snippets to file", () => {
  test("Writes the passed snippet collection", () => {
    const stringifiedSnippets = JSON.stringify(snippetCollection);

    writeToSnippetsFile(snippetCollection);

    const writeFileMocked = vi.mocked(writeFile);

    expect(writeFileMocked.mock.lastCall?.at(1)).toBe(stringifiedSnippets);
  });

  test("Doesn't throw when passed an empty snippet collection", async () => {
    const emptyCollection: SnippetCollection = { snippets: [] };

    const writePromise = writeToSnippetsFile(emptyCollection);
    await expect(writePromise).resolves.not.toThrow();
  });

  test("Re-throws if writeFile throws an error", async ({ expect }) => {
    vi.mocked(writeFile).mockRejectedValueOnce(new Error("Test Error"));

    await expect(writeToSnippetsFile(snippetCollection)).rejects.toThrow(
      /^Failed to write to snippets file.*Test Error/s,
    );
  });

  test("Throws an 'Unknown error' if the caught error is not an instance of Error", async ({
    expect,
  }) => {
    vi.mocked(writeFile).mockRejectedValueOnce("Not an instance of Error");

    await expect(writeToSnippetsFile(snippetCollection)).rejects.toThrow(
      /^Failed to write to snippets file.*Unknown error/s,
    );
  });
});
