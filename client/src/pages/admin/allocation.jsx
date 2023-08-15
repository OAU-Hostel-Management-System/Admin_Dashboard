import React from 'react'
import Topbar from '../../components/topbar'

function Allocation() {
  return (
    <div className = 'bg-[#EBEBEB] h-full'>
        <Topbar />
        <form className = ' border-4 bg-white grid grid-cols-2  p-14 ' >
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Matric No</label>
            <input type="text" placeholder = 'CSC/2018/419' className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'/>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder = 'omoldonTire@gmail.com' className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'/>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Name</label>
            <input type="text" placeholder = 'Umoh Samuel Godwin' className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'/>
          </div>
           <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Department</label>
            <input type="text" placeholder = 'Computer with Mathematics' 
            className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'/>
          </div>
           <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Hostel</label>
            <select name="hostel" id="hostel" className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
              <option value="Angola Hall">Angola Hall of Residence</option>
              <option value="Fajuyi Hall">Fajuyi Hall of Residence</option>
              <option value="Mozambique Hall"> Awo Hall of Residence</option>
              <option value="Mozambique Hall"> ETF Hall of Residence</option>
              <option value="Mozambique Hall"> Akintola Hall of Residence</option>
              <option value="Mozambique Hall"> Moremi Hall of Residence</option>
              <option value="Mozambique Hall"> Mozambique Hall of Residence</option>
            </select>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Block</label>
            <select name="block" id="block" className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3"> 3</option>
              <option value="4"> 4</option>
            </select>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Room</label>
            <select name="room" id="room" className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3"> 3</option>
              <option value="4"> 4</option>
            </select>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Bedspace</label>
            <select name="bedspace" id="bedspace" className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3"> 3</option>
              <option value="4"> 4</option>
            </select>
          </div>
        
            <button className = 'bg-[#113885] border rounded-lg text-center text-white text-lg px-16 ml-auto py-2'>Allocate</button>
          
        
        </form>
      
    </div>
    
  )
}

export default Allocation