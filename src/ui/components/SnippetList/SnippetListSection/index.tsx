import type { ISnippet } from "../../../../shared/types/snippet";
import Snippet from "../../Snippet";

interface SnippetListSectionProps extends React.PropsWithChildren {
  snippets: ISnippet[];
  title: string;
}

export default function SnippetListSection({
  snippets,
  title,
}: SnippetListSectionProps) {
  const numSnippets = snippets.length;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-overlay-0 ml-2">{title.toUpperCase()}</h2>
      {numSnippets > 0 ? (
        <div>
          {snippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              id={snippet.id}
              name={snippet.name}
              value={snippet.value}
            />
          ))}
        </div>
      ) : (
        <div className="text-surface-2 ml-2">
          <p>No {title.toLowerCase()} snippets</p>
        </div>
      )}
    </div>
  );
}
