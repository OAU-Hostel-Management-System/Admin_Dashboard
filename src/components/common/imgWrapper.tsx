import { cn } from "@/utils";
import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface ImgWrapperProps extends ImageProps {
  imgUrl?: string;
}

export const ImgWrapper: FC<ImgWrapperProps> = ({
  src,
  imgUrl = src as string,
  className,
  width = 100,
  height = 100,
  ...props
}) => {
  return (
    <Image
      {...props}
      src={src}
      alt="img"
      width={width}
      height={height}
      quality={100}
      placeholder="blur"
      blurDataURL={imgUrl}
      sizes="100vw, 100vh"
      priority
      className={cn(`h-auto bg-no-repeat object-cover`, className)}
      draggable={false}
    />
  );
};
