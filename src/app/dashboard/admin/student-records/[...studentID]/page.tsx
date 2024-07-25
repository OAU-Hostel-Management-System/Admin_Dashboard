"use client";

import {
  IDtemplate,
  PageLoader,
  RevokeBedspaceModal,
  RoundedBtn,
} from "@/components";
import { useFetchStudentDetails } from "@/hooks";
import { decryptToken } from "@/utils";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { toast } from "react-toastify";

interface BedSpaceData {
  bedNo: string;
  block: string;
  condition: string;
  hostel_name: string;
  roomNo: string;
  status: string;
}

interface Student {
  fullName: string;
  dept: string;
  faculty: string;
  img_url: string;
  matric_no: string;
  paid: boolean;
  part: string;
}

const transformRoomData = (data?: BedSpaceData) => {
  if (!data) {
    return [];
  }
  return [
    { title: "Hostel", details: data.hostel_name || "N/A" },
    { title: "Block", details: data.block || "N/A" },
    { title: "Room", details: data.roomNo || "N/A" },
    { title: "Bed", details: data.bedNo || "N/A" },
    { title: "Status", details: data.status || "N/A" },
    { title: "Condition", details: data.condition || "N/A" },
  ];
};

const transformStudentData = (data?: Student) => {
  if (!data) {
    return [];
  }
  return [
    { title: "Name", details: data.fullName || "N/A" },
    { title: "Matric No", details: data.matric_no || "N/A" },
    { title: "Dept", details: data.dept || "N/A" },
    { title: "Level", details: data.part || "N/A" },
    { title: "Faculty", details: data.faculty || "N/A" },
    {
      title: "Payment Status",
      details: (data.paid === true ? "Successful" : "Unsuccessful") || "N/A",
    },
  ];
};

const transformIdData = (studentData?: Student, roomData?: BedSpaceData) => {
  if (!studentData || !roomData) {
    return [];
  }
  return [
    {
      title: "Name",
      details: studentData.fullName || "N/A",
    },
    {
      title: "Matric No",
      details: studentData.matric_no || "N/A",
    },
    {
      title: "Department",
      details: studentData.dept || "N/A",
    },
    {
      title: "Block",
      details: roomData.block || "N/A",
      subDetails: [
        { title: "Room No", details: roomData.roomNo || "N/A" },
        { title: "Bed No", details: roomData.bedNo || "N/A" },
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
};

const AdminStudentRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openRevokeModal, setOpenRevokeModal] = useState(false);

  const router = useRouter();
  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const params = useParams();

  const matric_no = params.studentID;

  console.log("---martic", matric_no);

  const { studentData, studentError, studentIsError, studentIsLoading } =
    useFetchStudentDetails(decryptedToken, matric_no[0], "matric_no");

  const residentBedSpaceDetailsArr = useMemo(
    () => transformRoomData(studentData?.room),
    [studentData],
  );

  const residentStudentDetailsArr = useMemo(
    () => transformStudentData(studentData?.student),
    [studentData],
  );

  const IdDetailsArr = useMemo(
    () => transformIdData(studentData?.student, studentData?.room),
    [studentData],
  );

  if (studentIsLoading) return <PageLoader />;

  if (studentError) {
    toast.error(studentError?.message);
    return null;
  }

  return (
    <div>
      <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1A202C]">Bedspace</h1>
          <div className="flex items-center gap-6">
            <RoundedBtn
              onClick={() => router.back()}
              text="Back"
              className="w-fit rounded-md border-[1.5px] border-solid border-[#E2E8F0] bg-white px-4 text-[#1A202C]"
            />
            <RoundedBtn
              text="Revoke Bedspace"
              onClick={() => setOpenRevokeModal(true)}
              className="w-fit rounded-md border-[1.5px] border-solid border-[#E53E3E] bg-white px-4 text-[#E53E3E]"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
          {residentBedSpaceDetailsArr.length > 0 &&
            residentBedSpaceDetailsArr.map((item) => (
              <ResidentDetails
                key={item.title}
                title={item.title}
                details={item.details}
              />
            ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1A202C]">Occupant</h1>
          <RoundedBtn
            text="View ID card"
            onClick={() => setIsOpen(true)}
            className="w-fit rounded-md border-[1.5px] border-solid border-[#3182CE] bg-white px-4 text-[#3182CE]"
          />
        </div>
        <div className="mt-5 flex gap-[80px] rounded-2xl bg-white">
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
      </div>

      <IDtemplate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hall={studentData?.room.hostel_name!}
        studentData={studentData?.student!}
        idDetails={IdDetailsArr}
      />
      <RevokeBedspaceModal
        isOpen={openRevokeModal}
        setIsOpen={setOpenRevokeModal}
        matricNo={studentData?.student.matric_no!}
      />
    </div>
  );
};
export default AdminStudentRecord;

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
