"use client";

import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";

interface IdDetail {
  title: string;
  details: string;
  subDetails?: IdDetail[];
}

interface IdProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hall: string;
  studentData: {
    fullName: string;
    matric_no: string;
    dept: string;
    img_url: string;
  };
  idDetails: IdDetail[];
}

export const IDtemplate: FC<IdProps> = ({
  isOpen,
  setIsOpen,
  hall,
  studentData,
  idDetails,
}) => {
  if (!isOpen) return null;
  return (
    <ModalWrapper>
      <div className="relative w-fit max-w-[600px] overflow-hidden rounded-2xl border border-solid border-[#CBD5E0] pb-4 pt-2">
        <div className="absolute right-0 top-0 z-30 flex w-full justify-end">
          <button onClick={() => setIsOpen(false)}>
            <RxCross2 size={32} />
          </button>
        </div>
        <div className="relative z-[1]">
          <div className="flex items-center justify-center gap-10">
            <div>
              <Image
                alt="img"
                width={95}
                height={99}
                src="/images/oau-logo-bnw.svg"
              />
            </div>
            <div className="text-center">
              <h1 className="text-base font-bold uppercase">{hall} HALL</h1>
              <p className="text-xs font-bold uppercase">
                OBAFEMI AWOLOWO UNIVERSITY, ILE IFE.
              </p>
            </div>
          </div>
          <div className="mb-7 mt-4 w-full bg-black py-3 text-center">
            <span className="text-base font-bold text-white">
              IDENTIFICATION CARD
            </span>
          </div>
          <div className="flex justify-between px-[30px]">
            <div className="flex w-[35%] flex-col justify-between">
              <Image
                alt="img"
                width={200}
                height={200}
                src={studentData.img_url}
                className="h-auto w-full rounded-[4px] border-[4px] border-solid border-black"
              />
              <div className="mt-12 flex flex-col items-center">
                <hr className="h-[1.5px] w-full bg-[#1A202C]" />
                <p className="mt-2 text-sm font-normal text-[#2D3748]">
                  Signature
                </p>
              </div>
            </div>
            <div className="flex w-[60%] flex-col justify-between">
              <div className="space-y-2">
                {idDetails.map((item) => (
                  <div key={item.title} className="flex items-center">
                    <div className="flex items-center gap-8 text-sm text-[#2D3748]">
                      <p className="flex items-center gap-4">
                        <span className="font-normal">{item.title}</span>
                        <span className="font-semibold">{item.details}</span>
                      </p>
                    </div>
                    {item.subDetails && (
                      <div className="ml-4 flex items-center gap-4">
                        {item.subDetails.map((subItem) => (
                          <div
                            key={subItem.title}
                            className="flex items-center gap-8 text-sm text-[#2D3748]"
                          >
                            <p className="flex items-center gap-4">
                              <span className="font-normal">
                                {subItem.title}
                              </span>
                              <span className="font-semibold">
                                {subItem.details}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-col items-center">
                <hr className="h-[1.5px] w-full bg-[#1A202C]" />
                <p className="mt-2 text-sm font-normal text-[#2D3748]">
                  Hall Warden’s Signature & Date
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

const ModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/80 px-[5%]">
      <div className="max-w-[800px] rounded-2xl border border-solid border-[#CBD5E0] bg-white p-4">
        {children}
      </div>
    </div>,
    document.body,
  );
};

const IdDetailsArr = [
  {
    title: "Name",
    details: "Syndrome D. Own",
  },
  {
    title: "Matric No",
    details: "CSC/2018/113",
  },
  {
    title: "Department",
    details: "Computer Science",
  },
  {
    title: "Block",
    details: "F",
    subDetails: [
      { title: "Room No", details: "107" },
      { title: "Bed No", details: "3" },
    ],
  },
  {
    title: "Date",
    details: "31/11/2024",
  },
  {
    title: "Valid only for",
    details: "2024/2025 session",
  },
];
