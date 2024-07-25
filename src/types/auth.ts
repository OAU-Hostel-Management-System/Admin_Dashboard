export interface Option {
  value: string;
  label: string;
}

export interface AuthInputs {
  matricNoOrStaffID: string;
  password: string;
  session: Option;
  // semester: Option;
}
export type AuthInputsValues = keyof AuthInputs;