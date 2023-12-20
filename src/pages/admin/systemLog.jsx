import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const SystemLog = () => {
  const url = `https://hmsbackend-c36l.onrender.com/admin/getlog`;

  const [isLoading, setIsLoading] = useState(true);
  const [systemLog, setSystemLog] = useState();
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [dateInterval, setDateInterval] = useState({
    endDate: "",
    startDate: ""
  });

  //   const handleChange = e => {
  //     // setDateInterval({e.target.name })
  //     setDateInterval({
  //       ...dateInterval,
  //       [e.target.name]: e.target.value
  //     });
  //   };

  const fetchLog = async () => {
    setIsLoading("loading");
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token} `
        }
      });
      if (response?.status === 200) {
        console.log(response);
        setSystemLog(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const formatShortDate = inputDate => {
    const date = new Date(inputDate);

    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      timeZone: "UTC"
    };

    return date.toLocaleString("en-US", options);
  };

  const formatDate = inputDate => {
    const date = new Date(inputDate);

    const options = {
      //   weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC"
    };

    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    fetchLog();
  }, []);

  const handleFilter = e => {
    e.preventDefault();
    console.log(startDateRef.current.value);
    console.log(endDateRef.current.value);
    setDateInterval({
      startDate: startDateRef.current.value || "",
      endDate: endDateRef.current.value || ""
    });
  };

  return (
    <div className="min-h-screen bg-white h-full mx-auto self-center py-10 mt-2">
      <div className="w-11/12 mx-auto space-y-4 flex flex-col ">
        <div className="h-fit">
          <h1 className=" font-medium text-xl">Activity Log</h1>
          <p className="text-[#949494]">
            Please select a date range to generate the activity log
          </p>
          <div className="mt-3 w-full flex justify-between sm:justify-end">
            <form
              method="post"
              className="w-fit flex justify-between items-end gap-3">
              <div className="w-1/3 sm:w-[145px] flex flex-col text-left gap-1 ">
                <label className=" text-[#949494]" htmlFor="">
                  Start
                </label>
                <input
                  type="date"
                  name="startDate"
                  ref={startDateRef}
                //   value={dateInterval.startDate}
                  placeholder="start date"
                  className="border border-slate-400 rounded-sm px-3 py-2 "
                />
              </div>
              <div className="w-1/3 sm:w-[145px] flex flex-col text-left gap-1 ">
                <label className=" text-[#949494]" htmlFor="">
                  Stop
                </label>
                <input
                  type="date"
                  name="endDate"
                  ref={endDateRef}
                //   value={dateInterval.endDate}
                  placeholder="start date"
                  className="border border-slate-400 rounded-sm px-3 py-2 "
                />
              </div>
              <button
                onClick={handleFilter}
                className="bg-[#113885] rounded-lg text-center text-white text-lg px-6 py-2 hover:bg-[#949494] transition-all duration-300">
                Filter
              </button>
            </form>
          </div>
        </div>

        <div
          className={`min-h-[400px] p-4 bg-[#f9f9f9] border ${
            isLoading && "flex justify-center items-center"
          }`}>
          <div>
            {/* <div>[{formatDate("2023-11-25T03:10:43.000Z")}]:</div> */}
          </div>
          {isLoading ? (
            <p className="text-[#949494]">Please wait...</p>
          ) : systemLog ? (
            // systemLog
            <div>
              {systemLog
                .filter(item =>
                  dateInterval.startDate === "" && dateInterval.endDate === ""
                    ? item
                    : dateInterval.startDate !== "" &&
                      dateInterval.endDate === ""
                    ? formatShortDate(item.updatedAt) >=
                        formatShortDate(dateInterval.startDate) && item
                    : dateInterval.startDate === "" &&
                      dateInterval.endDate !== ""
                    ? formatShortDate(item.updatedAt) <=
                        formatShortDate(dateInterval.endDate) && item
                    : formatShortDate(item.updatedAt) >=
                        formatShortDate(dateInterval.startDate) &&
                      formatShortDate(item.updatedAt) <=
                        formatShortDate(dateInterval.endDate) &&
                      item
                )
                .map((log, id) => (
                  <div key={id} className="flex flex-row gap-2">
                    <p className=" whitespace-nowrap">
                      [{formatDate(log?.updatedAt)}]:
                    </p>{" "}
                    <p className="">
                      {log?.admin} - {log?.action} at {log?.hostel}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-[400px] border flex justify-center items-center">
              <p className="text-[#949494]">No data found!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLog;
