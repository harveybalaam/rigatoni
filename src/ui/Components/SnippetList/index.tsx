import Snippet from "../Snippet";
import SnippetListSection from "./SnippetListSection";
import type { ISnippet } from "../../../shared/types/snippet";

interface SnippetListProps {
  snippets: ISnippet[];
}

export default function SnippetList({ snippets }: SnippetListProps) {
  const pinnedSnippets = snippets.filter((snippet) => snippet.pinned);

  return (
    <div className="flex flex-col gap-2 px-2 pb-4">
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
