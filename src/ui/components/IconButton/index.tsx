import type { LucideIcon } from "lucide-react";
import type { Colour } from "../../types/colour";

interface IconButtonProps {
  disabled?: boolean;
  colour: Colour;
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
  return (
    <button
      className={`rounded-md bg-${colour}/25 text-${colour} cursor-pointer text-center p-1 hover:bg-${colour} hover:text-crust focus-visible:outline-2 focus-visible:outline-${colour} disabled:cursor-not-allowed disabled:bg-overlay-2/25 disabled:text-overlay-2 transition duration-150`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Icon size={16} />
    </button>
  );
}
