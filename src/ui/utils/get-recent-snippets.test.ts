import { describe, expect, expectTypeOf, test } from "vitest";
import type { Snippet } from "../../shared/schemas/snippet";
import getRecentSnippets from "./get-recent-snippets";

const getOffsetDate = (offsetDays: number) => {
  const offsetDate = new Date();
  offsetDate.setDate(offsetDate.getDate() + offsetDays);

  return offsetDate;
};

const buildSnippets = (dateOffsets: number[]) => {
  const snippets: Snippet[] = dateOffsets.map((offset) => {
    return {
      id: crypto.randomUUID(),
      name: String(offset),
      value: String(offset),
      pinned: false,
      dateLastUsed: getOffsetDate(offset).toISOString(),
      dateLastUpdated: getOffsetDate(0).toISOString(),
      dateCreated: getOffsetDate(0).toISOString(),
    };
  });

  return snippets;
};

describe("Get recent snippets", () => {
  test("Returns only snippets used in the last three days", () => {
    const snippets = buildSnippets([-2, -3, -4, -5, -6]);
    const recentSnippets = getRecentSnippets(snippets);

    expect(recentSnippets.length).toBe(1);
    expect(recentSnippets.at(0)?.name).toBe("-2");
  });

  test("Excludes snippets on the threshold of recency (3 days)", () => {
    const snippets = buildSnippets([0, -3, -3]);
    const recentSnippets = getRecentSnippets(snippets);

    expect(recentSnippets.length).toBe(1);
    expect(recentSnippets.at(0)?.name).toBe("0");
  });

  test("Returns maximum of 2 snippets when more than 2 are recent", () => {
    const snippets = buildSnippets([0, 0, -1, -5, -5]);
    const recentSnippets = getRecentSnippets(snippets);

    expect(recentSnippets.length).toBe(2);
    expect(recentSnippets.at(0)?.name).toBe("0");
    expect(recentSnippets.at(1)?.name).toBe("0");
  });

  test("Excludes pinned snippets regardless of recency", () => {
    const baseSnippets = buildSnippets([-4, -4, -4]);
    const snippets: Snippet[] = [
      ...baseSnippets,
      {
        id: crypto.randomUUID(),
        name: "0",
        value: "0",
        pinned: true,
        dateLastUsed: getOffsetDate(0).toISOString(),
        dateLastUpdated: getOffsetDate(0).toISOString(),
        dateCreated: getOffsetDate(0).toISOString(),
      },
    ];

    const recentSnippets = getRecentSnippets(snippets);

    expect(recentSnippets.length).toBe(0);
  });

  test("Sorts returned snippets, most recent first", () => {
    const snippets = buildSnippets([-2, 0, -3]);
    const recentSnippets = getRecentSnippets(snippets);

    expect(recentSnippets.length).toBe(2);
    expect(recentSnippets.at(0)?.name).toBe("0");
    expect(recentSnippets.at(1)?.name).toBe("-2");
  });

  test("Returns no snippets when none are recent", () => {
    const snippets = buildSnippets([-5, -5, -5]);
    const recentSnippets = getRecentSnippets(snippets);

    expect(recentSnippets.length).toBe(0);
  });

  test("Returns an empty array when given one", () => {
    const recentSnippets = getRecentSnippets([]);

    expectTypeOf(recentSnippets).toBeArray();
    expect(recentSnippets.length).toBe(0);
  });
});
