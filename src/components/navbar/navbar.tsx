import { ImgWrapper } from "../common";

export const Navbar = () => {
  return (
    <nav className="flex h-[100px] w-full items-center justify-center bg-white px-[5%] py-[10px]">
      <div className="flex h-full items-center justify-center gap-3 text-sm font-bold text-[#1A202C] lg:gap-5 lg:text-xl">
        <div className="flex h-full">
          <ImgWrapper
            alt="img"
            src="/images/oau-logo.webp"
            className="h-full w-auto"
          />
        </div>
        <div className="flex h-full flex-col justify-between py-1">
          <h1 className="text-lg lg:text-3xl">Obafemi Awolowo University</h1>
          <p>Hostel Management Portal</p>
        </div>
      </div>
    </nav>
  );
};
