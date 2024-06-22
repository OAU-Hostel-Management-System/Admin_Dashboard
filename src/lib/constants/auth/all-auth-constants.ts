import { AuthInputsValues, Option } from "@/types";
import { generateDecreasingYear } from "@/utils";

export const AuthSelectCustomStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "48px", // Set minimum height
    height: "48px", // Set height
    border: state.isFocused ? "1px solid #2684FF" : "1px solid #A0AEC0",
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

const dateOptions: Option[] = generateDecreasingYear();

export const semesterOptions = [
  { value: "Harmattan", label: "Harmattan" },
  { value: "Rain", label: "Rain" },
];


export const TextInputsArr = [
  {
    id: "matricNoOrStaffID" as AuthInputsValues,
    placeholder: "Matric No / Staff ID",
    regRules: { required: true },
    error: "Matric No / Staff ID is required",
  },
  {
    id: "password" as AuthInputsValues,
    placeholder: "Password",
    regRules: { required: true },
    error: "Password is required",
  },
];

export const SelectInputsArr = [
  {
    name: "session" as AuthInputsValues,
    options: dateOptions,
    rules: { required: true },
    error: "Session is required",
    placeholder: "Session",
  },
  {
    name: "semester" as AuthInputsValues,
    options: semesterOptions,
    rules: { required: true },
    error: "Semester is required",
    placeholder: "Semester",
  },
];
