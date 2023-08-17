import React from 'react'
import Logosvg from './logosvg.svg'


const Login = () => {



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
          <input type="text" placeholder = 'Matric No/Admin ID' className = 'mb-8 border-2 border-slate-300 rounded-lg w-full px-4 py-2 outline-blue-200'/>
          <input type="password" placeholder = 'Password' className = 'mb-8 border-2 border-slate-300  rounded-lg w-full px-4 py-2 outline-blue-200' />
          <button className = 'text-white font-bold bg-[#113885] w-full p-2 rounded-lg'>
            Login
          </button>
        </form>
      </div>

    </div>
  )
}

export default Login