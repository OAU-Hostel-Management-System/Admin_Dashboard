import { BsActivity } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaFile } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";
import { IoMdCard } from "react-icons/io";
import {
  IoBed,
  IoBedOutline,
  IoDocument,
  IoDocumentOutline,
  IoHome,
  IoHomeOutline,
  IoLogOut,
  IoLogOutOutline,
  IoPeople,
  IoPeopleOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";

export const AdminSideBarLinks = [
  {
    unselectedIcon: <IoHomeOutline />,
    selectedIcon: <IoHome />,
    label: "Home",
    route: "/dashboard/admin/home",
  },
  {
    unselectedIcon: <IoBedOutline />,
    selectedIcon: <IoBed />,
    label: "Bedspace Allocation",
    route: "/dashboard/admin/bedspace-allocation",
  },
  {
    unselectedIcon: <CiFileOn />,
    selectedIcon: <FaFile />,
    label: "Hall Records",
    route: "/dashboard/admin/hall-records",
  },
  {
    unselectedIcon: <IoPersonOutline />,
    selectedIcon: <IoPerson />,
    label: "Student Records",
    route: "/dashboard/admin/student-records",
  },
  {
    unselectedIcon: <IoPeopleOutline />,
    selectedIcon: <IoPeople />,
    label: "Admins",
    route: "/dashboard/admin/admins",
  },
  {
    unselectedIcon: <BsActivity />,
    selectedIcon: <FiActivity />,
    label: "Activity",
    route: "/dashboard/admin/activity",
  },
  {
    unselectedIcon: <IoLogOutOutline />,
    selectedIcon: <IoLogOut />,
    label: "Logout",
    route: "/login",
  },
];

export const StudentSideBarLinks = [
  {
    unselectedIcon: <IoHomeOutline />,
    selectedIcon: <IoHome />,
    label: "Home",
    route: "/dashboard/student/home",
  },
  {
    unselectedIcon: <IoBedOutline />,
    selectedIcon: <IoBed />,
    label: "Bedspace Allocation",
    route: "/dashboard/student/bedspace-allocation",
  },
  {
    unselectedIcon: <IoDocumentOutline />,
    selectedIcon: <IoDocument />,
    label: "Bedspace Report",
    route: "/dashboard/student/bedspace-reports",
  },
  {
    unselectedIcon: <IoMdCard className="bg-[#718096]" />,
    selectedIcon: <IoMdCard  />,
    label: "Payment",
    route: "/dashboard/student/payment",
  },
  // {
  //   unselectedIcon: <BsActivity />,
  //   selectedIcon: <FiActivity />,
  //   label: "Activity",
  //   route: "/dashboard/student/activity",
  // },
  {
    unselectedIcon: <IoLogOutOutline />,
    selectedIcon: <IoLogOut />,
    label: "Logout",
    route: "/login",
  },
];
