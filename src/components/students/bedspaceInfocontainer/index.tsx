import Image from "next/image";
import { FC } from "react";

interface StudentInfoType {
  profile: {
    fullName: string;
    dept: string;
    faculty: string;
    email: string | null;
    part: string;
    matric_no: string;
    img_url: string;
  };
  bedspace: {
    room_detail: {
      bedNo: string | null;
      block: string | null;
      roomNo: string | null;
      hostel_name: string | null;
    };
    paid: false;
  };
}

export const BedSpaceInfoContainer = () => {
  const studentInfo: StudentInfoType = {
    profile: {
      fullName: "Okoroafor Chigozie Michael",
      dept: "Computer Science",
      faculty: "technology",
      email: null,
      part: "4",
      matric_no: "CSC/2018/114",
      img_url:
        "https://eportal.oauife.edu.ng/pic.php?image_id=CSC/2018/11420222",
    },
    bedspace: {
      room_detail: {
        bedNo: "3",
        block: "1",
        roomNo: "111",
        hostel_name: "FAJUYI",
      },
      paid: false,
    },
  };
  return (
    <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] bg-white p-7">
      <h1 className="text-xl font-bold text-[#1A202C]">Bed Space</h1>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-3">
          <InfoDetails
            title={"Hall"}
            details={studentInfo?.bedspace?.room_detail?.hostel_name}
          />
          <InfoDetails
            title={"Room"}
            details={studentInfo?.bedspace?.room_detail?.roomNo}
          />
        </div>
        <div className="flex flex-col gap-3">
          <InfoDetails
            title="Block"
            details={studentInfo?.bedspace?.room_detail?.block}
          />
          <InfoDetails
            title="Bed"
            details={studentInfo?.bedspace?.room_detail?.bedNo}
          />
        </div>
      </div>
    </div>
  );
};

interface InfoType {
  title: string;
  details: string | null;
}

const InfoDetails: FC<InfoType> = ({ title, details }) => {
  return (
    <div className="flex w-[240px] flex-col gap-3">
      <h2 className="text-lg font-normal text-[#4A5568]">{title}</h2>
      <p className="text-lg font-semibold text-[#4A5568]">
        {details ? details : "-"}
      </p>
    </div>
  );
};
