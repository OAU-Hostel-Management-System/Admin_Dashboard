"use client";

import {
  BedSpaceAllocationTable,
  BlockSelectDropdown,
  HostelSelectDropdown,
  PageLoader,
  RoomSelectDropdown,
  RoundedBtn,
} from "@/components";
import { useFetchHallRecords, useGetFilters } from "@/hooks";
import { decryptToken } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

interface OptionType {
  value: string;
  label: string;
}

const DashboardBedspaceAllocation = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedHostel, setSelectedHostel] = useState<OptionType | undefined>({
    value: "AWO",
    label: "Awolowo",
  });

  const [selectedBlock, setSelectedBlock] = useState<OptionType | undefined>(
    undefined,
  );
  const [selectedRoom, setSelectedRoom] = useState<OptionType | undefined>(
    undefined,
  );

  const token = localStorage.getItem("token");
  const decryptedToken = decryptToken(token!);

  const { filterIsLoading, filterIsError, filterData, filterError } =
    useGetFilters(decryptedToken);

  const handleHostelChange = (selectedOption: OptionType | null) => {
    setSelectedHostel(selectedOption || undefined);
    setSelectedBlock(undefined);
    setSelectedRoom(undefined);
    setCurrentPage(1);
    queryClient.invalidateQueries({ queryKey: ["hallRecords"] });
  };

  const handleBlockChange = (selectedOption: OptionType | null) => {
    setSelectedBlock(selectedOption || undefined);
    setSelectedRoom(undefined);
    setCurrentPage(1);
  };

  const handleRoomChange = (selectedOption: OptionType | null) => {
    setSelectedRoom(selectedOption || undefined);
    setCurrentPage(1);
  };

  const selectedHostelData = useMemo(
    () =>
      filterData?.find(
        (hostel) => hostel.hostel_abbrv === selectedHostel?.value,
      ),
    [selectedHostel, filterData],
  );

  const formattedBlocks = useMemo(
    () =>
      selectedHostelData
        ? selectedHostelData.blocks.map((block, idx) => ({
            value: `${block}`,
            label: `${block}`,
          }))
        : [],
    [selectedHostelData],
  );

  const formattedRooms = useMemo(
    () =>
      selectedHostelData
        ? selectedHostelData.rooms.map((room, idx) => ({
            value: `${room}`,
            label: `${room}`,
          }))
        : [],
    [selectedHostelData],
  );

  const { hallData, hallError, hallIsError, hallIsLoading } =
    useFetchHallRecords(
      decryptedToken,
      currentPage,
      selectedHostel?.value!,
      selectedBlock?.value!,
      selectedRoom?.value!,
    );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (filterIsLoading || hallIsLoading) return <PageLoader />;

  if (filterIsError || hallIsError) {
    toast.error(filterError?.message || hallError?.message);
    return null;
  }

  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Hostel</h2>
        <HostelSelectDropdown
          hostelData={filterData || []}
          onChange={handleHostelChange}
          value={selectedHostel}
        />
      </div>
      {selectedHostel && (
        <div className="my-6 flex items-center justify-between">
          <div className="w-[45%] space-y-2">
            <h2 className="text-xl font-bold">Block</h2>
            <BlockSelectDropdown
              blockData={formattedBlocks}
              onChange={handleBlockChange}
              value={selectedBlock}
            />
          </div>
          <div className="w-[45%] space-y-2">
            <h2 className="text-xl font-bold">Room</h2>
            <RoomSelectDropdown
              roomData={formattedRooms}
              onChange={handleRoomChange}
              value={selectedRoom}
            />
          </div>
        </div>
      )}
      <div className="my-12">
        <h2 className="text-xl font-bold">Bedspaces</h2>

        <div className="relative z-0 mt-5">
          {hallData && hallData.rooms && (
            <BedSpaceAllocationTable
              studentData={hallData.rooms}
              currentPage={currentPage}
              totalPages={hallData.pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardBedspaceAllocation;
