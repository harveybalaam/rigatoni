import Snippet from "../Snippet";
import SnippetListSection from "./SnippetListSection";
import type { ISnippet } from "../../../shared/types/snippet";
import getRecentSnippets from "../../utils/get-recent-snippets";

interface SnippetListProps {
  snippets: ISnippet[];
}

export default function SnippetList({ snippets }: SnippetListProps) {
  const pinnedSnippets = snippets.filter((snippet) => snippet.pinned);
  const recentSnippets = getRecentSnippets(snippets);

  return (
    <div className="flex flex-col gap-2 px-2 pb-4">
      <SnippetListSection title="RECENT">
        {recentSnippets.map((snippet) => (
          <Snippet
            key={snippet.id}
            id={snippet.id}
            name={snippet.name}
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
              value={snippet.value}
            />
          ))}
        </SnippetListSection>
      )}
    </div>
  );
}
