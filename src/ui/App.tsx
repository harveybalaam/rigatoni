import SearchBar from "./Components/SearchBar/SearchBar";
import { ChevronUpIcon } from "lucide-react";

export default function App() {
  return (
    <div className="bg-mantle h-screen w-screen flex flex-col">
      <div className="flex items-center justify-center text-surface-2">
        <button className="cursor-pointer px-16 text-center">
          <ChevronUpIcon />
        </button>
      </div>
      <SearchBar />
    </div>
  );
}
