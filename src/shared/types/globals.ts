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
      getSnippet: (snippetId: Snippet["id"]) => Promise<GetSnippetResponse>;
      getAllSnippets: () => Promise<GetAllSnippetsResponse>;
      updateSnippet: (
        snippetBody: SnippetUpdateBody,
        snippetId: Snippet["id"],
      ) => Promise<UpdateSnippetResponse>;
      deleteSnippet: (
        snippetId: Snippet["id"],
      ) => Promise<DeleteSnippetResponse>;
    };
  }
}
