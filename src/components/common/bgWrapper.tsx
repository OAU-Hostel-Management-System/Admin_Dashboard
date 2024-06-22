import { cn } from "@/utils";
import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface BgWrapperProps extends ImageProps {
  imgUrl?: string;
}

export const BgWrapper: FC<BgWrapperProps> = ({
  src,
  imgUrl = src as string,
  alt = "Image",
  className,
  ...props
}) => {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={imgUrl}
      fill
      quality={100}
      sizes="100vw, 100vh"
      priority
      className={cn(
        ` left-0 top-0 z-[-1] block min-h-full min-w-full bg-no-repeat object-cover`,
        className,
      )}
      draggable={false}
    />
  );
};
