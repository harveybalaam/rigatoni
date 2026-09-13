import SnippetListSection from "./SnippetListSection";
import getRecentSnippets from "../../utils/get-recent-snippets";
import type { Snippet as SnippetType } from "../../../shared/schemas/snippet";
import Snippet from "../Snippet";
import getSnippetSearchResults from "../../utils/get-snippet-search-results";

interface SnippetListProps {
  error: Error | null;
  isPending: boolean;
  onEditSnippet: (snippetId: SnippetType["id"]) => void;
  searchValue: string;
  snippets: SnippetType[];
}

export default function SnippetList({
  error,
  isPending,
  onEditSnippet,
  searchValue,
  snippets,
}: SnippetListProps) {
  const pinnedSnippets = snippets.filter((snippet) => snippet.pinned);
  const recentSnippets = getRecentSnippets(snippets);
  const searchedSnippets = getSnippetSearchResults(snippets, searchValue);

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

  if (searchValue) {
    return (
      <div className="flex flex-col gap-2 px-2 pb-4">
        <SnippetListSection title="SEARCH RESULTS">
          {searchedSnippets.length > 0 &&
            searchedSnippets.map((snippet) => (
              <Snippet
                key={snippet.id}
                id={snippet.id}
                name={snippet.name}
                onEditClick={onEditSnippet}
                value={snippet.value}
              />
            ))}
        </SnippetListSection>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-2 pb-4">
      <SnippetListSection title="RECENT">
        {recentSnippets.length > 0 &&
          recentSnippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              id={snippet.id}
              name={snippet.name}
              onEditClick={onEditSnippet}
              value={snippet.value}
            />
          ))}
      </SnippetListSection>
      {pinnedSnippets.length > 0 && (
        <SnippetListSection title="PINNED">
          {pinnedSnippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              id={snippet.id}
              name={snippet.name}
              onEditClick={onEditSnippet}
              value={snippet.value}
            />
          ))}
        </SnippetListSection>
      )}
    </div>
  );
}
