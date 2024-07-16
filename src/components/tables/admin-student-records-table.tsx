"use client";

import {
  // OverviewDataRow,
  tableColumns,
  tableCustomStyles,
  TempTableData,
} from "@/lib";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useIsClient } from "@/hooks";
// import { FC } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";

export const StudentRecordsTable = () => {
  const isClient = useIsClient();
  const router = useRouter();

  return (
    <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] p-3">
      {isClient && (
        <DataTable
          columns={tableColumns}
          data={TempTableData}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          customStyles={tableCustomStyles}
          highlightOnHover
          pointerOnHover
          responsive
          subHeaderWrap
          // expandOnRowClicked
          // expandableRows
          // expandableRowsHideExpander
          // expandableRowsComponent={ExpandedComponent}
          onRowClicked={(row) => {
            console.log(row);
            router.push(`student-records/${row.id}`);
          }}
          // selectableRows
          // onSelectedRowsChange={handleChange}
        />
      )}
    </div>
  );
};

// const ExpandedComponent: FC<ExpanderComponentProps<OverviewDataRow>> = ({
//   data,
// }) => {
//   return <Link href={`student-records/3`}></Link>;
// };
