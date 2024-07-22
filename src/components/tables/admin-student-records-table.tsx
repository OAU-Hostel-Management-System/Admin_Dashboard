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

type StudentData = {
  matric: string;
  name: string;
  gender: string;
  bedspace: string;
  payment_status: string;
};

const transformData = (data: StudentData[]): StudentRecordsDataRow[] => {
  return data.map((student) => ({
    matric: student.matric,
    name: student.name,
    gender: student.gender,
    bedspace: student.bedspace,
    payment_status: student.payment_status,
  }));
};

interface AdminDashboardOverviewTableProps {
  studentData: StudentData[];
}

export const StudentRecordsTable: FC<AdminDashboardOverviewTableProps> = ({
  studentData,
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
          customStyles={tableCustomStyles}
          highlightOnHover
          pointerOnHover
          responsive
          subHeaderWrap
          // onRowClicked={(row) => {
          //   console.log(row);
          //   router.push(`student-records/${row.id}`);
          // }}
        />
      )}
    </div>
  );
};
