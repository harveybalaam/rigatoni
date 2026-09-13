import { PlusIcon, SearchIcon } from "lucide-react";
import IconButton from "../IconButton";
import type { AppView } from "../../App";

interface SearchBarProps {
  currentView: AppView;
  onCreateClick: () => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  currentView,
  onCreateClick,
  searchValue,
  setSearchValue,
}: SearchBarProps) {
  return (
    <div className="flex h-14 fixed bottom-0 left-0 right-0 p-4 bg-base rounded-t-2xl">
      <span className="flex grow gap-2 items-center text-overlay-1">
        <SearchIcon size={20} />
        <input
          className="text-sm/tight placeholder-surface-2 placeholder:italic outline-none w-full"
          onChange={({ target }) => setSearchValue(target.value)}
          placeholder="Search snippets..."
          type="text"
          value={searchValue}
        />
        <IconButton
          colour="green"
          icon={PlusIcon}
          onClick={onCreateClick}
          disabled={currentView !== "list"}
        />
      </span>
    </div>
  );
}
