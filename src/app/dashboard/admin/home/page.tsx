"use client";

import {
  AdminDashboardOverviewTable,
  HallOfResidenceDetails,
  HostelSelectDropdown,
  PageLoader,
} from "@/components";
import { useFetchHostelData, useGetFilters } from "@/hooks";
import { decryptToken } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const DashboardHome = () => {
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

  const { hostelIsLoading, hostelIsError, hostelData, hostelError } =
    useFetchHostelData(selectedHostel?.value!, decryptedToken);

  const handleHostelChange = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    setSelectedHostel(selectedOption || undefined);
    console.log("Selected Hostel:", selectedOption);
    queryClient.invalidateQueries({ queryKey: ["hostelData"] });
  };

  if (filterIsLoading || hostelIsLoading) return <PageLoader />;

  if (filterIsError || hostelIsError) {
    toast.error(filterError?.message || hostelError?.message);
  }

  return (
    <div className="flex flex-col gap-4">
      <HostelSelectDropdown
        hostelData={filterData!}
        onChange={handleHostelChange}
        value={selectedHostel}
      />
      <HallOfResidenceDetails
        blocks={hostelData?.resDetails.blocks!}
        capacity={hostelData?.resDetails.capacity!}
        sex={hostelData?.resDetails.sex!}
        warden={hostelData?.resDetails.warden!}
      />
      <AdminDashboardOverviewTable hostelData={hostelData?.hostelSum!} />
    </div>
  );
};
export default DashboardHome;
