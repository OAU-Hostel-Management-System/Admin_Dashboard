// const Idcard = ({info})=>{
//     const fetchedUrl = 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
//     return (
//       <div className="w-screen transition duration-300 h-screen fixed top-0 left-0 z-20 bg-black bg-opacity-50

//       backdrop-filter backdrop-blur-sm ">

//          <div className="w-[550px] h-[350px]  overflow-hidden  bg-white
//         fixed top-48 z-20 rounded-xl right-72">
//             <div className="bg-green-600 text-black flex
//              rounded-t-xl text-center h-[70px]  px-5 py-3">
//             <div className="w-[150px] pt-2 bg-white rounded-lg border-2 h-[120px]">
//                <img src="./muri.png" alt="muritala muhammed" />
//             </div>
//                 <span className="font-semibold text-xl">OBAFEMI AWOLOWO UNIVERSITY, ILE IFE</span>
//             <div className="w-[150px] pt-2 bg-white rounded-lg h-[120px] border-2  ">
//                 <img src='./oau.svg'  alt="oau image" />
//             </div>
//             </div>
//             <div className="mt-1 border w-fit mx-auto text-center">
//                <span className="font-semibold"> MURITALA MUHAMMED </span> <br />
//                <p className="text-xs">Post Graduate Hall  <label htmlFor="" className="text-red-600">(Hall of Residence)</label></p>
//             </div>
//             <div className="mt-1 mx-auto w-fit border text-white p-1 bg-red-700">
//                 <div className="border border-white px-5 py-[2px]
//                 text-sm">IDENTIFICATION CARD
//                     </div></div>
//         <div className="border flex justify-center mt-2">
//         <div className="flex flex-col w-3/5 pl-10 gap-1 mr-10">
//             <span className="border border-green-500">
//                 <label htmlFor="" className="font-semibold  p-2 rounded-sm">Name</label>
//                 : {info.name}
//             </span>
//             <span className="border border-green-500">
//             <label htmlFor="" className="font-semibold  p-2 rounded-sm">Reg no</label>  : {info.matric}
//             </span>
//             <span className="border border-green-500">
//             <label htmlFor="" className="font-semibold  p-2 rounded-sm">Department</label>  : {info.department}
//             </span>
//             <span className="border border-green-500">
//             <label htmlFor="" className="font-semibold  p-2 rounded-sm">Gender</label>  : {info.gender}
//             </span>
//             <span className="border border-green-500">
//             <label htmlFor="" className="font-semibold  p-2 rounded-sm">Session</label>  : {info.session}
//             </span>
//             <span className="border border-green-500">
//             <label htmlFor="" className="font-semibold  p-2 rounded-sm">Room no</label>  : {info.bedspace}
//             </span>
//             </div>
//             <div  style={{'--image-url': `url(${fetchedUrl})`}}
//             className="h-[120px] w-[120px] border bg-[image:var(--image-url)] bg-cover bg-center">
//             </div>
//         </div>
//         <div className="bg-green-600 w-full h-5">
//        </div>
//        </div>

//       </div>
//     )
// }

// export default Idcard;

import React from "react";
// import image from "./Image";
import { Card, CardContent } from "./card.jsx";
import { cn } from "./utils";
import { useEffect } from "react";
import imgref from "./imgref.jsx";

