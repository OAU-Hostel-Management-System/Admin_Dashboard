import { BedSpaceInfoContainer } from "@/components/students/bedspaceInfocontainer";
import { PersonalInfoContainer } from "@/components/students/personalinfocontainer";

const DashboardHome = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      <PersonalInfoContainer />
      <BedSpaceInfoContainer />
    </div>
  );
};
export default DashboardHome;
