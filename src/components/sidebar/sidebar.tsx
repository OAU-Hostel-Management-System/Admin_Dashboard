"use client";

import { AdminSideBarLinks } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex min-h-full flex-col justify-between">
      <ul className="space-y-10">
        {AdminSideBarLinks.map((sidebarItem) => (
          <li key={sidebarItem.label} className="flex items-center gap-4">
            <Link
              href={sidebarItem.route}
              className={`flex items-center gap-[18px] text-lg font-normal ${
                pathname === sidebarItem.route
                  ? "text-[#1A202C]"
                  : "text-[#718096]"
              }`}
              onClick={() => {
                sidebarItem.route === "/login" &&
                  console.log("You are logging out");
                alert("You are logging out");
              }}
            >
              {pathname.startsWith(sidebarItem.route)
                ? sidebarItem.selectedIcon
                : sidebarItem.unselectedIcon}
              <span>{sidebarItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex w-full flex-col items-center justify-end text-sm font-normal text-[#72707D]">
        <p>©2024</p>
        <p>Obafemi Awolowo University</p>
      </div>
    </div>
  );
};
