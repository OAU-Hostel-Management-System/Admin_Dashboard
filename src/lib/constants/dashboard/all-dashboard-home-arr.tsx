import { DashboardInputsValues } from "@/types";
import { formatHostels, formatHostelsDemo } from "@/utils";
import { TableColumn } from "react-data-table-component";

export const DashboardSelectCustomStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "48px", // Set minimum height
    height: "48px", // Set height
    border: state.isFocused ? "1.5px solid #2684FF" : "1.5px solid #A0AEC0",
    boxShadow: state.isFocused ? "0 0 0 1px #2684FF" : "none", // Customize box shadow on focus
    "&:hover": {
      borderColor: state.isFocused ? "#2684FF" : "#A0AEC0",
    },
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "48px", // Ensure the height of indicators matches the control height
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: "48px", // Ensure the height of value container matches the control height
    padding: "0 1rem", // Customize padding if needed
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px", // Remove default margin
    padding: "0px", // Remove default padding
  }),
  placeholder: (provided: any) => ({
    ...provided,
    margin: "0px", // Remove default margin
    padding: "0px", // Remove default padding
  }),
  singleValue: (provided: any) => ({
    ...provided,
    margin: "0px", // Remove default margin
    padding: "0px", // Remove default padding
  }),
};

export const hostelNames = [
  "Angola Hall",
  "Awolowo Hall",
  "Fajuyi Hall",
  "ETF Hall",
  "Moremi Hall",
  "Murtala Muhammed Hall",
  "Postgraduate Hall",
  "Alumni Hall",
  "Mozambique Hall",
  "Ife Hall",
  "Akintola Hall",
  "Amina Hall",
];

const blockNames = ["A", "B", "C", "D", "E"];

export const formattedBlocks = formatHostelsDemo(blockNames);
export const formattedHostels = formatHostelsDemo(hostelNames);

export const SelectHostelInputsArr = [
  {
    name: "hostelNames" as DashboardInputsValues,
    options: formattedHostels,
    rules: { required: true },
    error: "Hostel is required",
    placeholder: "Select a hostel",
  },
];

// export interface OverviewDataRow {
//   block: string;
//   capacity: string;
//   allowedBed: string;
//   unallowedBed: string;
//   id: number;
// }
export interface OverviewDataRow {
  block: string;
  capacity: number;
  allowedBed: number;
  unallowedBed: number;
}

export const tableColumns: TableColumn<OverviewDataRow>[] = [
  {
    name: "Block",
    selector: (row) => row.block,
  },
  {
    name: "Carrying Capacity",
    selector: (row) => row.capacity,
  },
  {
    name: "Allocated Bedspaces",
    selector: (row) => row.allowedBed,
  },
  {
    name: "Unallocated Bedspaces",
    selector: (row) => row.unallowedBed,
  },
  // {
  //   cell: (row) => <div>Hello {JSON.stringify(row.allowedBed)}</div>,
  //   button: true,
  //   width: "56px",
  // },
];

export interface StudentRecordsDataRow {
  matric: string;
  name: string;
  gender: string;
  bedspace: string;
  payment_status: string;
}

export const studentRecordsTableColumns: TableColumn<StudentRecordsDataRow>[] =
  [
    {
      name: "Matric No",
      selector: (row) => row.matric,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "BedSpace",
      selector: (row) => row.bedspace,
    },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status,
    },
  ];

export interface HallRecordsDataRow {
  roomNo: string;
  bedNo: string;
  status: string;
  matric_no: string;
  condition: string;
  id: number;
}

export const hallRecordsTableColumns: TableColumn<HallRecordsDataRow>[] = [
  {
    name: "Room",
    selector: (row) => row.roomNo,
  },
  {
    name: "Bed",
    selector: (row) => row.bedNo,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Occupant",
    selector: (row) => row.matric_no,
  },
  {
    name: "Condition",
    selector: (row) => row.condition,
  },
];

export const tableCustomStyles = {
  rows: {
    style: {
      minHeight: "62px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 700,
      textTransform: "uppercase" as "uppercase",
      color: "#4A5568",
    },
  },
  cells: {
    style: {
      paddingTop: "18px",
      paddingBottom: "18px",
      fontSize: "14px",
      color: "#161616",
      fontWeight: 500,
    },
  },
};

