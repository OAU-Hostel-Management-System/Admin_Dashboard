"use client";

import {
  hallRecordsTableColumns,
  HallRecordsDataRow,
  tableCustomStyles,
} from "@/lib";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useFetchStudentDetailsWithConstraints, useIsClient } from "@/hooks";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { ModalWrapper } from "../modals/modal-wrapper";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { decryptToken } from "@/utils";
import { RoundedBtn } from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type HallData = {
  roomNo: string;
  bedNo: string;
  status: string;
  matric_no: string;
  condition: string;
  id: number;
  block: string;
};

const transformData = (data: HallData[]): HallRecordsDataRow[] => {
  return data.map((student) => ({
    roomNo: student.roomNo,
    bedNo: student.bedNo,
    status: student.status,
    matric_no: student.matric_no,
    condition: student.condition,
    id: student.id,
  }));
};

interface AdminDashboardOverviewTableProps {
  studentData: HallData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BedSpaceAllocationTable: FC<AdminDashboardOverviewTableProps> = ({
  studentData,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isClient = useIsClient();
  const router = useRouter();
  const formattedData = transformData(studentData);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<HallRecordsDataRow | null>(
    null,
  );

  const handleRowClick = (row: HallRecordsDataRow) => {
    if (!row.matric_no) {
      setSelectedRow(row);
      setOpenModal(true);
    }
  };

  return (
    <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] p-3">
      {isClient && (
        <DataTable
          columns={hallRecordsTableColumns}
          data={formattedData}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          paginationServer
          paginationTotalRows={totalPages * 40}
          paginationDefaultPage={currentPage}
          onChangePage={onPageChange}
          customStyles={tableCustomStyles}
          highlightOnHover
          pointerOnHover
          responsive
          subHeaderWrap
          onRowClicked={handleRowClick}
        />
      )}
      {openModal && selectedRow && (
        <AssignBedSpaceModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          rowDetails={selectedRow}
        />
      )}
    </div>
  );
};

interface Student {
  fullName: string;
  dept: string;
  faculty: string;
  img_url: string;
  matric_no: string;
  paid: boolean;
  part: string;
}

const transformStudentData = (data?: Student) => {
  if (!data) {
    return [];
  }
  return [
    { title: "Name", details: data.fullName || "N/A" },
    { title: "Matric No", details: data.matric_no || "N/A" },
    { title: "Dept", details: data.dept || "N/A" },
    { title: "Level", details: data.part || "N/A" },
  ];
};

interface StudentData {
  room: {
    bedNo: string;
    block: string;
    roomNo: string;
    hostel_name: string;
    condition: string;
    status: string;
  };

  student: {
    dept: string;
    faculty: string;
    fullName: string;
    img_url: string;
    matric_no: string;
    paid: boolean;
    part: string;
  };
}

interface AssignBedSpaceModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowDetails: HallRecordsDataRow;
}

const AssignBedSpaceModal: FC<AssignBedSpaceModalProps> = ({
  isOpen,
  setIsOpen,
  rowDetails,
}) => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const mutation = useMutation({
    mutationFn: (data: { matric_no: string; room_id: string }) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/admin/allocate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        },
      );
    },
  });

  const { studentData, studentError, studentIsError, studentIsLoading } =
    useFetchStudentDetailsWithConstraints(
      decryptedToken,
      encodeURIComponent(debouncedText),
      "matric_no",
    );

  function Action() {
    setDebouncedText(text);
    queryClient.invalidateQueries({
      queryKey: ["studentDetailsWithConstraints"],
    });
  }

  const residentStudentDetailsArr = useMemo(
    () => transformStudentData(studentData?.student),
    [studentData],
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      Action();
    }
  };

  async function AssignAllocation() {
    const UserData = {
      matric_no: debouncedText,
      room_id: rowDetails.id.toString(),
    };

    try {
      const res = await mutation.mutateAsync(UserData);

      console.log("success", res.data);

      if (res.data.success === true) {
        toast.success("Bedspace Assigned Successfully");
      } else {
        if (res.data.msg) {
          toast.error(res.data.msg || "Assign Failed");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error);
        toast.error(error.response.data.msg || "Assign Failed");
      } else {
        console.error(error);
        toast.error("Assign Failed");
      }
    }
  }

  return (
    <ModalWrapper>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Occupant</h1>
          <button onClick={() => setIsOpen(false)}>
            <RxCross2 size={24} />
          </button>
        </div>

        <div className="mt-6">
          <input
            className="h-[48px] w-full rounded-md border-[1.5px] border-solid border-[#A0AEC0] bg-white px-4 text-[#2D3748]"
            placeholder="Enter matric no"
            value={text}
            onKeyPress={handleKeyPress}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {studentIsLoading && (
          <div className="mt-6 text-center text-base font-medium">
            Loading...
          </div>
        )}
        {studentError && (
          <div className="mt-6 text-center text-base font-medium text-red-500">
            {studentError.message}
          </div>
        )}

        {studentData && (
          <div className="mt-6 flex gap-[80px] rounded-2xl bg-white">
            <Image
              src={
                studentData?.student.img_url ||
                "/images/default-avatar-profile.jpg"
              }
              alt="img"
              width={128}
              height={128}
              className="h-[128px] w-[128px] rounded-full"
            />

            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
              {residentStudentDetailsArr.length > 0 &&
                residentStudentDetailsArr.map((item) => (
                  <ResidentDetails
                    key={item.title}
                    title={item.title}
                    details={item.details}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex w-full justify-end">
          <RoundedBtn
            text={mutation.isPending ? "Loading..." : "Assign Bedspace"}
            onClick={AssignAllocation}
            className="w-fit rounded-md border-[1.5px] border-solid border-[#3182CE] bg-white px-4 text-[#3182CE]"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

interface ResidentInfo {
  title: string;
  details: string;
}

const ResidentDetails: FC<ResidentInfo> = ({ title, details }) => {
  return (
    <div className="flex w-[240px] flex-col gap-3">
      <h2 className="text-lg font-normal text-[#4A5568]">{title}</h2>
      <p className="text-lg font-semibold text-[#4A5568]">{details}</p>
    </div>
  );
};
