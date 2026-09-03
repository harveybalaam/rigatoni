import registerSnippetIpcHandlers from "./snippet.ts";
import registerWindowIpcHandlers from "./window.ts";

export default function registerIpcHandlers() {
  registerSnippetIpcHandlers();
  registerWindowIpcHandlers();
}
