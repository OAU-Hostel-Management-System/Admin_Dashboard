"use client";

import { DashboardSelectCustomStyles } from "@/lib";
import { FC } from "react";
import Select, { SingleValue } from "react-select";

interface RoomData {
  value: string;
  label: string;
}

interface RoomSelectDropdownProps {
  roomData: RoomData[];
  onChange: (selectedOption: RoomData | null) => void;
  value?: RoomData;
}

export const RoomSelectDropdown: FC<RoomSelectDropdownProps> = ({
  roomData,
  onChange,
  value,
}) => {
  return (
    <Select
      options={roomData}
      placeholder="Select a room"
      styles={DashboardSelectCustomStyles}
      onChange={(newValue: SingleValue<RoomData>) => onChange(newValue)}
      value={value}
    />
  );
};
