import { useQuery } from "@tanstack/react-query";
import SnippetListSection from "./SnippetListSection";
import getRecentSnippets from "../../utils/get-recent-snippets";

export default function SnippetList() {
  const { data: getAllSnippetsResponse } = useQuery({
    queryKey: ["snippets"],
    queryFn: window.api.getAllSnippets,
  });
  const fetchedSnippets = getAllSnippetsResponse?.snippets ?? [];

  const pinnedSnippets = fetchedSnippets.filter((snippet) => snippet.pinned);
  const recentSnippets = getRecentSnippets(fetchedSnippets);

  return (
    <div className="flex flex-col gap-2 px-2 pb-4">
      <SnippetListSection snippets={recentSnippets} title="RECENT" />
      {pinnedSnippets.length > 0 && (
        <SnippetListSection snippets={pinnedSnippets} title="PINNED" />
      )}
    </div>
  );
}
