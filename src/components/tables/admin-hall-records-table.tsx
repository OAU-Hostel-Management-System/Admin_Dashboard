"use client";

import {
  hallRecordsTableColumns,
  HallRecordsDataRow,
  tableCustomStyles,
} from "@/lib";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useIsClient } from "@/hooks";
import { useRouter } from "next/navigation";
import { FC } from "react";

type HallData = {
  roomNo: string;
  bedNo: string;
  status: string;
  matric_no: string;
  condition: string;
  id: number;
  block: string;
};

const transformData = (data: HallData[]): HallRecordsDataRow[] => {
  return data.map((student) => ({
    roomNo: student.roomNo,
    bedNo: student.bedNo,
    status: student.status,
    matric_no: student.matric_no,
    condition: student.condition,
    id: student.id,
  }));
};

interface AdminDashboardOverviewTableProps {
  studentData: HallData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const HallRecordsTable: FC<AdminDashboardOverviewTableProps> = ({
  studentData,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isClient = useIsClient();
  const router = useRouter();
  const formattedData = transformData(studentData);

  return (
    <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] p-3">
      {isClient && (
        <DataTable
          columns={hallRecordsTableColumns}
          data={formattedData}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          paginationServer
          paginationTotalRows={totalPages * 40}
          paginationDefaultPage={currentPage}
          onChangePage={onPageChange}
          customStyles={tableCustomStyles}
          highlightOnHover
          pointerOnHover
          responsive
          subHeaderWrap
          onRowClicked={(row) => {
            const idOrMatric = row.matric_no || row.id;
            const type = row.matric_no ? "matric_no" : "id";
            router.push(`hall-records/${idOrMatric}?type=${type}`);
          }}
        />
      )}
    </div>
  );
};
