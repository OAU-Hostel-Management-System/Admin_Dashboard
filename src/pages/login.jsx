import React from 'react'
import Logosvg from './logosvg.svg'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../auth/authProvider'
import ReactLoading from "react-loading";
// import { useNavigate } from 'react-router-dom'

const Login = () => {
  
 const [loginDetails, setLoginDetails ] = useState({ username : "", password : ""})
 const [errorMsg, setError ] = useState("")
 const { login } = useAuth();
 const [isLoading, setIsLoading] = useState(false);
//  const navigate = useNavigate();

 const url = "https://hmsbackend-c36l.onrender.com/auth/signin"

  const sendRequest = ()=>{
    setIsLoading(true);
     axios
       .post(url, loginDetails)
       .then((res) => {
         const authToken = res.data.token;
         login(authToken);
         sessionStorage.setItem("authToken", authToken);
         if (res.status === 200 && res.success) {
           console.log("the data", res);
           setIsLoading(false);

         }
       })
       .catch((error) => {
         if (error.response) {

           console.error("Response Error:", error.response.data.message);
           console.error("Status Code:", error.response.status);
           setError(error.response.data.message);
           setIsLoading(false);
         } else if (error.request) {
           console.error("Request Error:", error.request);
           setError(error.request);
           setIsLoading(false);

         } else {
           console.error("General Error:", error.message);
           setError(error.message);
           setIsLoading(false);

         }
       });
   
  }

  return (
    // kindly implement the login page using tailwind or css if preferred

    <div className="flex relative">
      <div className="bg-[#113885] border-black rounded-r-[5rem] w-1/2 h-screen hidden md:flex flex-col justify-center items-center text-center">
        <img src={Logosvg} alt="" className="w-80  p-8" />
        <p className="text-3xl text-white pb-6 font-bold">
          Obafemi Awolowo University
        </p>
        <p className="text-2xl text-white font-bold">
          Hostel Management Portal
        </p>
      </div>
      <div className="bg-[#113885] border-black rounded-b-full w-full h-[30%] absolute md:hidden flex flex-col justify-center items-center">
        <img src={Logosvg} alt="" className=" w-[5rem]" />
        <p className="text-lg text-white font-bold pb-8">
          Hostel Management Portal
        </p>
      </div>

      <div className="w-full  mt-[2rem] md:mt-0 md:w-1/2 h-screen flex flex-col justify-center items-center">
        <form className="flex flex-col items-center justify-center w-full px-[5%] md:px-0 md:w-1/2">
          <h1 className=" hidden md:block font-bold text-3xl mb-24">Login</h1>
          <input
            onChange={(evt) => {
              setLoginDetails({ ...loginDetails, username: evt.target.value });
            }}
            type="text"
            placeholder="Matric No/Admin ID"
            className="mb-8 border-2 border-slate-300 rounded-lg w-full px-4 py-2 outline-blue-200"
          />
          <input
            onChange={(evt) => {
              setLoginDetails({ ...loginDetails, password: evt.target.value });
            }}
            type="password"
            placeholder="Password"
            className="mb-8 border-2 border-slate-300  rounded-lg w-full px-4 py-2 outline-blue-200"
          />
        </form>
        <button
          onClick={sendRequest}
          className="text-white font-bold bg-[#113885]  w-1/2 py-2 rounded-lg flex justify-center items-center"
        >
          {!isLoading ? (
            "Login"
          ) : (
            <ReactLoading type="spin" width={"25px"} height={"25px"} />
          )}
        </button>
        <span className=" mt-4  text-red-500 font-medium text-sm">
          {errorMsg}
        </span>
      </div>
    </div>
  );
}

export default Login