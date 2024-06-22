import { forwardRef } from "react";

interface AuthInputProps {
  placeholder: string;
  type?: string;
  id: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ placeholder, type = "text", id, error, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="flex h-[48px] w-full items-center justify-center rounded-md border border-[#A0AEC0] bg-white p-2 px-4 text-[#1A202C]"
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";
