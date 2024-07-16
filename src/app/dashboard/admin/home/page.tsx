"use client";

import {
  AdminDashboardOverviewTable,
  HallOfResidenceDetails,
  HostelSelectDropdown,
} from "@/components";
import axios from "axios";
import { useEffect } from "react";
//@ts-ignore
import Cookies from "js-cookie";
//@ts-ignore
import cookie from "cookie";

const DashboardHome = () => {
  useEffect(() => {
    // Function to get the value of a specific cookie
    const getCookieValue = (name: string) => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    // Get the value of 'connect.sid' cookie
    const sessionCookie = getCookieValue("connect.sid");
    console.log("Session ID222222222:", sessionCookie);
    // const sessionCookie = Cookies.get("connect.sid");
    console.log("Session ID:", sessionCookie);

    const cookies = cookie.serialize("connect.sid", sessionCookie, {
      httpOnly: true,
      // secure: true,
      sameSite: "None", // Allows cross-site cookies
    });

    try {
      const res = axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/admin/dashboard?hall=AWO`,
        {
          withCredentials: true,
          headers: {
            Cookie: cookies,
          },
        },
      );

      res.then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <HostelSelectDropdown />
      <HallOfResidenceDetails />
      <AdminDashboardOverviewTable />
    </div>
  );
};
export default DashboardHome;
