import React, { useState, useEffect } from 'react'
import Topbar from '../../components/topbar'
import axios from 'axios'

function Allocation() {
  const [hostel, setHostel] = useState({ hostel_name : "", hostel_block : "", room : ""})
  const [showlist, setShow ]=  useState(false)
  const [student, setStudent ]=  useState({ name : "", dept : ""})
  const [hall, setHall ] =useState([])
  const seive = []
  const [blocks, setBlocks ] = useState([])
  const [rooms, setRooms ] = useState([])

  const hostelsUrl = 'https://hmsbackend-c36l.onrender.com/admin/getAvailableHostels'
  const blocksUrl = `https://hmsbackend-c36l.onrender.com/admin/getHostelBlocks?hostel_name=${hostel.hostel_name}`
  const roomUrl = `https://hmsbackend-c36l.onrender.com/admin/getBlockRooms?hostel_name=${hostel.hostel_name}&block=${hostel.hostel_block}`
  const bedspaceUrl = `https://hmsbackend-c36l.onrender.com/admin/getRoomSpace?hostel_name=${hostel.hostel_name}&block=${hostel.hostel_block}&roomNo=${hostel.room}`
 
 const  getStudent = (evt) =>{      
  const detail = evt.target.value;
  if(detail.length > 11) {
  const url = `https://hmsbackend-c36l.onrender.com/admin/fetchStudentInfo?matricNo=${detail}`
  const token = sessionStorage.getItem("authToken")
  const headers = {
  "Authorization" : `${token} `
  }
  
    axios.get(url,{headers})
    .then( (res) => {
      if(res.data.success ){
        let list = res.data.data;
        setStudent({...student, name: list.fullName, dept : list.dept })
        setShow(true )
      } 
    
      })
    .catch(err => console.log("error ", err))
  }
 }
 const getblocks = (evt) =>{
  const listed  = []
     const hostel = evt.target.value;
     setHostel({...hostel, hostel_name : hostel})
     const token = sessionStorage.getItem("authToken")
const headers = {
"Authorization" : `${token} `
}
     axios.get(blocksUrl, {headers})
     .then( (res) => {
      const details = res.data.data.blocks;
      details.map( detail =>{
          if(!listed.includes(detail)){
            listed.push(detail)
          }
      })
      setBlocks(listed)
    })
 }
 const getRooms = (evt) =>{
  const listed  = []
     const hostelx = evt.target.value;
     setHostel({...hostel, hostel_block : hostelx})
     console.log("hostel", hostelx)
     const token = sessionStorage.getItem("authToken")
const headers = {
"Authorization" : `${token} `
}
     axios.get(roomUrl, {headers})
     .then( (res) => {
      const details = res.data.data.rooms;
      console.log("details", details)

      details.map( detail =>{
          if(!listed.includes(detail)){
            listed.push(detail)
          }
      })
      console.log("rooms, listed", listed)
      setRooms(listed)
    })
 }
  useEffect(()=>{
  
const token = sessionStorage.getItem("authToken")
const headers = {
"Authorization" : `${token} `
}

  axios.get(hostelsUrl,{headers})
  .then( (res) => {
    if(res.data.success ){
      let list = res.data.data;
        list.hostels.map( host => {
          if(!seive.includes(host)){
            seive.push(host)
          }
          setHall(seive)
        })
   
      setShow(true )
    } 
  
    })
  .catch(err => console.log("error ", err))
}, [showlist])
  return (
    <div className = 'bg-[#EBEBEB] h-full'>
        <Topbar />
        <form className = ' border-4 bg-white grid grid-cols-2  p-14 ' >
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Matric No</label>
            <input type="text" placeholder = 'CSC/2018/419' 
            onChange={(evt)=>getStudent(evt)} 
            className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3 outline-blue-200'/>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder = 'omoldonTire@gmail.com' className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200' readOnly/>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Name</label>
            <input type="text"  value={student.name} placeholder = 'Umoh Samuel Godwin' className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'readOnly/>
          </div>
           <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Department</label>
            <input type="text" value={student.dept} placeholder = 'Computer with Mathematics' 
            className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200' readOnly/>
          </div>
           <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Hostel</label>
            <select onChange={(evt) => getblocks(evt)} name="hostel" id="hostel" className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
            
                {hall.map((hal)=>  <option value={hal}>{hal}</option> )}
            </select>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Block</label>
            <select  onChange={(evt) => getRooms(evt)}
             name="block" id="block" className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
               <option value="">Select block</option>
                {blocks.map( block => <option value={block}>{block}</option>)}
            </select>
          </div>
          <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Room</label>
            <select
            name="room" id="room"
             className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200'>
            <option value="">Select block</option>
             { rooms.map(room =>  <option value={room}>{room}</option>)}
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