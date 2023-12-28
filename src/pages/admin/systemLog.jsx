import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const SystemLog = () => {
  const pageRef = useRef(1);

  const [isLoading, setIsLoading] = useState(true);
  const [systemLog, setSystemLog] = useState([]);
  const [error, setError] = useState(true);
  const spinnerRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSpinnerRefShowing, setIsSpinnerRefShowing] = useState(false);

  const [dateInterval, setDateInterval] = useState({
    endDate: "",
    startDate: ""
  });

  const fetchLog = async (page = pageRef.current, isFetchingForFirstTime) => {
    isFetchingForFirstTime && setIsLoading("loading");
    setError("");
    let url;
    if (dateInterval.startDate !== "" && dateInterval.endDate !== "") {
      url = `https://hmsbackend-c36l.onrender.com/admin/getlog?page=${page}&startDate=${dateInterval.startDate.replace(
        /-/g,
        "/"
      )}&endDate=${dateInterval.endDate.replace(/-/g, "/")}`;
    } else if (dateInterval.startDate !== "" && dateInterval.endDate === "") {
      url = `https://hmsbackend-c36l.onrender.com/admin/getlog?page=${page}&startDate=${dateInterval.startDate.replace(
        /-/g,
        "/"
      )}`;
    } else if (dateInterval.startDate === "" && dateInterval.endDate !== "") {
      url = `https://hmsbackend-c36l.onrender.com/admin/getlog?page=${page}&endDate=${dateInterval.endDate.replace(
        /-/g,
        "/"
      )}`;
    } else {
      url = `https://hmsbackend-c36l.onrender.com/admin/getlog?page=${page}`;
    }
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token} `
        }
      });
      if (response?.status === 200) {
        console.log(response.data.data.length);
        if (response.data.data.length === 0) {
          setHasMore(false);
        } else {
          setSystemLog(systemLog => {
            const newData = [...systemLog, ...response.data.data];
            return newData
          });
        }
        isFetchingForFirstTime && setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError("");
      isFetchingForFirstTime && setIsLoading(false);
    }
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
    fetchLog(1, true);
  }, []);

  const handleFilter = e => {
    e.preventDefault();
    fetchLog(1, true);
  };

  useEffect(() => {
    const ref = spinnerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        setIsIntersecting(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 1 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [isSpinnerRefShowing]); 

  useEffect(() => {
    if (isIntersecting) {
      fetchLog(pageRef.current + 1, false);
      pageRef.current = pageRef.current + 1;
    }
  }, [isIntersecting]);

  return (
    <div className="min-h-screen bg-white h-full mx-auto self-center py-10 mt-[1px]">
      <div className="w-11/12 mx-auto space-y-4 flex flex-col ">
        <div className="h-fit">
          <h1 className=" font-medium text-xl">Activity Log</h1>
          <p className="text-[#949494]">
            Please select a date range to generate the activity log
          </p>
          <div className="mt-3 w-full flex justify-between sm:justify-end mb-3">
            <form className="w-fit flex justify-between items-end gap-3">
              <div className="w-1/3 sm:w-[145px] flex flex-col text-left gap-1 ">
                <label className=" text-[#949494]" htmlFor="">
                  Start
                </label>
                <input
                  type="date"
                  name="startDate"
                  onChange={evt => {
                    setDateInterval({
                      ...dateInterval,
                      startDate: evt.target.value
                    });
                  }}
                  value={dateInterval.startDate}
                  placeholder="start date"
                  className="border border-slate-400 rounded-md px-3 py-2 "
                />
              </div>
              <div className="w-1/3 sm:w-[145px] flex flex-col text-left gap-1 ">
                <label className=" text-[#949494]" htmlFor="">
                  Stop
                </label>
                <input
                  type="date"
                  name="endDate"
                  onChange={evt => {
                    setDateInterval({
                      ...dateInterval,
                      endDate: evt.target.value
                    });
                  }}
                  value={dateInterval.endDate}
                  placeholder="start date"
                  className="border border-slate-400 rounded-md px-3 py-2 "
                />
              </div>
              <button
                onClick={handleFilter}
                className="bg-[#113885] rounded-md text-center text-white text-lg px-6 py-2 hover:bg-[#949494] transition-all duration-300">
                Filter
              </button>
            </form>
          </div>
        </div>

        <div
          className={`min-h-[400px] mt-5 p-4 bg-[#f9f9f9] rounded-md border space-y-2 ${
            error ||
            (!isLoading &&
              systemLog.length === 0 &&
              "flex justify-center items-center gap-4")
          }`}>
          <div>
            {/* <div>[{formatDate("2023-11-25T03:10:43.000Z")}]:</div> */}
          </div>
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex flex-row items-start gap-2">
                <p className=" whitespace-nowrap text-[#949494] bg-[#949494] animate-pulse">
                  [Date of update]:
                </p>{" "}
                <div className="w-full space-y-1">
                  <div className="bg-[#949494] w-full h-4 animate-pulse"></div>
                  <div className="bg-[#949494] w-full h-4 animate-pulse"></div>
                </div>
              </div>
            ))
          ) : (
            <div>
              {error ? (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="text-[#949494] w-full text-center">
                    Something went wrong please try again later!
                  </p>
                </div>
              ) : systemLog.length === 0 ? (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="text-[#949494] w-full text-center">
                    No data found!
                  </p>
                </div>
              ) : (
                systemLog.map((log, id) => (
                  <div key={id} className="flex flex-row gap-2">
                    <p className=" whitespace-nowrap">
                      [{formatDate(log?.updatedAt)}]:
                    </p>{" "}
                    <p className="">
                      {log?.admin} - {log?.action} at {log?.hostel}
                    </p>
                  </div>
                ))
              )}
              {hasMore && (
                <div
                  ref={el => {
                    spinnerRef.current = el;
                    setIsSpinnerRefShowing(prev => !prev);
                  }}
                  className="w-full text-center flex justify-center gap-2 items-center text-[#949494] my-2 font-medium">
                  <ClipLoader size={24} color="#949494" />
                  <p>Fetching Log... </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLog;
