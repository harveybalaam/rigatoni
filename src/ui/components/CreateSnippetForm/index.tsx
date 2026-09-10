import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveIcon, XIcon } from "lucide-react";
import { snippetContentSchema } from "../../../shared/schemas/snippet";
import TextInput from "../inputs/TextInput";
import CheckboxInput from "../inputs/CheckboxInput";
import IconButton from "../IconButton";

interface CreateSnippetFormProps {
  setIsCreateSnippetFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateSnippetForm({
  setIsCreateSnippetFormOpen,
}: CreateSnippetFormProps) {
  const queryClient = useQueryClient();

  const createSnippetMutation = useMutation({
    mutationFn: (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      const rawFormData = Object.fromEntries(new FormData(event.target));

      // coerce presence/absence of FormData's 'on' to boolean
      const transformedFormData = {
        ...rawFormData,
        pinned: rawFormData.pinned === "on",
      };

      const parsedFormData =
        snippetContentSchema.safeParse(transformedFormData);

      if (parsedFormData.error || !parsedFormData.data) {
        throw new Error("Invalid form data");
      }

      return window.api.createSnippet(parsedFormData.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["snippets"] });
      setIsCreateSnippetFormOpen(false);
    },
  });

  const handleOnCancelClick = () => {
    setIsCreateSnippetFormOpen(false);
  };

  return (
    <form
      action=""
      className="flex flex-col gap-2 px-4 pb-4"
      name="create-snippet"
      onSubmit={createSnippetMutation.mutate}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-subtext-0">NEW SNIPPET</h2>
        <span className="flex gap-1">
          <IconButton colour="red" icon={XIcon} onClick={handleOnCancelClick} />
          <IconButton colour="sapphire" icon={SaveIcon} type="submit" />
        </span>
      </div>
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
