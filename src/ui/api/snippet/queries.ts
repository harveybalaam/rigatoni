import { useQuery } from "@tanstack/react-query";
import {
  getAllSnippetsResponseSchema,
  getSnippetResponseSchema,
  type Snippet,
} from "../../../shared/schemas/snippet";

async function getSnippets() {
  const response = await window.api.getAllSnippets();

  const parsedResponse = getAllSnippetsResponseSchema.safeParse(response);
  if (parsedResponse.error) {
    throw new Error("Received invalid snippet data");
  }

  if (!parsedResponse.success) throw new Error("Failed to fetch snippets");
  return parsedResponse.data.snippets;
}

async function getSnippetById(snippetId: Snippet["id"]) {
  const response = await window.api.getSnippet(snippetId);

  const parsedResponse = getSnippetResponseSchema.safeParse(response);
  if (parsedResponse.error) {
    throw new Error("Received invalid snippet data");
  }

  if (!parsedResponse.success) throw new Error("Failed to fetch snippet");
  return parsedResponse.data.snippet;
}

export function useGetSnippetsQuery() {
  return useQuery({
    queryKey: ["snippets"],
    queryFn: () => getSnippets(),
  });
}

export function useGetSnippetByIdQuery(snippetId: Snippet["id"]) {
  return useQuery({
    queryKey: ["snippets", snippetId],
    queryFn: () => getSnippetById(snippetId),
  });
}
