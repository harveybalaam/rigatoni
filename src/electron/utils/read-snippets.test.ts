import { describe, expect, test, vi } from "vitest";
import { SnippetCollection } from "../../shared/schemas/snippet.ts";
import { readFile } from "fs/promises";
import readSnippetsFile from "./read-snippets.ts";

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
    readFile: vi.fn().mockResolvedValue(JSON.stringify(snippetCollection)),
  };
});

vi.mock("electron", () => {
  return {
    app: {
      getPath: vi.fn().mockReturnValue("path/test.json"),
    },
  };
});

describe("Read snippets from file", () => {
  test("Reads in all available snippets", async () => {
    const parsedSnippetFile = await readSnippetsFile();

    expect(parsedSnippetFile).toBeDefined();

    expect(parsedSnippetFile?.snippets).toBeDefined();
    expect(parsedSnippetFile?.snippets?.length).toBe(3);
  });

  test("Reads in all snippet details", async () => {
    const parsedSnippetFile = await readSnippetsFile();

    expect(parsedSnippetFile).toEqual(snippetCollection);
  });

  test("Returns an empty array when there are no snippets in the collection", async () => {
    const emptyCollection: SnippetCollection = {
      snippets: [],
    };

    vi.mocked(readFile).mockResolvedValue(JSON.stringify(emptyCollection));

    expect(readSnippetsFile).not.toThrow();

    const parsedSnippetFile = await readSnippetsFile();
    expect(parsedSnippetFile?.snippets?.length).toBe(0);
  });

  test("Throws for a file with invalid snippets", async ({ expect }) => {
    const nowISO = new Date().toISOString();

    const invalidSnippetCollection = {
      snippets: [
        {
          id: 1,
          name: "Name 1",
          value: "Value 1",
          pinned: false,
          dateCreated: nowISO,
          dateLastUpdated: nowISO,
          dateLastUsed: nowISO,
        },
      ],
    };

    vi.mocked(readFile).mockResolvedValueOnce(
      JSON.stringify(invalidSnippetCollection),
    );

    await expect(readSnippetsFile).rejects.toThrow(
      /^Failed to read snippets file.*Invalid input: expected string, received number/s,
    );
  });

  test("Throws for an empty file", async ({ expect }) => {
    vi.mocked(readFile).mockResolvedValueOnce("");

    await expect(readSnippetsFile).rejects.toThrow(
      /^Failed to read snippets file/,
    );
  });

  test("Re-throws if readFile throws an error", async ({ expect }) => {
    vi.mocked(readFile).mockRejectedValueOnce(new Error("Test Error"));

    await expect(readSnippetsFile).rejects.toThrow(
      /^Failed to read snippets file.*Test Error/s,
    );
  });

  test("Throws an 'Unknown error' if the caught error is not an instance of Error", async ({
    expect,
  }) => {
    vi.mocked(readFile).mockRejectedValueOnce("Not an instance of Error");

    await expect(readSnippetsFile).rejects.toThrow(
      /^Failed to read snippets file.*Unknown error/s,
    );
  });
});