export const TempTableData = [
  {
    id: 1,
    block: "Herbert Macaulay",
    capacity: "Doctor",
    allowedBed: "herbert.macaulay@mail.com",
    unallowedBed: "12/04/2024",
  },
  {
    id: 2,
    block: "Florence Nightingale",
    capacity: "Nurse",
    allowedBed: "florence.nightingale@mail.com",
    unallowedBed: "15/04/2024",
  },
  {
    id: 3,
    block: "Alexander Fleming",
    capacity: "Pharmacist",
    allowedBed: "alexander.fleming@mail.com",
    unallowedBed: "18/04/2024",
  },
  {
    id: 4,
    block: "Marie Curie",
    capacity: "Physiotherapist",
    allowedBed: "marie.curie@mail.com",
    unallowedBed: "20/04/2024",
  },
  {
    id: 5,
    block: "Sigmund Freud",
    capacity: "Healthcare Assistant",
    allowedBed: "sigmund.freud@mail.com",
    unallowedBed: "22/04/2024",
  },
  {
    id: 6,
    block: "Clara Barton",
    capacity: "Nurse",
    allowedBed: "clara.barton@mail.com",
    unallowedBed: "24/04/2024",
  },
  {
    id: 7,
    block: "Louis Pasteur",
    capacity: "Doctor",
    allowedBed: "louis.pasteur@mail.com",
    unallowedBed: "26/04/2024",
  },
  {
    id: 8,
    block: "Joseph Lister",
    capacity: "Pharmacist",
    allowedBed: "joseph.lister@mail.com",
    unallowedBed: "28/04/2024",
  },
  {
    id: 9,
    block: "Elizabeth Blackwell",
    capacity: "Physiotherapist",
    allowedBed: "elizabeth.blackwell@mail.com",
    unallowedBed: "30/04/2024",
  },
  {
    id: 10,
    block: "Edward Jenner",
    capacity: "Doctor",
    allowedBed: "edward.jenner@mail.com",
    unallowedBed: "02/05/2024",
  },
  {
    id: 11,
    block: "Jonas Salk",
    capacity: "Healthcare Assistant",
    allowedBed: "jonas.salk@mail.com",
    unallowedBed: "04/05/2024",
  },
  {
    id: 12,
    block: "Mary Seacole",
    capacity: "Nurse",
    allowedBed: "mary.seacole@mail.com",
    unallowedBed: "06/05/2024",
  },
  {
    id: 13,
    block: "Gregory Pincus",
    capacity: "Pharmacist",
    allowedBed: "gregory.pincus@mail.com",
    unallowedBed: "08/05/2024",
  },
  {
    id: 14,
    block: "Joseph Murray",
    capacity: "Doctor",
    allowedBed: "joseph.murray@mail.com",
    unallowedBed: "10/05/2024",
  },
  {
    id: 15,
    block: "Jane Cooke Wright",
    capacity: "Physiotherapist",
    allowedBed: "jane.cooke@mail.com",
    unallowedBed: "12/05/2024",
  },
  {
    id: 16,
    block: "Christiaan Barnard",
    capacity: "Healthcare Assistant",
    allowedBed: "christiaan.barnard@mail.com",
    unallowedBed: "14/05/2024",
  },
  {
    id: 17,
    block: "Virginia Apgar",
    capacity: "Doctor",
    allowedBed: "virginia.apgar@mail.com",
    unallowedBed: "16/05/2024",
  },
  {
    id: 18,
    block: "Rosalind Franklin",
    capacity: "Physiotherapist",
    allowedBed: "rosalind.franklin@mail.com",
    unallowedBed: "18/05/2024",
  },
  {
    id: 19,
    block: "Albert Sabin",
    capacity: "Healthcare Assistant",
    allowedBed: "albert.sabin@mail.com",
    unallowedBed: "20/05/2024",
  },
  {
    id: 20,
    block: "James Watson",
    capacity: "Doctor",
    allowedBed: "james.watson@mail.com",
    unallowedBed: "22/05/2024",
  },
  {
    id: 21,
    block: "Robert Koch",
    capacity: "Pharmacist",
    allowedBed: "robert.koch@mail.com",
    unallowedBed: "24/05/2024",
  },
  {
    id: 22,
    block: "Paul Ehrlich",
    capacity: "Doctor",
    allowedBed: "paul.ehrlich@mail.com",
    unallowedBed: "26/05/2024",
  },
  {
    id: 23,
    block: "Frederick Banting",
    capacity: "Nurse",
    allowedBed: "frederick.banting@mail.com",
    unallowedBed: "28/05/2024",
  },
  {
    id: 24,
    block: "Charles Best",
    capacity: "Pharmacist",
    allowedBed: "charles.best@mail.com",
    unallowedBed: "30/05/2024",
  },
  {
    id: 25,
    block: "Patrick Steptoe",
    capacity: "Physiotherapist",
    allowedBed: "patrick.steptoe@mail.com",
    unallowedBed: "01/06/2024",
  },
  {
    id: 26,
    block: "Walter Reed",
    capacity: "Doctor",
    allowedBed: "walter.reed@mail.com",
    unallowedBed: "03/06/2024",
  },
  {
    id: 27,
    block: "Christiaan Barnard",
    capacity: "Nurse",
    allowedBed: "christiaan.barnard@mail.com",
    unallowedBed: "05/06/2024",
  },
  {
    id: 28,
    block: "Elizabeth Garrett Anderson",
    capacity: "Physiotherapist",
    allowedBed: "elizabeth.anderson@mail.com",
    unallowedBed: "07/06/2024",
  },
  {
    id: 29,
    block: "Harold Varmus",
    capacity: "Healthcare Assistant",
    allowedBed: "harold.varmus@mail.com",
    unallowedBed: "09/06/2024",
  },
  {
    id: 30,
    block: "Anthony Fauci",
    capacity: "Doctor",
    allowedBed: "anthony.fauci@mail.com",
    unallowedBed: "11/06/2024",
  },
  {
    id: 31,
    block: "Frances Kelsey",
    capacity: "Nurse",
    allowedBed: "frances.kelsey@mail.com",
    unallowedBed: "13/06/2024",
  },
  {
    id: 32,
    block: "Alice Ball",
    capacity: "Pharmacist",
    allowedBed: "alice.ball@mail.com",
    unallowedBed: "15/06/2024",
  },
  {
    id: 33,
    block: "Charles Drew",
    capacity: "Physiotherapist",
    allowedBed: "charles.drew@mail.com",
    unallowedBed: "17/06/2024",
  },
  {
    id: 34,
    block: "Ruth Ella Moore",
    capacity: "Healthcare Assistant",
    allowedBed: "ruth.moore@mail.com",
    unallowedBed: "19/06/2024",
  },
  {
    id: 35,
    block: "Susan La Flesche",
    capacity: "Doctor",
    allowedBed: "susan.laflesche@mail.com",
    unallowedBed: "21/06/2024",
  },
  {
    id: 36,
    block: "George Papanicolaou",
    capacity: "Nurse",
    allowedBed: "george.papanicolaou@mail.com",
    unallowedBed: "23/06/2024",
  },
  {
    id: 37,
    block: "Dorothy Crowfoot Hodgkin",
    capacity: "Pharmacist",
    allowedBed: "dorothy.hodgkin@mail.com",
    unallowedBed: "25/06/2024",
  },
  {
    id: 38,
    block: "Joseph Goldberger",
    capacity: "Physiotherapist",
    allowedBed: "joseph.goldberger@mail.com",
    unallowedBed: "27/06/2024",
  },
  {
    id: 39,
    block: "William Harvey",
    capacity: "Healthcare Assistant",
    allowedBed: "william.harvey@mail.com",
    unallowedBed: "29/06/2024",
  },
  {
    id: 40,
    block: "Christian Doppler",
    capacity: "Doctor",
    allowedBed: "christian.doppler@mail.com",
    unallowedBed: "01/07/2024",
  },
  {
    id: 41,
    block: "René Laennec",
    capacity: "Nurse",
    allowedBed: "rene.laennec@mail.com",
    unallowedBed: "03/07/2024",
  },
  {
    id: 42,
    block: "Daniel Hale Williams",
    capacity: "Pharmacist",
    allowedBed: "daniel.williams@mail.com",
    unallowedBed: "05/07/2024",
  },
  {
    id: 43,
    block: "Vivien Thomas",
    capacity: "Physiotherapist",
    allowedBed: "vivien.thomas@mail.com",
    unallowedBed: "07/07/2024",
  },
  {
    id: 44,
    block: "William Osler",
    capacity: "Healthcare Assistant",
    allowedBed: "william.osler@mail.com",
    unallowedBed: "09/07/2024",
  },
  {
    id: 45,
    block: "Gertrude Elion",
    capacity: "Doctor",
    allowedBed: "gertrude.elion@mail.com",
    unallowedBed: "11/07/2024",
  },
  {
    id: 46,
    block: "Hippocrates",
    capacity: "Nurse",
    allowedBed: "hippocrates@mail.com",
    unallowedBed: "13/07/2024",
  },
  {
    id: 47,
    block: "Imhotep",
    capacity: "Pharmacist",
    allowedBed: "imhotep@mail.com",
    unallowedBed: "15/07/2024",
  },
  {
    id: 48,
    block: "Hildegard of Bingen",
    capacity: "Physiotherapist",
    allowedBed: "hildegard.bingen@mail.com",
    unallowedBed: "17/07/2024",
  },
  {
    id: 49,
    block: "Ambroise Paré",
    capacity: "Healthcare Assistant",
    allowedBed: "ambroise.pare@mail.com",
    unallowedBed: "19/07/2024",
  },
  {
    id: 50,
    block: "Ignaz Semmelweis",
    capacity: "Doctor",
    allowedBed: "ignaz.semmelweis@mail.com",
    unallowedBed: "21/07/2024",
  },
];
