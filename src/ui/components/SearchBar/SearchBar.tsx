import { PlusIcon, SearchIcon } from "lucide-react";
import IconButton from "../IconButton";
import type { AppView } from "../../App";

interface SearchBarProps {
  currentView: AppView;
  isWindowExpanded: boolean;
  setCurrentView: React.Dispatch<React.SetStateAction<AppView>>;
  setIsWindowExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({
  currentView,
  isWindowExpanded,
  setCurrentView,
  setIsWindowExpanded,
}: SearchBarProps) {
  const handleOnAddButtonClick = () => {
    if (!isWindowExpanded) {
      setIsWindowExpanded(true);
    }
    setCurrentView("create");
  };

  return (
    <div className="flex h-14 fixed bottom-0 left-0 right-0 p-4 bg-base rounded-t-2xl">
      <span className="flex grow gap-2 items-center text-overlay-1">
        <SearchIcon size={20} />
        <input
          className="text-sm/tight placeholder-surface-2 placeholder:italic outline-none w-full"
          type="text"
          placeholder="Search something to paste..."
        />
        <IconButton
          colour="green"
          icon={PlusIcon}
          onClick={handleOnAddButtonClick}
          disabled={currentView !== "list"}
        />
      </span>
    </div>
  );
}
