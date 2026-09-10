type TextInputType = Extract<
  React.HTMLInputTypeAttribute,
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url"
  | "week"
>;

interface TextInputProps {
  label?: string;
  name: string;
  required?: boolean;
  type?: TextInputType;
}

export default function TextInput({
  label,
  name,
  required = false,
  type = "text",
}: TextInputProps) {
  return (
    <div className="flex flex-col flex-2 gap-0.5">
      {label && (
        <label htmlFor={name} className="text-overlay-0 text-sm">
          <span className="flex flex-row gap-0.5 items-center">
            {label.toUpperCase()}
            {required && <sup className="text-red">*</sup>}
          </span>
        </label>
      )}
      <input
        className="border-2 border-base text-primary text-sm rounded-lg p-1.5 focus-visible:outline-2 focus-visible:outline-mauve"
        id={name}
        name={name}
        type={type}
        required={required}
      />
    </div>
  );
}
