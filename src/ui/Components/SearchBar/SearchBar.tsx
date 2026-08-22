import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex grow p-4 bg-base rounded-t-[1.25rem]">
      <span className="flex grow gap-2 items-center text-overlay-1">
        <SearchIcon />
        <input
          className="text-base/tight placeholder-surface-2 outline-none w-full lh"
          type="text"
          placeholder="Search something to paste..."
        />
      </span>
    </div>
  );
}
