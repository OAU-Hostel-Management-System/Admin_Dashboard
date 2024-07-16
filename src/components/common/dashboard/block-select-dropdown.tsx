"use client";

import { DashboardSelectCustomStyles, formattedBlocks } from "@/lib";
import { BlockSelectInputs } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";

export const BlockSelectDropdown = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlockSelectInputs>();

  const onSubmit: SubmitHandler<BlockSelectInputs> = (data) => {
    console.log("Selected data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="blockNames"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={formattedBlocks}
              placeholder="Select a block"
              styles={DashboardSelectCustomStyles}
            />
          )}
        />
        {errors.blockNames && <p>{errors.blockNames.message}</p>}
      </div>
    </form>
  );
};
