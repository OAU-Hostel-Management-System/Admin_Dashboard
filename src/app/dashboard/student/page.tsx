import { AlwaysPushToWrapper, PageLoader } from "@/components";

const StudentDashboard = () => {
  return (
    <AlwaysPushToWrapper where="/dashboard/student/home">
      <PageLoader />
    </AlwaysPushToWrapper>
  );
};
export default StudentDashboard;
