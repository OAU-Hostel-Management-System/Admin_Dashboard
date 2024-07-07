"use client";

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

export const LoginReRoutes: FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem("user_type");

  const router = useRouter();

  useEffect(() => {
    if (user === "student") {
      router.push("/dashboard/student");
    }
    if (user === "admin") {
      router.push("/dashboard/admin");
    }
  }, []);

  return <div>{children}</div>;
};
