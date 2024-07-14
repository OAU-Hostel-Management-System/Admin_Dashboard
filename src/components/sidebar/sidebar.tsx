"use client";

import { useIsClient } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = ({
  sidebarItems,
}: {
  sidebarItems: {
    unselectedIcon: JSX.Element;
    selectedIcon: JSX.Element;
    label: string;
    route: string;
  }[];
}) => {
  const pathname = usePathname();
  const isClient = useIsClient();

  return (
    <div className="flex min-h-full flex-col justify-between">
      <ul className="space-y-10">
        {isClient &&
          sidebarItems.map((sidebarItem) => (
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
                    localStorage.removeItem("user_type");
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
