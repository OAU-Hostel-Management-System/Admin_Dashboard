"use client";

import { FC, useState } from "react";
import { ModalWrapper } from "./modal-wrapper";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { RoundedBtn } from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { decryptToken, encryptToken } from "@/utils";
import { toast } from "react-toastify";

interface ModalWrapperProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hallRecordData: {
    title: string;
    details: string;
  }[];
  matricNo: string | null;
  roomId: string;
  type: string;
}

const statusOptions = [
  { value: "Available", label: "Available" },
  { value: "Unavailable", label: "Unavailable" },
  { value: "Reserved", label: "Reserved" },
];

const conditionOptions = [
  { value: "Good", label: "Good" },
  { value: "Faulty", label: "Faulty" },
];

export const EditHallRecordsModal: FC<ModalWrapperProps> = ({
  isOpen,
  setIsOpen,
  hallRecordData,
  matricNo,
  roomId,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null,
  );

  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: {
      room_id: string;
      status: string;
      condition: string;
    }) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASEURL}/admin/hostel/room`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        },
      );
    },
  });

  async function updateRoomDetails() {
    const UserData = {
      room_id: roomId,
      status:
        selectedStatus ||
        (hallRecordData.find((item) => item.title === "Status")
          ?.details as string),
      condition:
        selectedCondition ||
        (hallRecordData.find((item) => item.title === "Condition")
          ?.details as string),
    };
    console.log("UserData", UserData);
    try {
      const res = await mutation.mutateAsync(UserData);
      console.log("res", res.data);

      if (res.data.success) {
        toast.success("Update Successful");
        setIsOpen(false);

        queryClient.invalidateQueries({ queryKey: ["studentDetails"] });
      } else {
        toast.error(res.data.msg || "Update Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
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

        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
          {hallRecordData.length > 0 &&
            hallRecordData.map((item) => (
              <ResidentDetails
                key={item.title}
                title={item.title}
                details={item.details}
                setSelectedStatus={setSelectedStatus}
                setSelectedCondition={setSelectedCondition}
              />
            ))}
        </div>

        <div className="mt-5 flex w-full justify-end">
          <RoundedBtn
            text="Save Changes"
            onClick={updateRoomDetails}
            className="w-fit rounded-md border-[1.5px] border-solid border-[#3182CE] bg-white px-4 text-[#3182CE]"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

const ResidentDetails: FC<{
  title: string;
  details: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCondition: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ title, details, setSelectedStatus, setSelectedCondition }) => {
  return (
    <div className="flex w-[240px] flex-col gap-3">
      <h2 className="text-lg font-normal text-[#4A5568]">{title}</h2>
      {title === "Status" ? (
        <Select
          defaultValue={{ value: details, label: details }}
          options={statusOptions}
          onChange={(selectedOption) =>
            setSelectedStatus(selectedOption?.value || null)
          }
        />
      ) : title === "Condition" ? (
        <Select
          defaultValue={{ value: details, label: details }}
          options={conditionOptions}
          onChange={(selectedOption) =>
            setSelectedCondition(selectedOption?.value || null)
          }
        />
      ) : (
        <p className="text-lg font-semibold text-[#4A5568]">{details}</p>
      )}
    </div>
  );
};
