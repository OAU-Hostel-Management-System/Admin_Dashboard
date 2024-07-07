import { AuthLayout } from "@/components";
import { LoginForm } from "./login-form";

const Login = () => {
  return (
    <AuthLayout>
      <div className="relative flex min-h-[calc(100vh-100px)] flex-col items-center justify-center bg-[#EDEDED] px-[5%] py-[5%]">
        <LoginForm />
        <p className="absolute bottom-[2.5%] text-sm font-normal text-[#72707D]">
          ©2024 Obafemi Awolowo University
        </p>
      </div>
    </AuthLayout>
  );
};
export default Login;
