"use client";

import { EditHallRecordsModal, PageLoader, RoundedBtn } from "@/components";
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

interface PageProps {
  params: { matricOrRoomId: string[] };
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

// const AdminStudentDetails: FC<PageProps> = ({ params }) => {
const AdminStudentDetails = () => {
  // const [matricOrRoomId] = params.matricOrRoomId;

  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const params = useParams();
  // const matricOrRoomId = params.matricOrRoomId;

  const id = params.matricOrRoomId;
  // const matric_no = params.matric_no;
  const searchParams = useSearchParams();
  const matric_no = searchParams.get("matric_no");
  // const type = searchParams.get("type");
  const type = matric_no ? "matric_no" : "id";

  console.log("params id", id[0]);
  console.log("searchparams", type, "---martic", matric_no);

  const { studentData, studentError, studentIsError, studentIsLoading } =
    useFetchStudentDetails(
      decryptedToken,
      type === "matric_no" ? matric_no! : id[0],
      type,
    );

  const residentBedSpaceDetailsArr = useMemo(
    () => transformRoomData(studentData?.room),
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
              text="Edit"
              onClick={() => setOpenModal(true)}
              className="w-fit rounded-md border-[1.5px] border-solid border-[#3182CE] bg-white px-4 text-[#3182CE]"
            />
            <RoundedBtn
              text="Back"
              onClick={() => router.back()}
              className="w-fit rounded-md border-[1.5px] border-solid border-[#E2E8F0] bg-white px-4 text-[#1A202C]"
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

      <EditHallRecordsModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        hallRecordData={residentBedSpaceDetailsArr}
        matricNo={matric_no}
        roomId={id[0]}
        type={type!}
      />

      {/* <div className="mt-6 rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1A202C]">Occupant</h1>
          <RoundedBtn
            text="View ID card"
            className="w-fit rounded-md border-[1.5px] border-solid border-[#3182CE] bg-white px-4 text-[#3182CE]"
          />
        </div>
        <div className="mt-5 flex gap-[80px] rounded-2xl bg-white">
          <Image
            src={"/images/default-avatar-profile.jpg"}
            alt="img"
            width={128}
            height={128}
            className="h-[128px] w-[128px] rounded-full"
          />

          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
            {residentBedSpaceDetailsArr.map((item) => (
              <ResidentDetails
                key={item.title}
                title={item.title}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default AdminStudentDetails;

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
