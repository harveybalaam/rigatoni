import type {
  Snippet,
  SnippetContent,
  SnippetUpdateBody,
  CreateSnippetResponse,
  DeleteSnippetResponse,
  GetAllSnippetsResponse,
  GetSnippetResponse,
  UpdateSnippetResponse,
} from "../schemas/snippet";

declare global {
  interface Window {
    appWindow: {
      setHeightOffset: (windowHeightOffset: number) => void;
    };
    api: {
      createSnippet: (
        snippetBody: SnippetContent,
      ) => Promise<CreateSnippetResponse>;
      getSnippetById: (snippetId: Snippet["id"]) => Promise<GetSnippetResponse>;
      getAllSnippets: () => Promise<GetAllSnippetsResponse>;
      updateSnippetById: (
        snippetBody: SnippetUpdateBody,
        snippetId: Snippet["id"],
      ) => Promise<UpdateSnippetResponse>;
      deleteSnippetById: (
        snippetId: Snippet["id"],
      ) => Promise<DeleteSnippetResponse>;
    };
  }
}
