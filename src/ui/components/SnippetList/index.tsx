import { useQuery } from "@tanstack/react-query";
import SnippetListSection from "./SnippetListSection";
import getRecentSnippets from "../../utils/get-recent-snippets";

export default function SnippetList() {
  const {
    data: getAllSnippetsResponse,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["snippets"],
    queryFn: async () => {
      const response = await window.api.getAllSnippets();
      if (response.success) return response;

      throw new Error("Failed to fetch snippets");
    },
  });
  const fetchedSnippets = getAllSnippetsResponse?.snippets ?? [];

  const pinnedSnippets = fetchedSnippets.filter((snippet) => snippet.pinned);
  const recentSnippets = getRecentSnippets(fetchedSnippets);

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
