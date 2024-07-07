import { TbLoader3 } from "react-icons/tb";

export const PageLoader = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <TbLoader3 className="animate-spin text-[#3182CE]" size={100} />
    </div>
  );
};
