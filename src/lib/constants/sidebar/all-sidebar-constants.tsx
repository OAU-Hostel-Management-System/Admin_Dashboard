import { BsActivity } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaFile } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";
import {
  IoBed,
  IoBedOutline,
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