const IdCard = ({ showId, setShowId, userDetails }) => {


  return (
    <Card className="fixed border bottom-0 right-0 left-0 m-auto flex items-center justify-center w-screen h-screen z-50 border-1 p-0 shadow-none bg-[rgba(0,0,0,.3)] backdrop-blur outline-none ">
      <CardContent className="p-0">
        <div className="w-[480px] py-2 px-2.5 bg-white shadow-md rounded-2xl scale-75 md:scale-100">
          <div className="w-full flex justify-between relative">
            <p
              onClick={() => {
                setShowId(false);
              }}
              className=" scale-125 md:scale-100 w-8 h-8 flex justify-center items-center font-semibold cursor-pointer text-white bg-black hover:bg-white hover:text-custom-blue absolute top-0 right-0 translate-x-[50%] translate-y-[-100%] z-50 rounded-full"
            >
              X
            </p>
            <div className=" h-[82px] bg-[#3EAC7E] -top-4 -left-2.5 mx-auto absolute z-10 rounded-t-2xl w-[480px]"></div>
            <img
              src={imgref.MuriImg}
              className="w-[90px] h-[90px] bg-white mt-2 ml-2 rounded-2xl z-[11] object-contain pt-4"
            />
            <div className="font-semibold">
              <h2 className=" text-xl font-black mt-2 text-center relative z-[11] uppercase">
                Obafemi Awolowo <br /> University, Ile-Ife
              </h2>
            </div>
            <img
              src={imgref.OauLogo}
              className="w-[90px] h-[90px] bg-white mt-2 mr-2 rounded-2xl z-[11] object-contain pt-2"
            />
          </div>
          <p className="text-center max-w-xs mx-auto font-bold -mt-6">
            {userDetails?.roomData?.hostel_name !== "PG" ? (
              <>
                <p className="uppercase">
                  {userDetails?.roomData?.hostel_name}
                </p>
                <p>(The hall of excellence)</p>
              </>
            ) : (
              <>
                <p>
                  MURITALA MUHAMMED <br /> Post Graduate Hall
                  <span className="text-sm text-[#FE3838]">
                    {" "}
                    (The hall of excellence)
                  </span>
                </p>
              </>
            )}
          </p>
          <div className="w-fit mx-auto bg-[#FE3838] p-1 mt-2 mb-4">
            <p className=" border-2 text-sm bg-[#FE3838] border-white px-6 py-1 w-fit mx-auto text-white">
              IDENTIFICATION CARD
            </p>
          </div>
          <div className="flex justify-between pb-4 px-4">
            <div className="border-2 border-[#18623E] w-[280px] rounded-xl overflow-hidden">
              <div className="border-b-2 border-black flex items-end gap-1.5">
                <p className=" font-semibold bg-[#18623E] text-white px-2 py-0.5 rounded-md ">
                  Name:
                </p>
                <p className="text-sm">{userDetails?.fullName}</p>
              </div>
              <div className="border-b-2 border-black flex items-end gap-1.5">
                <p className=" font-semibold bg-[#18623E] text-white px-2 py-0.5 rounded-md ">
                  Reg No:
                </p>
                <p className="text-sm">{userDetails?.matricNo}</p>
              </div>

              <div className="border-b-2 border-black flex items-end gap-1.5">
                <p className=" font-semibold bg-[#18623E] text-white px-2 py-0.5 rounded-md ">
                  Session:
                </p>
                <p className="text-sm">{userDetails?.session}</p>
              </div>
              <div className="border-b-2 border-black flex items-end gap-1.5">
                <p className=" font-semibold bg-[#18623E] text-white px-2 py-0.5 rounded-md ">
                  Department:
                </p>
                <p className="text-sm">{userDetails?.dept}</p>
              </div>
              <div className="border-b-2 border-black flex items-end gap-1.5">
                <p className=" font-semibold bg-[#18623E] text-white px-2 py-0.5 rounded-md ">
                  Room:
                </p>
                <p className="text-sm">
                  Block {userDetails?.roomData?.block}, Room{" "}
                  {userDetails?.roomData?.roomNo}, Bed{" "}
                  {userDetails?.roomData?.bedNo}
                </p>
              </div>
              <div className="flex items-end gap-1.5 relative">
                <p className=" font-semibold bg-[#18623E] text-white px-2 py-0.5 rounded-md ">
                  Signature:
                </p>
                <p className="text-sm"></p>
                <p className="px-1.5 pt-0.5 h-full bg-[#18623E] rounded-ee-lg  text-white absolute top-0 bottom-0 -right-0.5">
                  {/* {userDetails?.sex} */}
                  BNRS
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="border-2 border-[#18623E] h-full w-32 rounded-xl overflow-hidden">
                <img
                  src={userDetails?.image_url}
                  alt="student passport"
                  className=" h-full w-32 scale-110 object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdCard;
