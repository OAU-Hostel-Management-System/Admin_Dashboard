import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProviderQueryclient } from "@/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin - OAU Hostel Management Portal",
  description: "Hostel Management Portal for Obafemi Awolowo University",
  icons: {
    icon: "/images/oau-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <ProviderQueryclient>{children}</ProviderQueryclient>
      </body>
    </html>
  );
}
