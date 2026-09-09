import { PlusIcon, SearchIcon } from "lucide-react";

interface SearchBarProps {
  isCreateSnippetFormOpen: boolean;
  isWindowExpanded: boolean;
  setIsCreateSnippetFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWindowExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({
  isCreateSnippetFormOpen,
  isWindowExpanded,
  setIsCreateSnippetFormOpen,
  setIsWindowExpanded,
}: SearchBarProps) {
  const handleOnAddButtonClick = () => {
    if (!isWindowExpanded) {
      setIsWindowExpanded(true);
    }
    setIsCreateSnippetFormOpen(true);
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
        <button
          disabled={isCreateSnippetFormOpen}
          className="rounded-md bg-green/25 text-green cursor-pointer text-center p-1 hover:bg-green hover:text-base focus-visible:outline-2 focus-visible:outline-green disabled:cursor-not-allowed disabled:bg-overlay-2/25 disabled:text-overlay-2 transition duration-150"
          onClick={handleOnAddButtonClick}
        >
          <PlusIcon size={16} />
        </button>
      </span>
    </div>
  );
}
