import SnippetListSection from "./SnippetListSection";
import getRecentSnippets from "../../utils/get-recent-snippets";
import type { Snippet } from "../../../shared/schemas/snippet";

interface SnippetListProps {
  error: Error | null;
  isPending: boolean;
  snippets: Snippet[];
}

export default function SnippetList({
  error,
  isPending,
  snippets,
}: SnippetListProps) {
  const pinnedSnippets = snippets.filter((snippet) => snippet.pinned);
  const recentSnippets = getRecentSnippets(snippets);

  if (isPending) {
    return (
      <div className="text-overlay-0 px-4 pb-2 text-sm">
        Loading snippets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-overlay-0 px-4 pb-2 text-sm">{`An error occurred while loading snippets: ${error.message}`}</div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-2 pb-4">
      <SnippetListSection snippets={recentSnippets} title="RECENT" />
      {pinnedSnippets.length > 0 && (
        <SnippetListSection snippets={pinnedSnippets} title="PINNED" />
      )}
    </div>
  );
}
