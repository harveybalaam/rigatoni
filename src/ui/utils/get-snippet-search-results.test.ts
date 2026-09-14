import { describe, expect, expectTypeOf, test } from "vitest";
import getSnippetSearchResults from "./get-snippet-search-results";
import type { Snippet } from "../../shared/schemas/snippet";

const nowISO = new Date().toISOString();

const buildSnippets = (snippetNames: Snippet["name"][]) => {
  const snippets: Snippet[] = snippetNames.map((name) => {
    return {
      id: crypto.randomUUID(),
      name,
      value: name,
      pinned: false,
      dateLastUsed: nowISO,
      dateLastUpdated: nowISO,
      dateCreated: nowISO,
    };
  });

  return snippets;
};

describe("Get snippet search results", () => {
  test("Returns snippets starting with the search term", () => {
    const snippets = buildSnippets(["A", "AB", "C", "D"]);
    const searchResults = getSnippetSearchResults(snippets, "A");

    expect(searchResults.length).toBe(2);
    expect(searchResults.some((snippet) => snippet.name === "A")).toBe(true);
    expect(searchResults.some((snippet) => snippet.name === "AB")).toBe(true);
  });

  test("Returns maximum of 3 snippets when more match the search term", () => {
    const snippets = buildSnippets(["A", "A", "A", "A", "A"]);
    const searchResults = getSnippetSearchResults(snippets, "A");

    expect(searchResults.length).toBe(3);
  });

  test("Returns an empty array if no snippets match the search term", () => {
    const snippets = buildSnippets(["B", "C", "D", "E"]);
    const searchResults = getSnippetSearchResults(snippets, "A");

    expectTypeOf(searchResults).toBeArray();
    expect(searchResults.length).toBe(0);
  });

  test("Matches snippets case-insensitively", () => {
    const snippets = buildSnippets(["aaa", "AAA"]);
    const searchResults = getSnippetSearchResults(snippets, "a");

    expect(searchResults.length).toBe(2);
  });

  test("Returns no snippets for an empty search term", () => {
    const snippets = buildSnippets(["A", "B", "C"]);
    const searchResults = getSnippetSearchResults(snippets, "");

    expectTypeOf(searchResults).toBeArray();
    expect(searchResults.length).toBe(0);
  });

  test("Returns matching snippets in alphabetical order", () => {
    const snippets = buildSnippets(["AD", "AC", "AB"]);
    const searchResults = getSnippetSearchResults(snippets, "A");

    expect(searchResults.length).toBe(3);
    expect(searchResults.at(0)?.name).toBe("AB");
    expect(searchResults.at(1)?.name).toBe("AC");
    expect(searchResults.at(2)?.name).toBe("AD");
  });

  test("Returns an empty array when given one", () => {
    const searchResults = getSnippetSearchResults([], "A");

    expectTypeOf(searchResults).toBeArray();
    expect(searchResults.length).toBe(0);
  });
});
