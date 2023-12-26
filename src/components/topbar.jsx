import React from 'react'
import Picture from './Ellipse 10.svg'
import Notification from './Vector.svg'

// function Topbar() {
//   return (
//     <div className = 'flex justify-between w-full mt-1 py-6 px-10 items-center border-4 bg-white'>
//         <h1 className = 'font-semibold'>
//             Custom Allocation
//         </h1> 
//         <div className = 'flex items-center gap-3  '>
//              <img src = {Notification} alt = "notification-logo" className = 'w-4' />
//              <img src = {Picture} alt = "pic-logo" className = 'w-6' />
//             <h2>admin@gmail.com</h2>
//         </div>
//     </div>
//   )
// }

// export default Topbar



import { useEffect, useState } from "react";
// import image from "./Image";
import { useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";

function Topbar() {
  const location = useLocation().pathname;

  const [currentPath, setCurrentPath] = useState("Home");

  useEffect(() => {
    setCurrentPath(location);
    switch (location) {
      case "/":
        setCurrentPath("Home");
        break;
      case "/hostel_records":
        setCurrentPath("Hostel Records");
        break;
      case "/custom":
        setCurrentPath("Custom Allocation");
        break;
      case "/student_records":
        setCurrentPath("Student Record");
        break;
      case "/system_log":
        setCurrentPath("System Log");
        break;
      default:
        setCurrentPath("Home");
        break;
    }
  }, [location]);

  return (
    <div className="fixed top-0 md:pl-[370px] left-0 right-0 mx-auto flex items-center md:px-10 py-3 sm:py-6 w-full bg-white shadow-lg box-border">
      <div className="w-11/12 md:w-full flex items-center gap-4">
        <div className="md:hidden relative z-50">
          <Hamburger size={25} />
        </div>
        <p className="text-lg font-semibold hidden md:block">{currentPath}</p>
        <p className="text-lg font-semibold md:hidden block">
          OAU Student's Hostel Portal
        </p>

{/*       
          // <div className="relative">
          //   <div
          //     className="absolute inset-y-0 left-0 flex
          //  items-center pl-3 pointer-events-none"
          //   >
          //     <svg
          //       className="w-4 h-4 text-gray-500
          //      dark:text-gray-400"
          //       aria-hidden="true"
          //       xmlns="http://www.w3.org/2000/svg"
          //       fill="none"
          //       viewBox="0 0 20 20"
          //     >
          //       <path
          //         stroke="currentColor"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //         stroke-width="2"
          //         d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          //       />
          //     </svg>
          //   </div>
          //   <input
          //     onChange={(evt) => {
          //       setList(listX);
          //       if (evt.target.value == "") {
          //         setList(listX);
          //       } else {
          //         const updatedList = studentList.filter((list) =>
          //           list.matricNo.includes(evt.target.value)
          //         );

          //         setList(updatedList);
          //       }
          //     }}
          //     type="search"
          //     id="search"
          //     name="search"
          //     className="block w-full p-4 pl-10 text-sm text-gray-900 border
          //  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
          //   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
          //    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
          //     dark:focus:border-blue-500"
          //     //  ref={inputRef}

          //     placeholder="Search students by matric..."
          //     required
          //   />
          // </div> */}

          
    
      </div>
    </div>
  );
}

export default Topbar;