"use client";

import { FC } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { RxCross2 } from "react-icons/rx";
import { RoundedBtn } from "../button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { decryptToken } from "@/utils";
import { toast } from "react-toastify";

interface RevokeBedspaceModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  matricNo: string;
}

export const RevokeBedspaceModal: FC<RevokeBedspaceModalProps> = ({
  isOpen,
  setIsOpen,
  matricNo,
}) => {
  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const mutation = useMutation({
    mutationFn: (data: { matric_no: string }) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/admin/allocate/undo`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        },
      );
    },
  });

  async function RemoveAllocation() {
    const UserData = {
      matric_no: matricNo,
    };

    try {
      const res = await mutation.mutateAsync(UserData);

      console.log("success", res.data);

      if (res.data.success === true) {
        toast.success("Bedspace Revoked Successfully");
      } else {
        if (res.data.msg) {
          toast.error(res.data.msg || "Revoke Failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Revoke Failed");
    }
  }

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Edit Bedspace</h1>
          <button onClick={() => setIsOpen(false)}>
            <RxCross2 size={24} />
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-6">
          <p className="text-lg text-[#1A202C]">
            Are you sure? You can’t undo this action afterwards.
          </p>

          <div className="flex w-full items-center justify-between">
            <RoundedBtn
              text="Cancel"
              onClick={() => setIsOpen(false)}
              className="w-fit rounded-md border-[1.5px] border-solid border-[#E2E8F0] bg-white px-4 text-[#1A202C]"
            />
            <RoundedBtn
              text={mutation.isPending ? "Loading..." : "Revoke Bedspace"}
              onClick={RemoveAllocation}
              className="w-fit rounded-md bg-[#E53E3E] px-4 text-[#FFFFFF]"
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
