"use client";

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { PageLoader } from "./page-loader";
import { toast } from "react-toastify";

export const ProtectedRoutesStudents: FC<PropsWithChildren> = ({
  children,
}) => {
  const [allowUser, setAllowUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user_type");
    if (user !== null && user === "student") {
      setAllowUser(true);
    } else {
      toast.error("You are not authorized to view this page");
      router.push("/login");
    }
  }, [router]);

  if (!allowUser) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
