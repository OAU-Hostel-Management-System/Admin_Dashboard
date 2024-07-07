import {
  AdminDashboardOverviewTable,
  HallOfResidenceDetails,
  HostelSelectDropdown,
} from "@/components";

const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-4">
      <HostelSelectDropdown />
      <HallOfResidenceDetails />
      <AdminDashboardOverviewTable />
    </div>
  );
};
export default DashboardHome;
