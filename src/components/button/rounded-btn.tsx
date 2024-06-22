import { cn } from "@/utils";
import { FC } from "react";

interface RoundedBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const RoundedBtn: FC<RoundedBtnProps> = ({
  text,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        `flex h-[48px] w-full shrink-0 items-center justify-center rounded-md bg-[#3182CE] text-lg font-semibold text-white`,
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
};
