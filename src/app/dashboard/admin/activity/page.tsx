"use client";

import { DashboardSelectCustomStyles } from "@/lib";
import Image from "next/image";
import Select from "react-select";
import {
  parse,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

const AdminDashboardActivity = () => {
  const groupedActivities = groupActivitiesByDate(dummyData);

  const groups = Object.entries(groupedActivities);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1A202C]">Activity</h1>
        <div className="flex items-center gap-3">
          <span className="text-lg font-normal text-[#4A5568]">by:</span>
          <div className="min-w-[200px]">
            <Select
              options={SortAdminActivityOptions}
              placeholder="Select a user type"
              styles={DashboardSelectCustomStyles}
            />
          </div>
        </div>
      </div>

      {groups.map(([key, activities], idx) => (
        <div key={key} className="my-6">
          <h2 className="mb-2 text-lg font-normal text-[#718096]">{key}</h2>
          <div className="rounded-2xl border border-solid border-[#CBD5E0]">
            {activities.map((activity, i) => (
              <div key={activity.id}>
                <ActivityItem {...activity} />
                {i < activities.length - 1 && (
                  <hr className="my-2 h-[1.5px] w-full bg-[#EDF2F7]" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default AdminDashboardActivity;

const SortAdminActivityOptions = [
  { value: "all", label: "All" },
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
];

const parseDateTime = (dateStr: string, timeStr: string) => {
  const dateTimeStr = `${dateStr} ${timeStr}`;
  return parse(dateTimeStr, "dd/MM/yyyy hh:mma", new Date());
};

const getTimeDistanceToNow = (dateStr: string, timeStr: string) => {
  const date = parseDateTime(dateStr, timeStr);
  return formatDistanceToNow(date, { addSuffix: true });
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const groupActivitiesByDate = (activities: ActivityItemType[]) => {
  const today: ActivityItemType[] = [];
  const yesterday: ActivityItemType[] = [];
  const lastWeek: ActivityItemType[] = [];
  const lastMonth: ActivityItemType[] = [];

  activities.forEach((activity) => {
    const activityDate = parseDateTime(activity.date, activity.time);

    if (isToday(activityDate)) {
      today.push(activity);
    } else if (isYesterday(activityDate)) {
      yesterday.push(activity);
    } else if (differenceInDays(new Date(), activityDate) <= 7) {
      lastWeek.push(activity);
    } else if (differenceInWeeks(new Date(), activityDate) <= 4) {
      lastMonth.push(activity);
    }
  });

  return {
    Today: today,
    Yesterday: yesterday,
    "Last Week": lastWeek,
    "Last Month": lastMonth,
  };
};

const ActivityItem = ({
  name,
  date,
  time,
  activity,
  imgUrl,
}: {
  name: string;
  date: string;
  time: string;
  activity: string;
  imgUrl: string;
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-[18px]">
      <div className="flex gap-6">
        <Image
          src={imgUrl}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
          alt="img"
        />
        <div className="flex flex-col justify-between gap-1">
          <h2 className="text-lg font-normal text-[#4A5568]">{activity}</h2>
          <p className="text-sm font-normal text-[#718096]">
            {capitalizeFirstLetter(getTimeDistanceToNow(date, time))}
          </p>
        </div>
      </div>
      <div>
        <p className="text-base font-normal text-[#718096]">
          by <span>{name}</span>
        </p>
      </div>
    </div>
  );
};

type ActivityItemType = {
  id: number;
  name: string;
  date: string;
  time: string;
  activity: string;
  imgUrl: string;
};

type GroupedActivities = {
  [key: string]: ActivityItemType[];
};

const dummyData: ActivityItemType[] = [
  {
    id: 1,
    name: "Okoroafor D Cjigo",
    date: "14/07/2024",
    time: "3:00PM",
    activity: "Bedspace assigned: CSC/2018/113",
    imgUrl: "/images/default-avatar-profile.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    date: "15/07/2024",
    time: "9:00AM",
    activity: "Lecture scheduled: CSC/2018/114",
    imgUrl: "/images/default-avatar-profile.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    date: "13/07/2024",
    time: "1:00PM",
    activity: "Seminar organized: CSC/2018/115",
    imgUrl: "/images/default-avatar-profile.jpg",
  },
  {
    id: 4,
    name: "Alice Johnson",
    date: "10/07/2024",
    time: "10:00AM",
    activity: "Lab session: CSC/2018/116",
    imgUrl: "/images/default-avatar-profile.jpg",
  },
  {
    id: 5,
    name: "Bob Brown",
    date: "05/07/2024",
    time: "11:00AM",
    activity: "Exam preparation: CSC/2018/117",
    imgUrl: "/images/default-avatar-profile.jpg",
  },
];
