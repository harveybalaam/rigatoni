import { PlusIcon, SearchIcon } from "lucide-react";
import IconButton from "../IconButton";
import type { AppView } from "../../App";

interface SearchBarProps {
  currentView: AppView;
  onCreateClick: () => void;
  onSearchValueChange: (value: string) => void;
  searchValue: string;
}

export default function SearchBar({
  currentView,
  onCreateClick,
  onSearchValueChange,
  searchValue,
}: SearchBarProps) {
  return (
    <div className="flex h-14 p-4 bg-base rounded-b-2xl">
      <span className="flex grow gap-2 items-center text-overlay-1">
        <SearchIcon size={20} />
        <input
          autoFocus
          className="text-sm/tight placeholder-surface-2 placeholder:italic outline-none w-full"
          onChange={({ target }) => onSearchValueChange(target.value)}
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
