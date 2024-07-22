"use client";

import { DashboardSelectCustomStyles, formattedHostels } from "@/lib";
import { formatHostels } from "@/utils";
import { FC, useMemo } from "react";
import Select, { SingleValue } from "react-select";

interface HostelData {
  hostel_name: string;
  blocks: any[];
  rooms: any[];
  hostel_abbrv: string;
}

interface HostelSelectDropdownProps {
  hostelData: HostelData[];
  onChange: (selectedOption: { value: string; label: string } | null) => void;
  value?: { value: string; label: string };
}

export const HostelSelectDropdown: FC<HostelSelectDropdownProps> = ({
  hostelData,
  onChange,
  value,
}) => {
  const formattedHostels = useMemo(
    () => formatHostels(hostelData),
    [hostelData],
  );

  return (
    <Select
      options={formattedHostels}
      placeholder="Select a hostel"
      styles={DashboardSelectCustomStyles}
      // onChange={onChange}
      onChange={(newValue: SingleValue<{ value: string; label: string }>) =>
        onChange(newValue)
      }
      value={value}
    />
  );
};
