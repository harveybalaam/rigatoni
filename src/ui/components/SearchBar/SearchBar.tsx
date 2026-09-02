import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex h-14 fixed bottom-0 left-0 right-0 p-4 bg-base rounded-t-2xl">
      <span className="flex grow gap-2 items-center text-overlay-1">
        <SearchIcon size={20} />
        <input
          className="text-sm/tight placeholder-surface-2 placeholder:italic outline-none w-full"
          type="text"
          placeholder="Search something to paste..."
        />
      </span>
    </div>
  );
}
