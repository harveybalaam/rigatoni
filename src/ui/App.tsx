import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import SearchBar from "./Components/SearchBar/SearchBar";

export default function App() {
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsWindowExpanded(!isWindowExpanded);
    // @ts-expect-error TODO: type safety
    window.appWindow.setIsWindowExpanded(!isWindowExpanded);
  };

  return (
    <div className="bg-crust h-screen w-screen flex flex-col">
      <div className="flex items-center justify-center text-surface-2 my-0.5">
        <button
          className="cursor-pointer px-16 rounded-md text-center focus-visible:outline-2 focus-visible:outline-mauve"
          onClick={handleExpandClick}
        >
          {isWindowExpanded ? (
            <ChevronDownIcon size="20" />
          ) : (
            <ChevronUpIcon size="20" />
          )}
        </button>
      </div>
      <SearchBar />
    </div>
  );
}
