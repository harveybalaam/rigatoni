import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import SearchBar from "./components/SearchBar/SearchBar";
import SnippetList from "./components/SnippetList";
import { useDimensions } from "./hooks/use-dimensions";
import { useGetSnippetsQuery } from "./api/snippet/queries";
import CreateSnippetForm from "./components/CreateSnippetForm";
import UpdateSnippetForm from "./components/UpdateSnippetForm";
import type { Snippet } from "../shared/schemas/snippet";

export type AppView = "create" | "edit" | "list";

export default function App() {
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);
  const [snippetIdToEdit, setSnippetIdToEdit] = useState<Snippet["id"]>("");
  const [currentView, setCurrentView] = useState<AppView>("list");

  const { ref, dimensions } = useDimensions();

  const { data: allSnippets = [], error, isPending } = useGetSnippetsQuery();

  useEffect(() => {
    if (!dimensions.height) return;

    if (isWindowExpanded) {
      window.appWindow.setHeightOffset(dimensions.height);
    } else {
      window.appWindow.setHeightOffset(0);
    }
  }, [dimensions, isWindowExpanded]);

  const onEditSnippet = (snippetId: Snippet["id"]) => {
    setSnippetIdToEdit(snippetId);
    setCurrentView("edit");
  };

  const snippetForm =
    currentView === "edit" ? (
      <UpdateSnippetForm
        initialSnippetData={allSnippets.find(
          ({ id }) => id === snippetIdToEdit,
        )}
        setCurrentView={setCurrentView}
      />
    ) : (
      <CreateSnippetForm setCurrentView={setCurrentView} />
    );

  return (
    <div className="bg-crust h-screen w-screen flex flex-col">
      <div className="flex items-center justify-center text-surface-2 my-0.5">
        <button
          className="cursor-pointer px-16 rounded-md text-center focus-visible:outline-2 focus-visible:outline-mauve"
          onClick={() => setIsWindowExpanded(!isWindowExpanded)}
        >
          {isWindowExpanded ? (
            <ChevronDownIcon size="20" />
          ) : (
            <ChevronUpIcon size="20" />
          )}
        </button>
      </div>
      {isWindowExpanded && (
        <div ref={ref}>
          {currentView === "list" ? (
            <SnippetList
              error={error}
              isPending={isPending}
              onEditSnippet={onEditSnippet}
              snippets={allSnippets}
            />
          ) : (
            snippetForm
          )}
        </div>
      )}
      <SearchBar
        currentView={currentView}
        isWindowExpanded={isWindowExpanded}
        setCurrentView={setCurrentView}
        setIsWindowExpanded={setIsWindowExpanded}
      />
    </div>
  );
}
