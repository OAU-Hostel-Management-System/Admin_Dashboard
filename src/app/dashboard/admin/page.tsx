import { AlwaysPushToWrapper, PageLoader } from "@/components";

const Admin = () => {
  return (
    <AlwaysPushToWrapper where="/dashboard/admin/home">
      <PageLoader />
    </AlwaysPushToWrapper>
  );
};
export default Admin;
