"use client";

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

export const LoginReRoutes: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user_type");
    if (user === "student") {
      router.push("/dashboard/student");
    }
    if (user === "admin") {
      router.push("/dashboard/admin");
    }
  }, []);

  return <div>{children}</div>;
};
