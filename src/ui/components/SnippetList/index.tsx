import SnippetListSection from "./SnippetListSection";
import getRecentSnippets from "../../utils/get-recent-snippets";
import { useGetSnippetsQuery } from "../../api/snippet/queries";

export default function SnippetList() {
  const {
    data: allSnippets = [],
    error,
    isError,
    isPending,
  } = useGetSnippetsQuery();

  const pinnedSnippets = allSnippets.filter((snippet) => snippet.pinned);
  const recentSnippets = getRecentSnippets(allSnippets);

  if (isPending) {
    return (
      <div className="text-overlay-0 px-4 pb-2 text-sm">
        Loading snippets...
      </div>
    );
  }

  if (isError) {
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
