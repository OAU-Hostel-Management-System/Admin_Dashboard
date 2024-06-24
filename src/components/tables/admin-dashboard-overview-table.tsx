"use client";

import {
  OverviewDataRow,
  tableColumns,
  tableCustomStyles,
  TempTableData,
} from "@/lib";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useIsClient } from "@/hooks";
import { FC } from "react";

export const AdminDashboardOverviewTable = () => {
  const isClient = useIsClient();

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
          expandOnRowClicked
          expandableRows
          expandableRowsHideExpander
          expandableRowsComponent={ExpandedComponent}
          // selectableRows
          // onSelectedRowsChange={handleChange}
        />
      )}
    </div>
  );
};

{
  /* <EditableDataTable />; */
}

const ExpandedComponent: FC<ExpanderComponentProps<OverviewDataRow>> = ({
  data,
}) => {
  return <div>{JSON.stringify(data)}</div>;
};

// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";

// interface DataRow {
//   id: number;
//   name: string;
//   age: number;
// }

// const initialData: DataRow[] = [
//   { id: 1, name: "John Doe", age: 25 },
//   { id: 2, name: "Jane Smith", age: 30 },
// ];

// type FormInputs = {
//   [key: string]: any;
// };

// const EditableDataTable = () => {
//   const [data, setData] = useState<DataRow[]>(initialData);
//   const { control, handleSubmit, setValue } = useForm<FormInputs>();

//   const handleSave = (rowIndex: number, field: keyof DataRow, value: any) => {
//     const newData = [...data];
//     newData[rowIndex] = { ...newData[rowIndex], [field]: value };
//     setData(newData);
//   };

//   const columns = [
//     {
//       name: "Name",
//       selector: (row: DataRow) => row.name,
//       cell: (row: DataRow, rowIndex: number) => (
//         <Controller
//           name={`name-${rowIndex}`}
//           control={control}
//           defaultValue={row.name}
//           render={({ field }) => (
//             <input
//               {...field}
//               onBlur={() => handleSave(rowIndex, "name", field.value)}
//             />
//           )}
//         />
//       ),
//     },
//     {
//       name: "Age",
//       selector: (row: DataRow) => row.age,
//       cell: (row: DataRow, rowIndex: number) => (
//         <Controller
//           name={`age-${rowIndex}`}
//           control={control}
//           defaultValue={row.age}
//           render={({ field }) => (
//             <input
//               {...field}
//               type="number"
//               onBlur={() => handleSave(rowIndex, "age", Number(field.value))}
//             />
//           )}
//         />
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h1>Editable DataTable</h1>
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };
