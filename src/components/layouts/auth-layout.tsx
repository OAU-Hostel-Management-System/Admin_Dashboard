import { FC, PropsWithChildren } from "react";
import { Navbar } from "../navbar";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};
