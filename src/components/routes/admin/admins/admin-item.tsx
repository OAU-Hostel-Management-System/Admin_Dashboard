import { ColorBorderAndTextBtn } from "@/components/button";
import { getInitials } from "@/utils";
import Image from "next/image";

export const AdminItem = ({
  firstName,
  lastName,
  staffID,
  role,
  hostel,
  imgUrl,
}: {
  firstName: string;
  lastName: string;
  staffID: string;
  role: string;
  hostel: string;
  imgUrl?: string;
}) => {
  return (
    <div className="flex gap-7 rounded-2xl bg-white p-6">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt="img"
          width={128}
          height={128}
          className="h-[128px] w-[128px] rounded-full"
        />
      ) : (
        <div className="flex h-[128px] w-[128px] items-center justify-center rounded-full bg-[#00000014] text-5xl font-medium uppercase text-[#4A5568]">
          {getInitials(firstName, lastName).toUpperCase()}
        </div>
      )}

      <div className="space-y-[6px] text-lg font-normal text-[#4A5568]">
        <h2 className="text-xl font-bold">
          {firstName} {lastName}
        </h2>
        <p>{staffID}</p>
        <p>{role}</p>
        <p>{hostel}</p>
        <div className="space-x-6 pt-[9px]">
          <ColorBorderAndTextBtn text="Edit User" color="#3182CE" />
          <ColorBorderAndTextBtn text="Delete User" color="#E53E3E" />
        </div>
      </div>
    </div>
  );
};
