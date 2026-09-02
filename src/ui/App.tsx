import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import SearchBar from "./components/SearchBar/SearchBar";
import SnippetList from "./components/SnippetList";
import { useDimensions } from "./hooks/use-dimensions";
import type { ISnippet } from "../shared/types/snippet";

const exampleSnippets: ISnippet[] = [
  {
    id: "1",
    dateCreated: new Date("2026-09-02").toJSON(),
    dateLastUpdated: new Date("2026-09-02").toJSON(),
    dateLastUsed: new Date("2026-09-02").toJSON(),
    name: "Test 1",
    pinned: true,
    value: "example",
  },
  {
    id: "2",
    dateCreated: new Date("2026-09-02").toJSON(),
    dateLastUpdated: new Date("2026-09-02").toJSON(),
    dateLastUsed: new Date("2026-09-02").toJSON(),
    name: "Test 2",
    pinned: false,
    value: "example",
  },
];

export default function App() {
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);
  const { ref, dimensions } = useDimensions();

  useEffect(() => {
    if (!dimensions.height) return;

    if (isWindowExpanded) {
      window.appWindow.setHeightOffset(dimensions.height);
    } else {
      window.appWindow.setHeightOffset(0);
    }
  }, [dimensions, isWindowExpanded]);

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
          <SnippetList snippets={exampleSnippets} />
        </div>
      )}
      <SearchBar />
    </div>
  );
}
