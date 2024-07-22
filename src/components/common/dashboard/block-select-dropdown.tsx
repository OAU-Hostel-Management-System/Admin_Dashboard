"use client";

import { DashboardSelectCustomStyles } from "@/lib";
import { FC } from "react";
import Select, { SingleValue } from "react-select";

interface BlockData {
  value: string;
  label: string;
}

interface BlockSelectDropdownProps {
  blockData: BlockData[];
  onChange: (selectedOption: BlockData | null) => void;
  value?: BlockData;
}

export const BlockSelectDropdown: FC<BlockSelectDropdownProps> = ({
  blockData,
  onChange,
  value,
}) => {
  return (
    <Select
      options={blockData}
      placeholder="Select a block"
      styles={DashboardSelectCustomStyles}
      onChange={(newValue: SingleValue<BlockData>) => onChange(newValue)}
      value={value}
    />
  );
};
