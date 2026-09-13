import { PencilIcon, Trash2Icon } from "lucide-react";
import type { Snippet } from "../../../shared/schemas/snippet";
import { useDeleteSnippetMutation } from "../../api/snippet/mutations";
import { useEffect, useState } from "react";

type SnippetProps = Pick<Snippet, "id" | "name" | "value"> & {
  onEditClick: (snippetId: Snippet["id"]) => void;
};

export default function Snippet({
  id,
  name,
  onEditClick,
  value,
}: SnippetProps) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const { isError: isDeleteError, mutate: deleteSnippetMutation } =
    useDeleteSnippetMutation();

  useEffect(() => {
    if (!showCopySuccess) return;

    const timeoutId = setTimeout(() => {
      setShowCopySuccess(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [showCopySuccess]);

  const onCopyClick = async () => {
    await navigator.clipboard.writeText(value);
    setShowCopySuccess(true);
  };

  return (
    <div className=" bg-crust text-primary hover:text-mauve hover:bg-base flex gap-1 justify-between items-center p-2 m-0 rounded-lg has-focus-visible:bg-base has-focus-visible:[&>.action]:inline hover:[&>.action]:inline">
      <button
        className="rounded-md grow overflow-x-scroll text-start focus-visible:outline-2 focus-visible:outline-mauve focus-visible:text-mauve hover:cursor-pointer"
        onClick={onCopyClick}
      >
        <span className="flex gap-3 items-center">
          {name}
          {isDeleteError && (
            <p className="italic text-red text-xs leading-tight">
              An error occurred while deleting the snippet
            </p>
          )}
          <p
            className={`invisible opacity-0 text-xs text-green transition ease-out duration-200${showCopySuccess ? " visible opacity-100" : ""}`}
          >
            Copied
          </p>
        </span>
      </button>
      <button
        className="action hidden rounded-md bg-peach/25 text-peach cursor-pointer text-center p-1 hover:bg-peach hover:text-base focus-visible:outline-2 focus-visible:outline-peach transition duration-150"
        onClick={() => onEditClick(id)}
      >
        <PencilIcon size={16} />
      </button>
      <button
        className="action hidden group-focus-within:inline group-hover:inline rounded-md bg-red/25 text-red cursor-pointer text-center p-1 hover:bg-red hover:text-base focus-visible:outline-2 focus-visible:outline-red transition duration-150"
        onClick={() => deleteSnippetMutation(id)}
      >
        <Trash2Icon size={16} />
      </button>
    </div>
  );
}
