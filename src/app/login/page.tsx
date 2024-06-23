"use client";

import { AuthInput, AuthLayout, Navbar, RoundedBtn } from "@/components";
import { AuthSelectCustomStyles, SelectInputsArr, TextInputsArr } from "@/lib";
import Link from "next/link";
import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AuthInputs } from "@/types";
import { useIsClient } from "@/hooks";
import { useRouter } from "next/navigation";

const Login = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    router.push("/dashboard");
  };

  const isClient = useIsClient();

  return (
    <AuthLayout>
      <div className="relative flex min-h-[calc(100vh-100px)] flex-col items-center justify-center bg-[#EDEDED] px-[5%] py-[5%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full max-w-[520px] shrink-0 flex-col gap-4 bg-white p-8"
        >
          {TextInputsArr.map(({ id, placeholder, regRules, error }) => (
            <AuthInput
              key={id}
              id={id}
              placeholder={placeholder}
              type={id === "password" ? "password" : "text"}
              {...register(id, regRules)}
              error={errors[id] && error}
            />
          ))}

          {isClient &&
            SelectInputsArr.map(
              ({ name, options, rules, error, placeholder }) => (
                <div className="flex w-full flex-col gap-1" key={name}>
                  <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={options}
                        placeholder={placeholder}
                        styles={AuthSelectCustomStyles}
                      />
                    )}
                  />
                  {error && (
                    <p className="text-xs text-red-500">
                      {errors[name] && error}
                    </p>
                  )}
                </div>
              ),
            )}

          <Link
            href={""}
            className="flex w-full justify-end text-base font-normal text-[#718096]"
          >
            Forgot password?
          </Link>

          <RoundedBtn type="submit" text="Login" className="mt-5" />
        </form>
        <p className="absolute bottom-[2.5%] text-sm font-normal text-[#72707D]">
          ©2024 Obafemi Awolowo University
        </p>
      </div>
    </AuthLayout>
  );
};
export default Login;
