import { Option } from "./auth";


export interface DashboardInputs {
  hostelNames: Option;
}

export interface BlockSelectInputs {
  blockNames: Option;
}



export type DashboardInputsValues = keyof DashboardInputs;
export type BlockSelectInputsValues = keyof BlockSelectInputs;
