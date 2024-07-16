import { RoundedBtn } from "@/components";
import Image from "next/image";
import { FC } from "react";

const AdminStudentDetails = () => {
  return (
    <div>
      <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1A202C]">Bedspace</h1>
          <div className="flex items-center gap-6">
            <RoundedBtn
              text="Back"
              className="w-fit rounded-md border-[1.5px] border-solid border-[#E2E8F0] bg-white px-4 text-[#1A202C]"
            />
            <RoundedBtn
              text="Revoke Bedspace"
              className="w-fit rounded-md border-[1.5px] border-solid border-[#E53E3E] bg-white px-4 text-[#E53E3E]"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
          <ResidentDetails title="Hall" details="Moremi Hall" />
          <ResidentDetails title="Block" details="5" />
          <ResidentDetails title="Room" details="302" />
          <ResidentDetails title="Bed" details="1" />
          <ResidentDetails title="Status" details="Occupied" />
          <ResidentDetails title="Condition" details="Good" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
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
            <ResidentDetails title="Hall" details="Moremi Hall" />
            <ResidentDetails title="Block" details="5" />
            <ResidentDetails title="Room" details="302" />
            <ResidentDetails title="Bed" details="1" />
            <ResidentDetails title="Status" details="Occupied" />
            <ResidentDetails title="Condition" details="Good" />
          </div>
        </div>
      </div>
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
