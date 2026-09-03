import { PencilIcon, Trash2Icon } from "lucide-react";
import type { Snippet } from "../../../shared/schemas/snippet";

type SnippetProps = Pick<Snippet, "id" | "name" | "value">;

export default function Snippet({ name }: SnippetProps) {
  return (
    <div className=" bg-crust text-primary hover:text-mauve hover:bg-base flex gap-1 justify-between items-center p-2 m-0 rounded-lg has-focus-visible:bg-base has-focus-visible:[&>.action]:inline hover:[&>.action]:inline">
      <button className="rounded-md grow overflow-x-scroll text-start focus-visible:outline-2 focus-visible:outline-mauve focus-visible:text-mauve hover:cursor-pointer">
        {name}
      </button>
      <button className="action hidden rounded-md bg-peach/25 text-peach cursor-pointer text-center p-1 hover:bg-peach hover:text-base focus-visible:outline-2 focus-visible:outline-peach transition duration-150">
        <PencilIcon size={16} />
      </button>
      <button className="action hidden group-focus-within:inline group-hover:inline rounded-md bg-red/25 text-red cursor-pointer text-center p-1 hover:bg-red hover:text-base focus-visible:outline-2 focus-visible:outline-red transition duration-150">
        <Trash2Icon size={16} />
      </button>
    </div>
  );
}
