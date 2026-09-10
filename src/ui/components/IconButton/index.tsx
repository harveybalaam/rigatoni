import type { LucideIcon } from "lucide-react";
import type { Colour } from "../../types/colour";

type IconButtonColours = Extract<
  Colour,
  "red" | "peach" | "green" | "sapphire"
>;

interface IconButtonProps {
  disabled?: boolean;
  colour: IconButtonColours;
  icon: LucideIcon;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export default function IconButton({
  disabled = false,
  colour,
  icon: Icon,
  onClick,
  type = "button",
}: IconButtonProps) {
  const colourVariants = {
    red: "bg-red/25 text-red hover:bg-red focus-visible:outline-red",
    peach: "bg-peach/25 text-peach hover:bg-peach focus-visible:outline-peach",
    green: "bg-green/25 text-green hover:bg-green focus-visible:outline-green",
    sapphire:
      "bg-sapphire/25 text-sapphire hover:bg-sapphire focus-visible:outline-sapphire",
  } satisfies Record<IconButtonColours, string>;

  return (
    <button
      className={`${colourVariants[colour]} rounded-md cursor-pointer text-center p-1 hover:text-crust focus-visible:outline-2 disabled:cursor-not-allowed disabled:bg-overlay-2/25 disabled:text-overlay-2 transition duration-150`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Icon size={16} />
    </button>
  );
}
