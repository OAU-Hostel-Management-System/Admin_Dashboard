import { Option } from "./auth";


export interface DashboardInputs {
  hostelNames: Option;
}

export type DashboardInputsValues = keyof DashboardInputs;
