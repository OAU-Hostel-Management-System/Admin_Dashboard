import React, { useEffect, useState } from "react";
import Idcard from "../../components/idCard";
import axios from "axios";
import Shimmer from "../../components/skeleton/shimer";
import ReactLoading from "react-loading";

let rawJson = [];

function Students() {
  const [studentList, setList] = useState(rawJson);
  const [showlist, setShow] = useState(false);
  const [idDetails, setIdDetaials] = useState({
    name: "",
    matric: "",
    gender: "",
    department: "",
    session: "",
  });
  const [visibility, setVisibility] = useState(false);
  const [userDetails, setUserDetails] = useState({});
    const [selectedMatricNo, setSelectedMatricNo] = useState(null);
  const [formerList, setFormerList ] =  useState([])


  useEffect(() => {
    const url = "https://hmsbackend-c36l.onrender.com/admin/studentRecord";
    const token = sessionStorage.getItem("authToken");
    const headers = {
      Authorization: `${token} `,
    };

    axios
      .get(url, { headers })
      .then((res) => {
        if (res.data.success) {
          let result = res.data.data;
          setList(result);
          setFormerList(result)
          setShow(true);
        }
      })
      .catch((err) => console.log("error ", err));
  }, [showlist]);

  // this is for the idCard details

  const token = sessionStorage.getItem("authToken");
  const headersID = {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (selectedMatricNo) {
    fetch(
      `https://hmsbackend-c36l.onrender.com/admin/fetchStudentInfo?matricNo=${selectedMatricNo}`,
      headersID
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("IDCARDO===>", data);
          let shawork = data?.data;
          console.log("ommomomom", selectedMatricNo);
          setUserDetails(shawork);
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
    }
  }, [selectedMatricNo]);


  return (
    <div className="lm-2">
      <section className="bg-white ml-2 pt-4 mr-2 rounded-lg ">
        <form className=" mx-auto w-5/6 mb-4">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div
              className="absolute inset-y-0 left-0 flex
         items-center pl-3 pointer-events-none"
            >
              <svg
                className="w-4 h-4 text-gray-500
             dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(evt) => {
                setList(formerList);
                if (evt.target.value === "") {
                  setList(formerList);
                } else {
                  const updatedList = formerList.filter((list) =>
                    list.matricNo.includes(evt.target.value)
                  );

                  setList(updatedList);
                }
              }}
              type="search"
              id="search"
              name="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border
         border-gray-300 rounded-lg focus:ring-blue-500
          focus:border-blue-500 outline-none"
              //  ref={inputRef}

              placeholder="Search students by matric..."
              required
            />
          </div>
        </form>

        {visibility ? (
          <svg
            onClick={() => setVisibility(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#fff"
            className="bi bi-x-circle top-44 fixed 
         right-[17rem] z-30 bg-black rounded-full cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        ) : (
          <></>
        )}
        {visibility && userDetails ? (
          <Idcard
            showId={visibility}
            setShowId={setVisibility}
            userDetails={userDetails}
          />
        ) : (
          <>
            <ReactLoading
              className=" z-[99999999] fixed w-screen h-screen backdrop-blur"
              type="spin"
              width={"25px"}
              height={"25px"}
            />
      
          </>
        )}
        <div className="mx-auto  w-5/6">
          <h5>Sort By :</h5>
          <div className="mt-3 flex gap-4">
            <div class="relative w-1/6 border-none">
              <select
                class=" 
         appearance-none border border-black bg-white inline-block py-3 pl-3 pr-8 
         rounded leading-tight w-full"
              >
                <option class="pt-6"> Hostels </option>
                <option>Angola Hall of Residence</option>
                <option>Awolowo Hall of Residence</option>
                <option>Moremi Hall of Residence</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
            <div class="relative w-1/6 border-none">
              <select
                class=" 
         appearance-none border border-black bg-white inline-block py-3 pl-3 pr-8 
         rounded leading-tight w-full"
              >
                <option class="pt-6">Blocks </option>
                <option value="1">Block 1</option>
                <option value="2">Block 2</option>
                <option value="3">Block 3</option>
                <option value="4">Block 4</option>
                <option value="5">Block 5</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
            <div class="relative w-1/6 border-none">
              <select
                class=" 
         appearance-none border border-black bg-white inline-block py-3 pl-3 pr-8 
         rounded leading-tight w-full"
              >
                <option class="pt-6"> Rooms </option>
                <option value="101">Room 101</option>
                <option value="102">Room 102</option>
                <option value="103">Room 103</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
            <button className="text-center bg-blue-900 text-white px-14 py-3 rounded-md">
              Filter
            </button>
          </div>
        </div>
        {showlist ? (
          <table className="h-10/12 mt-10 w-full">
            <thead className="text-center text-white bg-blue-900">
              <tr>
                <th className="px-10 py-4 border-b">Matric</th>
                <th className="px-10 py-3 border-b">Bedspace</th>
                <th className="px-10 py-3 border-b">Paid</th>
                <th className="px-10 py-3 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((data, index) => (
                <tr
                  key={index}
                  className="text-center border-b py-5 cursor-pointer hover:bg-gray-300"
                >
                  <td className=" py-3 ">{data.matricNo}</td>
                  <td className=" py-3 ">{data.bedspace}</td>
                  {data.users_paid ? (
                    <td className=" py-3 text-green-600">Paid</td>
                  ) : (
                    <td className=" py-3 text-red-600">False</td>
                  )}
                  <td className=" py-3 ">
                    <svg
                      onClick={() => {
                        setSelectedMatricNo(data.matricNo);
                        setVisibility(true);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-info-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Shimmer />
        )}
      </section>
    </div>
  );
}

export default Students;
