"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, FC, useEffect } from "react";

interface AlwaysPushToWrapperProps {
  where: string;
}

export const AlwaysPushToWrapper: FC<
  PropsWithChildren & AlwaysPushToWrapperProps
> = ({ where, children }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(where);
  }, []);

  return <div>{children}</div>;
};
