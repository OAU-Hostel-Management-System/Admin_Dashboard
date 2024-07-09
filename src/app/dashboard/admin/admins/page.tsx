import { AdminItem, ColorBorderAndTextBtn, RoundedBtn } from "@/components";
import { AdminDDArr } from "@/lib";
import { FaPlus } from "react-icons/fa6";

const DashboardAdmins = () => {
  return (
    <div>
      <div>
        <div className="my-4 flex items-center justify-between bg-white">
          <h1 className="text-xl font-bold text-[#1A202C]">Administrators</h1>
          <ColorBorderAndTextBtn
            text="Edit"
            color="#3182CE"
            className="w-fit px-[26px]"
            link={true}
            linkHref={`/dashboard/admin/admins/edit/administrator/${`CSC/2018/113`}`}
          />
        </div>

        <AdminItem
          firstName="Okoroafor"
          lastName="Cjigo"
          staffID="CSC/2018/113"
          role="Dean DSA"
          hostel="Administrator"
        />
      </div>

      <div>
        <div className="my-4 flex items-center justify-between bg-white">
          <h1 className="text-xl font-bold text-[#1A202C]">Standard Users</h1>
          <RoundedBtn
            text={
              <span className="flex items-center gap-3">
                New <FaPlus className="text-white" size={12} />
              </span>
            }
            className="w-fit px-[26px]"
          />
        </div>
        <div className="space-y-[14px]">
          {AdminDDArr.map((item) => (
            <div
              key={item.staffID}
              className="rounded-2xl border border-solid border-[#00000029] shadow-md drop-shadow-md"
            >
              <AdminItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DashboardAdmins;
