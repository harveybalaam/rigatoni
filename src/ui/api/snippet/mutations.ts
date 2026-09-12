import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSnippetResponseSchema,
  snippetContentSchema,
  snippetUpdateBodySchema,
  updateSnippetResponseSchema,
  type Snippet,
} from "../../../shared/schemas/snippet";

interface UpdateSnippetMutationParams {
  event: React.SubmitEvent<HTMLFormElement>;
  snippetId: Snippet["id"];
}

async function createSnippet(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const rawFormData = Object.fromEntries(new FormData(event.target));

  // coerce presence/absence of FormData's 'on' to boolean
  const transformedFormData = {
    ...rawFormData,
    pinned: rawFormData.pinned === "on",
  };

  const parsedFormData = snippetContentSchema.safeParse(transformedFormData);

  if (parsedFormData.error || !parsedFormData.data) {
    throw new Error("Invalid form data");
  }

  const response = await window.api.createSnippet(parsedFormData.data);
  const parsedResponse = createSnippetResponseSchema.safeParse(response);
  if (parsedResponse.error) {
    throw new Error("Invalid response format");
  }

  if (!parsedResponse.success) throw new Error("Failed to create snippet");

  return parsedResponse.data.snippet;
}

async function updateSnippet(
  event: React.SubmitEvent<HTMLFormElement>,
  snippetId: Snippet["id"],
) {
  event.preventDefault();

  const rawFormData = Object.fromEntries(new FormData(event.target));

  // coerce presence/absence of FormData's 'on' to boolean
  const transformedFormData = {
    ...rawFormData,
    pinned: rawFormData.pinned === "on",
    dateLastUpdated: new Date().toISOString(),
  };

  const parsedFormData = snippetUpdateBodySchema.safeParse(transformedFormData);

  if (parsedFormData.error || !parsedFormData.data) {
    throw new Error("Invalid form data");
  }

  const response = await window.api.updateSnippetById(
    parsedFormData.data,
    snippetId,
  );
  const parsedResponse = updateSnippetResponseSchema.safeParse(response);
  if (parsedResponse.error) {
    throw new Error("Invalid response format");
  }

  if (!parsedResponse.data.success) throw new Error("Failed to update snippet");

  return parsedResponse.data.snippet;
}

export function useUpdateSnippetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ event, snippetId }: UpdateSnippetMutationParams) =>
      updateSnippet(event, snippetId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["snippets"],
      }),
  });
}

export function useCreateSnippetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: React.SubmitEvent<HTMLFormElement>) =>
      createSnippet(event),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["snippets"] }),
  });
}
