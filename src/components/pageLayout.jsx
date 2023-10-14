import React, { useState } from 'react'
import Navbar from './navbar';
import Topbar from './topbar';

function PageLayout({ children }) {
    // const [showSideBar, setShowSideBar] = useState(false)
  return (
    <div className="min-w-[100vw] flex">
      <div className=" hidden md:block md:w-[25%] z-[10] ">
        <Navbar />
      </div>
      {/* <div className="block hidden w-full z-50 ">
        <Navbar />
      </div> */}
      <div className=" flex flex-col w-full px-2 md:w-[80%] relative">
        <Topbar />
        <div className=' mt-[5rem]'>{children}</div>
      </div>
    </div>
  );
}

export default PageLayout