import React from 'react'
import Logosvg from './logosvg.svg'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../auth/authProvider'

const Login = () => {
 const [loginDetails, setLoginDetails ] = useState({ username : "", password : ""})
 const [errorMsg, setError ] = useState("")
 const { login } = useAuth();

 const url = "https://hmsbackend-c36l.onrender.com/auth/signin"

  const sendRequest = ()=>{
     axios.post(url, loginDetails)
     .then((res)=> {
      const authToken  = res.data.token
      login(authToken)
      sessionStorage.setItem('authToken', authToken);
      if(res.status ==  200 && res.success){
        console.log("the data", res)
      }
     })
   
  }

  return (
    // kindly implement the login page using tailwind or css if preferred
   
    <div className = 'flex'>
      <div className = 'bg-[#113885] border-black rounded-r-[5rem] w-1/2 h-screen flex flex-col justify-center items-center'>
         <img src={Logosvg}  alt="" className='w-80  p-8' />
         <p className = 'text-3xl text-white pb-6 font-bold'>Obafemi Awolowo University</p>
         <p className = 'text-2xl text-white font-bold'>Hostel Management Portal</p>
      </div>
      <div className = 'w-1/2 h-screen flex flex-col justify-center items-center'>
        <form className = 'flex flex-col items-center justify-center w-1/2'>
          <h1 className = 'font-bold text-3xl mb-24'>Login</h1>
          <input 
          onChange={(evt)=>{setLoginDetails({...loginDetails, username: evt.target.value})}}
          type="text"
           placeholder = 'Matric No/Admin ID' 
           className = 'mb-8 border-2 border-slate-300 rounded-lg w-full px-4 py-2 outline-blue-200'/>
          <input
           onChange={(evt)=>{setLoginDetails({...loginDetails, password: evt.target.value})}}
           type="password" placeholder = 'Password' className = 'mb-8 border-2 border-slate-300  rounded-lg w-full px-4 py-2 outline-blue-200' />
          
        </form>
        <button 
          onClick={sendRequest}
          className = 'text-white font-bold bg-[#113885]  w-1/2 py-2 rounded-lg'>
            Login
          </button>
          <span>{errorMsg}</span>
      </div>

    </div>
  )
}

export default Login