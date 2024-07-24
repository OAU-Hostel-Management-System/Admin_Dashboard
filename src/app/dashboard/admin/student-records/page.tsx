"use client";

import {
  BlockSelectDropdown,
  HostelSelectDropdown,
  PageLoader,
  RoomSelectDropdown,
  StudentRecordsTable,
} from "@/components";
import { useFetchStudentRecords, useGetFilters } from "@/hooks";
import { decryptToken } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  forwardRef,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

interface OptionType {
  value: string;
  label: string;
}

const DashboardStudentRecord = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

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
    queryClient.invalidateQueries({ queryKey: ["studentRecords"] });
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

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchText(searchText);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchText]);

  const { studentData, studentError, studentIsError, studentIsLoading } =
    useFetchStudentRecords(
      decryptedToken,
      currentPage,
      selectedHostel?.label!,
      selectedBlock?.value!,
      selectedRoom?.value!,
      debouncedSearchText,
    );

  function action() {
    setDebouncedSearchText(searchText);
    queryClient.invalidateQueries({ queryKey: ["studentRecords"] });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (filterIsLoading || studentIsLoading) return <PageLoader />;

  if (filterIsError || studentIsError) {
    toast.error(filterError?.message || studentError?.message);
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

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Student Records</h2>
        <Searchbar
          searchText={searchText}
          setSearchText={setSearchText}
          action={action}
        />
      </div>

      <div className="my-12">
        {/* <h2 className="text-xl font-bold">Bedspaces</h2> */}

        <div className="relative z-0 mt-5">
          {studentData && studentData.data && (
            <StudentRecordsTable
              studentData={studentData.data}
              currentPage={currentPage}
              totalPages={studentData.pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardStudentRecord;

interface SearchbarProps {
  searchText: string;
  setSearchText: React.Dispatch<SetStateAction<string>>;
  action: () => void;
}

const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ searchText, setSearchText, action }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        action();
      }
    };

    return (
      <div className="relative h-[50px] w-full">
        <input
          ref={ref}
          type="text"
          placeholder="Search Matric No"
          value={searchText}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-[50px] w-full rounded-md border-[1.5px] border-[#A0AEC0] p-2 pl-4 pr-[42px]"
        />
        <FiSearch
          className="absolute right-4 top-[50%] translate-y-[-50%]"
          size={26}
          color="#4A5568"
        />
      </div>
    );
  },
);
Searchbar.displayName = "Searchbar";
