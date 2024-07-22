"use client";

import {
  BlockSelectDropdown,
  HostelSelectDropdown,
  PageLoader,
  StudentRecordsTable,
} from "@/components";
import { useGetFilters } from "@/hooks";
import { decryptToken } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

const DashboardStudentRecord = () => {
  const queryClient = useQueryClient();

  const [selectedHostel, setSelectedHostel] = useState<
    { value: string; label: string } | undefined
  >({
    value: "AWO",
    label: "Awolowo",
  });

  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const { filterIsLoading, filterIsError, filterData, filterError } =
    useGetFilters(decryptedToken);

  const handleHostelChange = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    setSelectedHostel(selectedOption || undefined);
    console.log("Selected Hostel:", selectedOption);
    queryClient.invalidateQueries({ queryKey: ["hostelData"] });
  };

  if (filterIsLoading) return <PageLoader />;

  if (filterIsError) {
    toast.error(filterError?.message);
  }

  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Hostel</h2>
        <HostelSelectDropdown
          hostelData={filterData!}
          onChange={handleHostelChange}
          defaultValue={selectedHostel}
        />
      </div>
      <div className="my-6 flex items-center justify-between">
        <div className="w-[45%] space-y-2">
          <h2 className="text-xl font-bold">Block</h2>
          <BlockSelectDropdown />
        </div>
        <div className="w-[45%] space-y-2">
          <h2 className="text-xl font-bold">Room</h2>
          <BlockSelectDropdown />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Student Records</h2>
        <Searchbar />
      </div>

      <div className="my-12">{/* <StudentRecordsTable /> */}</div>
    </div>
  );
};
export default DashboardStudentRecord;

const Searchbar = () => {
  return (
    <div className="relative h-[50px] w-full">
      <input
        type="text"
        placeholder="Search Matric No"
        className="h-[50px] w-full rounded-md border-[1.5px] border-[#A0AEC0] p-2 pl-4 pr-[42px]"
      />
      <FiSearch
        className="absolute right-4 top-[50%] translate-y-[-50%]"
        size={26}
        color="#4A5568"
      />
    </div>
  );
};
