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

export const PersonalInfoContainer = () => {
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
      <h1 className="text-xl font-bold text-[#1A202C]">Student’s Details</h1>

      <div className="mt-5 grid grid-cols-3 gap-5">
        <Image
          src={studentInfo?.profile?.img_url}
          height={166}
          width={166}
          className="h-[166px] w-[166px] overflow-hidden rounded-full object-cover object-center"
          alt="profle"
        />
        <div className="flex flex-col gap-3">
          <StudentDetails
            title={"Name"}
            details={studentInfo.profile.fullName}
          />
          <StudentDetails
            title={"Department"}
            details={studentInfo?.profile?.dept}
          />
          <StudentDetails
            title={"Faculty"}
            details={studentInfo?.profile?.faculty}
          />
        </div>
        <div className="flex flex-col gap-3">
          <StudentDetails
            title="Matric Number"
            details={studentInfo?.profile?.matric_no}
          />
          <StudentDetails title="Level" details={studentInfo?.profile?.part+"00"} />
          <StudentDetails
            title="Email Address"
            details={!studentInfo?.profile?.email ? "@student.oauife.edu.ng" : studentInfo?.profile?.email}
          />
        </div>
      </div>
    </div>
  );
};

interface ResidentInfo {
  title: string;
  details: string | null;
}

const StudentDetails: FC<ResidentInfo> = ({ title, details }) => {
  return (
    <div className="flex w-[240px] flex-col gap-3">
      <h2 className="text-lg font-normal text-[#4A5568]">{title}</h2>
      <p className="text-lg font-semibold text-[#4A5568]">
        {details}
      </p>
    </div>
  );
};
