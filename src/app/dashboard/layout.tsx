import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar, Sidebar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard - OAU Hostel Management Portal",
  description: "Hostel Management Portal for Obafemi Awolowo University",
  icons: {
    icon: "/images/oau-logo.webp",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className="flex h-[calc(100vh-100px)] overflow-hidden border-t-2 border-[#CBD5E0]">
        <div className="min-h-full w-[280px] overflow-y-scroll px-5 pb-4 pt-8">
          <Sidebar />
        </div>
        <div className="min-h-full w-[calc(100vw-280px)] overflow-y-scroll border-l-2 border-[#CBD5E0] p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
