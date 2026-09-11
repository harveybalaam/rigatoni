import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSnippetResponseSchema,
  snippetContentSchema,
} from "../../../shared/schemas/snippet";

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

  if (!parsedResponse.success) throw new Error("Failed create snippet");

  return parsedResponse.data.snippet;
}

export function useCreateSnippetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: React.SubmitEvent<HTMLFormElement>) =>
      createSnippet(event),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["snippets"] }),
  });
}
