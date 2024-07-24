"use client";
import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export const ModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/80 px-[5%]">
      <div className="max-w-[800px] rounded-2xl border border-solid border-[#CBD5E0] bg-white px-10 py-8">
        {children}
      </div>
    </div>,
    document.body,
  );
};
