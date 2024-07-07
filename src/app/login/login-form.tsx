"use client";

import { AuthInput, RoundedBtn } from "@/components";
import { useIsClient } from "@/hooks";
import { AuthSelectCustomStyles, SelectInputsArr, TextInputsArr } from "@/lib";
import { AuthInputs } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { encryptToken } from "@/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const mutation = useMutation({
    mutationFn: (data: {
      username: string;
      password: string;
      session: string;
    }) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/login`, data);
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    const UserData = {
      username: data.matricNoOrStaffID,
      password: data.password,
      session: data.session.value,
    };

    console.log("Hello", UserData);

    try {
      const res = await mutation.mutateAsync(UserData);

      if (res.data.success === true) {
        const token = res?.data?.d?.token;
        const encryptedToken = encryptToken(token);
        const user_type = res?.data?.d?.user_type;

        localStorage.setItem("token", encryptedToken);
        localStorage.setItem("user_type", user_type);
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        if (res.data.msg) {
          toast.error(res.data.msg);
        }
      }

      // console.log("success", res.data);
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  const isClient = useIsClient();

  return (
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
        SelectInputsArr.map(({ name, options, rules, error, placeholder }) => (
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
              <p className="text-xs text-red-500">{errors[name] && error}</p>
            )}
          </div>
        ))}

      <Link
        href={""}
        className="flex w-full justify-end text-base font-normal text-[#718096]"
      >
        Forgot password?
      </Link>

      <RoundedBtn
        type="submit"
        text={
          mutation.isPending ? (
            <AiOutlineLoading3Quarters className="animate-spin text-white" />
          ) : (
            "Login"
          )
        }
        className="mt-5"
      />
    </form>
  );
};
