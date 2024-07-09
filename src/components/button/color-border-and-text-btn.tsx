"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { FC } from "react";

interface ColorBorderAndTextBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  color: string;
  handleClick?: () => void;
  link?: boolean;
  linkHref?: string;
}

export const ColorBorderAndTextBtn: FC<ColorBorderAndTextBtnProps> = ({
  text,
  color,
  className,
  handleClick,
  link = false,
  linkHref,
  ...props
}) => {
  return link ? (
    <Link
      href={linkHref!}
      className={cn(
        `rounded-md border border-solid px-4 py-2 text-base font-semibold`,
        className,
      )}
      onClick={handleClick}
      style={{ borderColor: color, color: color }}
    >
      {text}
    </Link>
  ) : (
    <button
      {...props}
      className={cn(
        `rounded-md border border-solid px-4 py-2 text-base font-semibold`,
        className,
      )}
      onClick={handleClick}
      style={{ borderColor: color, color: color }}
    >
      {text}
    </button>
  );
};
