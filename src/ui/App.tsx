import SearchBar from "./Components/SearchBar/SearchBar";
import { ChevronUpIcon } from "lucide-react";

export default function App() {
  return (
    <div className="bg-crust h-screen w-screen flex flex-col">
      <div className="flex items-center justify-center text-surface-2 my-0.5">
        <button className="cursor-pointer px-16 rounded-md text-center focus-visible:outline-2 focus-visible:outline-mauve">
          <ChevronUpIcon size="20" />
        </button>
      </div>
      <SearchBar />
    </div>
  );
}
