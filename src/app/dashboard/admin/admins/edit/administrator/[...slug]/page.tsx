"use client";

import { ColorBorderAndTextBtn } from "@/components";
import { DashboardSelectCustomStyles, formattedHostels } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import Select from "react-select";
import { toast } from "react-toastify";

const EditAdminPage = () => {
  function Hello() {
    console.log("Hello");
  }

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file (JPEG or PNG)");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const router = useRouter();

  // function handleSave() {}

  return (
    <div>
      <div className="rounded-2xl border border-solid border-[#CBD5E0] p-9">
        <h2 className="text-xl font-bold text-[#1A202C]">Edit Administrator</h2>
        <div className="mt-[26px]">
          <div className="flex gap-7 rounded-2xl bg-white p-6">
            <SelectProfilePicInput
              ref={fileInputRef}
              handleClick={handleButtonClick}
            />
            <div className="flex flex-col space-y-[17px] text-lg font-normal text-[#4A5568]">
              {InputArr.map((item) => (
                <EditInput key={item.name} label={item.placeholder} />
              ))}

              {SelectUserTypeArr.map((item) => (
                <SelectUserRadio
                  key={item.userType}
                  userType={item.userType}
                  desc={item.desc}
                  more={
                    item.userType === "Standard User" ? (
                      <div>
                        {/* <Controller
                          control={control}
                          name="hostelNames"
                          rules={{ required: "This field is required" }}
                          render={({ field }) => ( */}
                        <Select
                          // {...field}
                          options={formattedHostels}
                          placeholder="Select a hostel"
                          styles={DashboardSelectCustomStyles}
                        />
                        {/* )}
                        /> */}
                      </div>
                    ) : null
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 flex space-x-6">
        <ColorBorderAndTextBtn
          text="Save Changes"
          color="#3182CE"
          className="w-fit px-4"
          link={true}
          // handleClick={handleSave}
          linkHref={`/dashboard/admin/admins`}
        />
        <ColorBorderAndTextBtn
          text="Cancel"
          color="#1A202C"
          className="w-fit px-4"
          link={true}
          // handleClick={Hello}
          linkHref={``}
        />
      </div>
    </div>
  );
};
export default EditAdminPage;

const SelectProfilePicInput = forwardRef<
  HTMLInputElement,
  { handleClick?: () => void }
>(({ handleClick }, ref) => {
  return (
    <div className="relative flex h-[128px] w-[128px] shrink-0">
      <Image
        src={"/images/default-avatar-profile.jpg"}
        alt="img"
        width={128}
        height={128}
        className="h-[128px] w-[128px] rounded-full"
      />
      <div className="absolute bottom-[-10px] right-[-10px] rounded-full bg-white p-2">
        <button className="rounded-full bg-[#4A5568] p-2" onClick={handleClick}>
          <input
            ref={ref}
            type="file"
            accept="image/jpeg,image/png"
            // ref={fileInputRef}
            style={{ display: "none" }}
            // onChange={handleImageChange}
          />
          <FaRegEdit className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
});

SelectProfilePicInput.displayName = "SelectProfilePicInput";

const EditInput = forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={label}
        className="h-[48px] rounded-md border border-[#A0AEC0] bg-white px-4 text-base font-normal text-[#4A5568]"
      />
    );
  },
);

EditInput.displayName = "EditInput";

const InputArr = [
  { name: "firstName", placeholder: "Syndrome" },
  { name: "lastName", placeholder: "Own" },
  { name: "staffID", placeholder: "862019" },
  { name: "hostel", placeholder: "Hall Warden" },
];

const SelectUserRadio = ({
  userType,
  desc,
  more,
}: {
  userType: string;
  desc: string;
  more?: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 text-base font-normal text-[#4A5568]">
      <div className="flex gap-2 text-base font-normal">
        <input type="radio" name="standardUser" id="standardUser" />
        <span>{userType}</span>
      </div>

      <p>{desc}</p>

      {more}
    </div>
  );
};

const SelectUserTypeArr = [
  {
    userType: "Standard User",
    desc: "Standard User can make use of portal and change settings that do not affect other users.",
  },
  {
    userType: "Administrator",
    desc: "Administrator has complete access to the portal and can make any desired changes that may affect standard users.",
  },
];
