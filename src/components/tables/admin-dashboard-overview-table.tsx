"use client";

import { tableColumns, tableCustomStyles } from "@/lib";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useIsClient } from "@/hooks";
import { FC } from "react";

type HostelData = {
  block: string;
  gender: string;
  hostel_abbrv: string;
  hostel_name: string;
  max_capacity: number;
  occupied: number;
  unoccupied: number;
};

type OverviewDataRow = {
  block: string;
  capacity: number;
  allowedBed: number;
  unallowedBed: number;
};

const transformData = (data: HostelData[]): OverviewDataRow[] => {
  return data.map((hostel) => ({
    block: hostel.block,
    capacity: hostel.max_capacity,
    allowedBed: hostel.occupied,
    unallowedBed: hostel.unoccupied,
  }));
};

interface AdminDashboardOverviewTableProps {
  hostelData: HostelData[];
}

export const AdminDashboardOverviewTable: FC<
  AdminDashboardOverviewTableProps
> = ({ hostelData }) => {
  const formattedData = transformData(hostelData);
  const isClient = useIsClient();

  return (
    <div className="rounded-2xl border-[1.5px] border-[#CBD5E0] p-3">
      {isClient && (
        <DataTable
          columns={tableColumns}
          data={formattedData}
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
          // selectableRows
          // onSelectedRowsChange={handleChange}
        />
      )}
    </div>
  );
};

{
}

// const ExpandedComponent: FC<ExpanderComponentProps<OverviewDataRow>> = ({
//   data,
// }) => {
//   return <div>{JSON.stringify(data)}</div>;
// };
