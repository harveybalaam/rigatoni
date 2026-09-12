import { SaveIcon, XIcon } from "lucide-react";
import { type Snippet } from "../../../shared/schemas/snippet";
import TextInput from "../inputs/TextInput";
import CheckboxInput from "../inputs/CheckboxInput";
import IconButton from "../IconButton";
import { useUpdateSnippetMutation } from "../../api/snippet/mutations";
import type { AppView } from "../../App";

interface UpdateSnippetFormProps {
  initialSnippetData: Snippet | undefined;
  setCurrentView: React.Dispatch<React.SetStateAction<AppView>>;
}

export default function UpdateSnippetForm({
  initialSnippetData,
  setCurrentView,
}: UpdateSnippetFormProps) {
  const { isError, mutate: updateSnippetMutation } = useUpdateSnippetMutation();

  const handleOnSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
    snippetId: Snippet["id"],
  ) => {
    updateSnippetMutation(
      { event, snippetId },
      { onSuccess: () => setCurrentView("list") },
    );
  };

  if (!initialSnippetData) {
    return (
      <div className="flex px-4 pb-2 gap-0.5 items-center justify-between">
        <p className="text-overlay-0 text-sm wrap-normal">
          An error occurred while loading snippet data
        </p>
        <IconButton
          colour="red"
          icon={XIcon}
          onClick={() => setCurrentView("list")}
        />
      </div>
    );
  }

  return (
    <form
      action=""
      className="flex flex-col gap-2 px-4 pb-4"
      name="create-snippet"
      onSubmit={(event) => handleOnSubmit(event, initialSnippetData.id)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-subtext-0">EDIT SNIPPET</h2>
        <span className="flex gap-1">
          <IconButton
            colour="red"
            icon={XIcon}
            onClick={() => setCurrentView("list")}
          />
          <IconButton colour="sapphire" icon={SaveIcon} type="submit" />
        </span>
      </div>
      {isError && (
        <p className="italic text-red text-xs leading-tight">
          An error occurred when updating the snippet
        </p>
      )}
      <div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <TextInput
              defaultValue={initialSnippetData.name}
              name="name"
              label="name"
              required
            />
            <div className="flex flex-1 h-min">
              <CheckboxInput
                defaultChecked={initialSnippetData.pinned}
                name="pinned"
                label="pinned"
              />
            </div>
          </div>
          <TextInput
            defaultValue={initialSnippetData.value}
            name="value"
            label="value"
            required
          />
        </div>
      </div>
    </form>
  );
}
