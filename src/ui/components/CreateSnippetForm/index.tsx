import { SaveIcon, XIcon } from "lucide-react";
import TextInput from "../inputs/TextInput";
import CheckboxInput from "../inputs/CheckboxInput";
import IconButton from "../IconButton";
import { useCreateSnippetMutation } from "../../api/snippet/mutations";
import type { AppView } from "../../App";

interface CreateSnippetFormProps {
  setCurrentView: React.Dispatch<React.SetStateAction<AppView>>;
}

export default function CreateSnippetForm({
  setCurrentView,
}: CreateSnippetFormProps) {
  const { isError, mutate: createSnippetMutation } = useCreateSnippetMutation();

  const handleOnCancelClick = () => {
    setCurrentView("list");
  };

  const handleOnSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    createSnippetMutation(event, {
      onSuccess: () => setCurrentView("list"),
    });
  };

  return (
    <form
      action=""
      className="flex flex-col gap-2 px-4 pb-4"
      name="create-snippet"
      onSubmit={handleOnSubmit}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-subtext-0">NEW SNIPPET</h2>
        <span className="flex gap-1">
          <IconButton colour="red" icon={XIcon} onClick={handleOnCancelClick} />
          <IconButton colour="sapphire" icon={SaveIcon} type="submit" />
        </span>
      </div>
      {isError && (
        <p className="italic text-red text-xs leading-tight">
          An error occurred when creating the snippet
        </p>
      )}
      <div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <TextInput name="name" label="name" required />
            <div className="flex flex-1 h-min">
              <CheckboxInput name="pinned" label="pinned" />
            </div>
          </div>
          <TextInput name="value" label="value" required />
        </div>
      </div>
    </form>
  );
}
