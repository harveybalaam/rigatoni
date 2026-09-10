import { CheckIcon } from "lucide-react";

interface CheckboxInputProps {
  name: string;
  label?: string;
  required?: boolean;
}

export default function CheckboxInput({
  label,
  name,
  required = false,
}: CheckboxInputProps) {
  return (
    <label
      htmlFor={name}
      className={`group text-overlay-0 text-sm${label && " flex flex-col gap-0.5"}`}
    >
      {label && (
        <span className="flex flex-row gap-0.5 items-center">
          <p>{label.toUpperCase()}</p>
          {required && <sup className="text-red">*</sup>}
        </span>
      )}
      <input className="peer sr-only" id={name} name={name} type="checkbox" />
      <span className="flex justify-center items-center text-crust border-2 border-base w-6 h-6 rounded-md cursor-pointer peer-checked: peer-focus-visible:outline-mauve peer-focus-visible:outline-2 peer-checked:bg-mauve peer-checked:outline-offset-2 peer-checked:border-mauve transition-colors duration-150">
        <CheckIcon
          className="hidden group-has-checked:inline text-crust"
          size={16}
        />
      </span>
    </label>
  );
}
