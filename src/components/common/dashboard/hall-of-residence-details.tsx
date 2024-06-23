"use client";

import { useIsClient } from "@/hooks";
import {
  OverviewDataRow,
  tableColumns,
  tableCustomStyles,
  TempTableData,
} from "@/lib";
import { FC } from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";

export const HallOfResidenceDetails = () => {
  const isClient = useIsClient();
  return (
    <div className="rounded-2xl border border-[#CBD5E0] bg-white p-7">
      <h1 className="text-xl font-bold text-[#1A202C]">
        Hall of Residence Details
      </h1>

      <div className="mt-5 flex flex-col gap-5">
        <div className="flex">
          <ResidentDetails title="Sex" details="Male" />
          <ResidentDetails title="Hall Capacity" details="880" />
        </div>
        <div className="flex">
          <ResidentDetails title="Blocks" details="11 (A-J)" />
          <ResidentDetails title="Hall Warden" details="Meet D. Grahams" />
        </div>
      </div>

      {/* {isClient && (
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
          expandOnRowClicked
          expandableRows
          expandableRowsHideExpander
          expandableRowsComponent={ExpandedComponent}
          // selectableRows
          // onSelectedRowsChange={handleChange}
        />
      )} */}

      <EditableDataTable />
    </div>
  );
};

interface ResidentInfo {
  title: string;
  details: string;
}

const ResidentDetails: FC<ResidentInfo> = ({ title, details }) => {
  return (
    <div className="flex w-[240px] flex-col gap-3">
      <h2 className="text-lg font-normal text-[#4A5568]">{title}</h2>
      <p className="text-lg font-semibold text-[#4A5568]">{details}</p>
    </div>
  );
};

const ExpandedComponent: FC<ExpanderComponentProps<OverviewDataRow>> = ({
  data,
}) => {
  return <div>{JSON.stringify(data)}</div>;
};

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface DataRow {
  id: number;
  name: string;
  age: number;
}

const initialData: DataRow[] = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
];

type FormInputs = {
  [key: string]: any;
};

const EditableDataTable = () => {
  const [data, setData] = useState<DataRow[]>(initialData);
  const { control, handleSubmit, setValue } = useForm<FormInputs>();

  const handleSave = (rowIndex: number, field: keyof DataRow, value: any) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setData(newData);
  };

  const columns = [
    {
      name: "Name",
      selector: (row: DataRow) => row.name,
      cell: (row: DataRow, rowIndex: number) => (
        <Controller
          name={`name-${rowIndex}`}
          control={control}
          defaultValue={row.name}
          render={({ field }) => (
            <input
              {...field}
              onBlur={() => handleSave(rowIndex, "name", field.value)}
            />
          )}
        />
      ),
    },
    {
      name: "Age",
      selector: (row: DataRow) => row.age,
      cell: (row: DataRow, rowIndex: number) => (
        <Controller
          name={`age-${rowIndex}`}
          control={control}
          defaultValue={row.age}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              onBlur={() => handleSave(rowIndex, "age", Number(field.value))}
            />
          )}
        />
      ),
    },
  ];

  return (
    <div>
      <h1>Editable DataTable</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
