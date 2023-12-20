import React from "react";
import { Card, CardContent } from "./card.jsx";
import imgref from "./imgref.jsx";

const IdCard = ({ showId, setShowId, userDetails }) => {
  return (
    <Card className="fixed bottom-0 right-0 left-0 m-auto flex items-center justify-center w-screen h-screen z-50 border-1 p-0 shadow-none bg-[rgba(0,0,0,.3)] backdrop-blur outline-none ">
      <CardContent className="p-0 ">
        <div
          className={`w-[470px] shadow-md rounded-2xl scale-75 md:scale-100 pb-4 ${
            userDetails?.room?.hostel_name === "Awo"
              ? "bg-[#6FCDE1]"
              : "Mozambique"
              ? "bg-[#EDA3C8]"
              : "PG"
              ? "bg-[#3EAC7E]"
              : "Angola"
              ? "bg-[#505661]"
              : "Etf"
              ? "bg-[#FF0000]"
              : "Alumni"
              ? "bg-[#574569]"
              : "Akintola"
              ? "bg-[#695A45]"
              : "Moremi"
              ? "bg-[#7E3BE3]"
              : "Fajuyi"
              ? "bg-[#08BFBC]"
              : "bg-black"
          }`}>
          <div
            className={`w-full flex justify-between relative gap-4 items-center p-2 $`}>
            <p
              onClick={() => {
                setShowId(false);
              }}
              className="px-2.5 scale-125 md:scale-100 py-1 font-bold cursor-pointer text-white bg-black hover:bg-white hover:text-black absolute my-auto right-8 z-50 rounded-full">
              X
            </p>
            <img
              src={imgref.svgLogo}
              className="w-[80px] h-[80px] rounded-2xl z-[11] object-contain "
            />
            <div className="font-medium text-center -space-y-0.5">
              <p className="uppercase font-bold text-[22px]">
                {userDetails?.room?.hostel_name === "PG"
                  ? "Post Graduate"
                  : "Awo"
                  ? "AWOLOWO"
                  : ""}{" "}
                Hall
              </p>
              <p className="font-semibold mt-2 text-center relative z-[11] uppercase leading-tight">
                Obafemi Awolowo University Ile-Ife
              </p>
            </div>
            <img
              src={imgref.svgLogo}
              className="w-[80px] h-[80px] bg-white rounded-2xl z-[11] object-contain border invisible"
            />
          </div>
          <div className="bg-white pt-1 px-1">
            <div className="w-fit mx-auto bg-black p-1 mt-2 mb-3">
              <p className=" border-2 text-sm bg-black border-white px-6 py-1 w-fit mx-auto text-white">
                IDENTIFICATION CARD
              </p>
            </div>
            <div className="flex justify-between items-start pb-2 px-4">
              <div>
                <div className="h-fit border-2 border-black w-[280px] rounded-xl overflow-clip">
                  <div className="border-b-2 border-black flex items-end flex-nowrap gap-1.5 ">
                    <p className=" font-semibold bg-black text-white px-2 py-0.5 ">
                      Name:
                    </p>
                    <p className="text-sm whitespace-nowrap text-ellipsis w-[203px] overflow-hidden ">
                      {userDetails?.fullName}{" "}
                    </p>
                  </div>
                  <div className="border-b-2 border-black flex items-end gap-1.5">
                    <p className=" font-semibold bg-black text-white px-2 py-0.5 ">
                      Reg No:
                    </p>
                    <p className="text-sm">{userDetails?.matricNo}</p>
                  </div>

                  <div className="border-b-2 border-black flex items-end gap-1.5">
                    <p className=" font-semibold bg-black text-white px-2 py-0.5 ">
                      Session:
                    </p>
                    <p className="text-sm">{userDetails?.session}</p>
                  </div>
                  <div className="border-b-2 border-black flex items-end gap-1.5">
                    <p className=" font-semibold bg-black text-white px-2 py-0.5 ">
                      Department:
                    </p>
                    <p className="text-sm">{userDetails?.dept}</p>
                  </div>
                  <div className="flex items-end gap-1.5 relative">
                    <p className=" font-semibold bg-black text-white px-2 py-0.5 ">
                      Room:
                    </p>
                    <p className="text-sm">
                      Block {userDetails?.room?.block}, Room{" "}
                      {userDetails?.room?.roomNo}
                    </p>
                    <p className="px-1.5 pt-0.5 h-full bg-black rounded-ee-lg  text-white absolute top-0 bottom-0 -right-0.5">
                      {userDetails?.sex}
                    </p>
                  </div>
                </div>
                <p className="mt-7 pt-0.5 border-t-2 border-black w-full text-center font-semibold">
                  Signature
                </p>
              </div>
              <div className="">
                <div className="border-2 border-black w-32 h-[152px] rounded-xl overflow-hidden">
                  <img
                    src={userDetails?.image_url}
                    alt="student passport"
                    className=" h-full w-32 scale-110 object-cover object-center"
                  />
                </div>
                <p className="mt-7 pt-0.5 border-t-2 border-black w-full text-center font-semibold">
                  Hall Warden
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdCard;
