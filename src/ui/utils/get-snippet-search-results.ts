import type { Snippet } from "../../shared/schemas/snippet";

export default function getSnippetSearchResults(
  snippets: Snippet[],
  searchValue: string,
): Snippet[] {
  if (!searchValue || snippets.length === 0) return [];

  const maxSnippetsToReturn = 3;

  return snippets
    .filter(({ name }) =>
      name.toLowerCase().startsWith(searchValue.toLowerCase()),
    )
    .sort(({ name: nameA }, { name: nameB }) => {
      // sort resulting Snippets by name alphabetically
      const nameALower = nameA.toLowerCase();
      const nameBLower = nameB.toLowerCase();

      if (nameALower < nameBLower) return -1;

      if (nameALower > nameBLower) return 1;

      return 0;
    })
    .slice(0, maxSnippetsToReturn);
}
