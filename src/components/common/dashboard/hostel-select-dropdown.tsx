"use client";

import { DashboardSelectCustomStyles, formattedHostels } from "@/lib";
import { DashboardInputs } from "@/types";
import { formatHostels } from "@/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";

export const HostelSelectDropdown = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DashboardInputs>();

  const onSubmit: SubmitHandler<DashboardInputs> = (data) => {
    console.log("Selected data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="hostelNames"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={formattedHostels}
              placeholder="Select a hostel"
              styles={DashboardSelectCustomStyles}
            />
          )}
        />
        {errors.hostelNames && <p>{errors.hostelNames.message}</p>}
      </div>
    </form>
  );
};
