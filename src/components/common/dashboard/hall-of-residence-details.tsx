import { FC } from "react";

export const HallOfResidenceDetails = () => {
  return (
    <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
      <h1 className="text-xl font-bold text-[#1A202C]">
        Hall of Residence Details
      </h1>

      <div className="mt-5 flex flex-col gap-5">
        <div className="flex">
          <ResidentDetails title="Sex" details="Male" />
          <ResidentDetails title="Hall Capacity" details="880" />
        </div>
        <div className="flex">
          <ResidentDetails title="Blocks" details="11 (A-J)" />
          <ResidentDetails title="Hall Warden" details="Meet D. Grahams" />
        </div>
      </div>
    </div>
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
