import axios from "axios";
import React, { useState, useEffect } from "react";
import Shimmer from "../../components/skeleton/shimer";
import ReactLoading from "react-loading";



let hostlist =[]
const Updatedlist = {
  updates : []
}


function Hostels() {
  const [checkbox, setCheckBox] = useState(false);
  const [filter, setFilter] = useState({
    block: "",
    roomNo: "",
    hostel_name: "Awo",
  });
  const [showlist, setShow] = useState(false);
  const [hostelList, setHostel] = useState([]);
  const [warn, setWarn ] = useState(false)
  const [ warnMsg , setWarnmsg ] = useState("")
  const [isLoading, setIsLoading ] = useState(false)



  const handleSelect = (e) =>{
    const selectedOption = e.target.options[e.target.selectedIndex];
    const status = e.target.value;
    const  infoData = JSON.parse(selectedOption.getAttribute("data-info"));
    Updatedlist['updates'].push({room_id : 10, status : status})
  }

  const token = sessionStorage.getItem("authToken")
  const headers = {
    "Authorization" : `${token} `,
    "Access-Control-Allow-Origin" : "https://hmsbackend-c36l.onrender.com",
    'Content-Type': 'application/json'
    }
  const sendUpdates = () =>{
    setIsLoading(true)
    axios.put('https://hmsbackend-c36l.onrender.com/admin/updateRoomStatus',Updatedlist,  {headers})
    .then( (res) => {
      if(res.data.success){
        const info = res.data
        setWarnmsg(info.message)
        setWarn(true)
      }
    })
    .catch( (err) => {
      const details = err.response.data
  }  )
}

  const filterList = (url, headers) => {
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.data.success) {
          const list = res.data.data;
          setHostel(list);
          console.log(list);
          setShow(true);
        }
      })
      .catch((err) => console.log("the error ", url, err));
  };
  useEffect(() => {
    const url =
      filter.roomNo.length > 1
       ? `https://hmsbackend-c36l.onrender.com/admin/getHostelRecord?&hostel_name=${filter.hostel_name}&block=${filter.block}&roomNo=${filter.roomNo}`
        : "https://hmsbackend-c36l.onrender.com/admin/getHostelRecord";
    const token = sessionStorage.getItem("authToken");
    const headers = {
      Authorization: `${token} `,
    };
    if (filter.roomNo.length > 1 && showlist) {
      filterList(url, headers);
    } else {
      axios
        .get(url, { headers })
        .then((res) => {
          if (res.data.success) {
            let list = res.data.data;
            setHostel(list);
            setShow(true);
            console.log("=====>", list);
          }
        })
        .catch((err) => console.log("error ", err));
    }
  }, [showlist]);
  // const handleCheck = (e) => {
  //   console.log("the list1", changeList);
  //   let checkedValue = e.target.checked;
  //   if (checkedValue) {
  //     changeList.push(e.target.value);
  //     console.log("the list", changeList);
  //   }
  // };

  // daddy 
  //  function onIntersection(entries) {
  //    const firstEntry = entries[0];
  //    if (firstEntry.isIntersecting && hasMore) {
  //      fetchMoreItems();
  //    }
  //  }

  //  useEffect(() => {
  //    // BigSam
  //    const observer = new IntersectionObserver(onIntersection);
  //    if (observer && elementRef.current) {
  //      observer.observe(elementRef.current);
  //    }

  //    // cleanup ftn
  //    return () => {
  //      if (observer) {
  //        observer.disconnect();
  //      }
  //    };
  //  }, [hostelList]);

  return (
    <div className="lm-2 ">
      {/* <div className=" flex justify-between  bg-white m-2 py-5  px-4">
        <span className=" text-blue-800 text-xl ">Hostels Record</span>
        <div className="flex gap-3  -mt-1 mr-10">
          <span className="my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </span>
          <img
            className="h-8 w-8 rounded-full mt-2"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <span className="my-auto">example@email.com</span>
        </div>
      </div> */}
      {/* <div className="w-full md:ml-[350px] relative md:bg-[#EBEBEB] lmin-h-screen md:p-4 flex flex-col scroll-smooth"> */}

      {/* <Topbar /> */}
      {/* </div> */}

      <section className="bg-white lml-2 pt-4 lmr-2 rounded-lg">
        {checkbox ? (
          <></>
        ) : (
          <span className='ml-auto w-fit'  onClick={()=>{setCheckBox(true)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22"
           height="22" fill="currentColor"
            className="bi bi-pencil-square ml-auto mr-10 cursor-pointer" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
          </span> 
        )}
        {checkbox ? (
       <span className='ml-auto flex gap-2 w-fit' onClick={()=>{setCheckBox(false); setFilter('')}}>
        {
       !isLoading ? 
       <button onClick={()=>sendUpdates()} className='px-10 py-1 bg-blue-600 text-white'>Update</button>
        :    <ReactLoading type="spin" width={"25px"} height={"25px"} />
       }
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
          class="bi bi-x ml-auto mr-10 cursor-pointer" viewBox="0 0 16 16">
   <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
 </svg> 
 </span>
        ) : (
          <></>
        )}

        <div className="mx-auto  w-5/6">
          <h5>Sort By :</h5>
          <div className="mt-3 flex gap-4">
            <div class="relative w-1/6 border-none">
              <select
                onChange={(evt) => {
                  setFilter({ ...filter, hostel_name: evt.target.value });
                }}
                class=" 
         appearance-none border border-black bg-white inline-block py-3 pl-3 pr-8 
         rounded leading-tight w-full"
              >
                <option class="pt-6"> Hostels </option>
                <option>Angola Hall of Residence</option>
                <option value="Awo">Awolowo Hall of Residence</option>
                <option>Moremi Hall of Residence</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
            <div class="relative w-1/6 border-none">
              <select
                onChange={(evt) => {
                  setFilter({ ...filter, block: evt.target.value });
                }}
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
                onChange={(evt) => {
                  setFilter({ ...filter, roomNo: evt.target.value });
                }}
                class="appearance-none border border-black bg-white inline-block py-3 pl-3 pr-8 
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
            <button
              onClick={() => {
                setShow(false);
              }}
              className="text-center bg-blue-900 max-h-12 text-white px-14 py-3 rounded-md"
            >
              Filter
            </button>
          </div>
        </div>
        {showlist ? (
          <table className="h-10/12 mt-10 w-full">
            <thead className="text-center text-white bg-blue-900">
          
              <th className="px-10 py-4 border-b">Hostel</th>
              <th className="px-10 py-4 border-b">Blocks</th>
              <th className="px-10 py-3 border-b">Rooms</th>
              <th className="px-10 py-3 border-b">Bedpsace</th>
              <th className="px-10 py-3 border-b">Allocated</th>
              {checkbox ? (
                <th className="px-10 py-4 border-b">Action</th>
              ) : (
                <></>
              )}
            </thead>
            <tbody>
              {hostelList.map((data, index) => (
                <tr
                  key={index}
                  className="text-center border-b py-5 cursor-pointer hover:bg-gray-300"
                >
                  {/* {checkbox ? (
                    <td>
                      <input
                        type="checkbox"
                        id="mycheckbox"
                        onChange={handleCheck}
                        name={data.Room}
                        value={data.Room}
                      />
                    </td>
                  ) : (
                    <></>
                  )} */}
                  <td className=" py-3 ">{data.hostel_name}</td>
                  <td className=" py-3 ">{data.block}</td>
                  <td className=" py-3 ">{data.roomNo}</td>
                  <td className=" py-3 ">{data.bedNo}</td>
                  <td className=" py-3 ">
                    {data.allocated ? "True" : "False"}
                  </td>
                  {checkbox ? (
                    <td className=" py-3">
                      <select onChange={(evt) => {handleSelect(evt)}}>
                        <option value="Available"  data-info={JSON.stringify(data)}>Available</option>
                        <option value="Occupied"   data-info={JSON.stringify(data)}>Occupied</option>
                        <option  value="Faulty"  data-info={JSON.stringify(data)}>Faulty</option>
                        <option value="Reserved"  data-info={JSON.stringify(data)}>Reserved</option>
                      </select>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Shimmer />
        )}
      </section>
      {warn ?
       <div className='w-full fixed top-0 backdrop-blur-sm bg-opacity-25 h-full bg-black z-40'>
        <div className="w-[20rem] px-5 pt-10 rounded-xl border h-[20rem] fixed z-20 top-52 right-[40rem] bg-white shadow-md">
       <span className='flex flex-col  gap-3'>
       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check2-all ml-20" viewBox="0 0 16 16">
  <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
  <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
</svg>
   <p className=' text-lg mt-2 text-center'>{warnMsg}</p></span>
  <div className='flex flex-wrap gap-2 mt-5 ml-2'>
 
     <button onClick={()=>{
      setIsLoading(false)
      setWarn(false)}} className=' bg-blue-900 text-white px-12 mt-3 py-1 rounded-sm mx-auto'>close</button>
  </div>
       </div>
       </div> : <></>}
    </div>
  );
}

export default Hostels;
