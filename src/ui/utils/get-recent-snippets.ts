import type { ISnippet } from "../../shared/types/snippet";

export default function getRecentSnippets(snippets: ISnippet[]) {
  const recencyThresholdDays = 3;

  const now = new Date();
  const minimumRecentDate = new Date(
    now.setDate(now.getDate() - recencyThresholdDays),
  );

  return snippets
    .filter((snippet) => {
      // pinned snippets have their own list section
      if (snippet.pinned) return false;

      return new Date(snippet.dateLastUsed) > minimumRecentDate;
    })
    .sort(
      (a, b) =>
        new Date(a.dateLastUsed).getTime() - new Date(b.dateLastUsed).getTime(),
    )
    .slice(-2);
}
