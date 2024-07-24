"use client";

import {
  StudentRecordsDataRow,
  studentRecordsTableColumns,
  tableCustomStyles,
} from "@/lib";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useIsClient } from "@/hooks";
import { useRouter } from "next/navigation";
import { FC } from "react";

// type StudentData = {
//   matric_no: string;
//   name: string;
//   gender: string;
//   bedspace: string;
//   payment_status: string;
// };

interface RoomDetail {
  bedNo: string;
  block: string;
  roomNo: string;
  hostel_name: string;
  status: string;
  condition: string;
}

interface Student {
  fullName: string;
}

interface Room {
  gender: string;
}

interface StudentRecord {
  matric_no: string;
  room_detail: RoomDetail;
  paid: boolean;
  student: Student;
  room: Room;
}

const transformData = (data: StudentRecord[]): StudentRecordsDataRow[] => {
  return data.map((student) => ({
    matric_no: student.matric_no,
    name: student.student.fullName,
    gender:
      student.room.gender === "M"
        ? "Male"
        : student.room.gender === "F"
          ? "Female"
          : "",
    // bedspace: student.bedspace,
    bedspace: `Block ${student.room_detail.block} , Room ${student.room_detail.roomNo} , Bed ${student.room_detail.bedNo}`,
    payment_status: student.paid ? "Paid" : "Not Paid",
  }));
};

interface AdminDashboardOverviewTableProps {
  studentData: StudentRecord[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const StudentRecordsTable: FC<AdminDashboardOverviewTableProps> = ({
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
          columns={studentRecordsTableColumns}
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
            const matric_no = row.matric_no;
            // const type = row.matric_no ? "matric_no" : "id";

            router.push(`student-records/${encodeURIComponent(matric_no)}`);
          }}
        />
      )}
    </div>
  );
};
