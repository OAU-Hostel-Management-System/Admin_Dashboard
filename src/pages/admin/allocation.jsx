import React, { useState, useEffect } from 'react'
import Topbar from '../../components/topbar'
import ReactLoading from "react-loading";
import axios from 'axios'
import { clear } from '@testing-library/user-event/dist/clear';

let hostelDetails ={ hostel_name : "", block : "", roomNo : 0, bedNo : 0, matricNo : ""}

function Allocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [hostel, setHostel] = useState({ hostel_name : "", hostel_block : "", room : ""})
  const [showlist, setShow ]=  useState(false)
  const [student, setStudent ]=  useState({ name : "", dept : ""})
  const [hall, setHall ] =useState([])
  const [allocationBody, setAllocation ] =  useState({
    myHostel : [], blocks : [], myRooms : [], mybed : []
  })
  const [updated, setUpdated ] = useState({ matric : "", programme : "", bed : "",  Hostel : "", Block : "", room : ""})
 
  const [success, setSuccess ] = useState(false) 
  const [warn, setWarn ] = useState(false)
  const [warnMsg, setWarnMsg ] = useState("")

  const seive = []
  

  const hostelsUrl = 'https://hmsbackend-c36l.onrender.com/admin/getAvailableHostels'
  const token = sessionStorage.getItem("authToken")
  const headers = {
    "Authorization" : `${token} `,
    "Access-Control-Allow-Origin" : "https://hmsbackend-c36l.onrender.com",
    'Content-Type': 'application/json'
    }

    const handleAllocation = (event) =>{
      event.preventDefault()
      setIsLoading(true)
        axios.post('https://hmsbackend-c36l.onrender.com/admin/allocate',hostelDetails,  {headers})
        .then( (res) => {
          if(res.data.success){
            const info = res.data.data
            setUpdated({...updated, matric : info.matricNo, Hostel : info.hostel_name, programme : info.programType, 
            room : info.roomNo , Block : info.block, bed : info.bedNo})
            setSuccess(true)
          }})
        .catch( (err) => {
          const details = err.response.data
          setWarnMsg(details.message)
          setWarn(true)})
     }

  const  getStudent = (evt) =>{      
    const detail = evt.target.value;
    if(detail.length > 11) {
      hostelDetails.matricNo = detail
    const url = `https://hmsbackend-c36l.onrender.com/admin/getStudentInfoAllocate?matricNo=${detail}`
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

   const clearInfo = () =>{
    hostelDetails = { hostel_name : "", block : "", roomNo : 0, bedNo : 0, matricNo : ""}
    setAllocation({...allocationBody,  blocks : [], myRooms : [], mybed : []
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
    <div className="bg-[#EBEBEB] h-full ">
      {/* <Topbar /> */}
      <form className=" border-4 bg-white   p-14 rounded-lg">
        <div className="grid grid-cols-2">
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Matric No</label>
            <input
              type="text"
              placeholder="CSC/2018/419"
              onChange={(evt) => getStudent(evt)}
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3 outline-blue-200"
           
            />
          </div>
          {/* <div className = 'flex flex-col text-left gap-1'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder = 'omoldonTire@gmail.com' className = 'mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200' readOnly/>
          </div> */}
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={student.name}
              placeholder="Umoh Samuel Godwin"
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200"
              readOnly
            />
          </div>
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Department</label>
            <input
              type="text"
              value={student.dept}
              placeholder="Computer with Mathematics"
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200"
              readOnly
            />
          </div>
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Hostel</label>
            <select
                  onChange={(evt) => {
                    setHostel({...hostel, hostel_name : evt.target.value})
                    hostelDetails.hostel_name = evt.target.value;
                    const endpoint = `https://hmsbackend-c36l.onrender.com/admin/getHostelBlocks?hostel_name=${evt.target.value}`
                   axios.get(endpoint, {headers})
                    .then( (res) =>{
                      if(res.status === 200){
                            setAllocation({...allocationBody, blocks : res.data.data.blocks})
                      }
              
                    })
                    .catch((err )=> console.log("the err ", err))
                  }}
              name="hostel"
              id="hostel"
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200"
            >
              {hall.map((hal, index) => (
                <option key={index} value={hal}>
                  {hal}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Block</label>
            <select
              onChange={(evt) => {
                setHostel({...hostel, hostel_block : evt.target.value})
                hostelDetails.block = evt.target.value;
                const endpoint = `https://hmsbackend-c36l.onrender.com/admin/getBlockRooms?hostel_name=${hostel.hostel_name}&block=${evt.target.value}`
                axios.get(endpoint, {headers})
                .then( (res) =>{
                  if(res.status === 200){
                        setAllocation({...allocationBody, myRooms : res.data.data.rooms})
                  }
          
                })
                .catch((err )=> console.log("the err ", err))
              }}
              name="block"
              id="block"
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200"
            >
              <option value="">Select block</option>
              {allocationBody['blocks'].map((block) => (
                <option value={block}>{block}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Room</label>
            <select onChange={(evt) => {
                setHostel({...hostel, room : evt.target.value})
                hostelDetails.roomNo =parseInt(evt.target.value);
                const endpoint =  `https://hmsbackend-c36l.onrender.com/admin/getRoomSpace?hostel_name=${hostel.hostel_name}&block=${hostel.hostel_block}&roomNo=${evt.target.value}`
                axios.get(endpoint, {headers})
                .then( (res) =>{
                  if(res.status === 200){
                        setAllocation({...allocationBody, mybed : res.data.data.bedspaces})
                  }
          
                })
                .catch((err )=> console.log("the err ", err))
            }}
              name="room"
              id="room"
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200"
            >
              <option value="">Select block</option>
              {allocationBody['myRooms'].map((room) => (
                <option value={room}>{room}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-left gap-1">
            <label htmlFor="">Bedspace</label>
            <select      onChange={(evt) => {
              setHostel({...hostel, Stdbed : evt.target.value})
               hostelDetails['bedNo'] = parseInt(evt.target.value)
            }}
              name="bedspace"
              id="bedspace"
              className="mb-4 border border-slate-400 rounded-sm w-2/3 p-3  outline-blue-200"
            >
             {allocationBody['mybed'].map( bed =>  <option value={bed}>{bed}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={(evt) => handleAllocation(evt)} 
          className="bg-[#113885] rounded-lg text-center text-white text-lg px-16 py-2">
           {!isLoading ? (
            "Allocate"
          ) : (
            <ReactLoading type="spin" width={"25px"} height={"25px"} />
          )}
          </button>
        </div>
      </form>
      {success ?
      <div className='w-full fixed top-0 backdrop-blur-sm bg-opacity-25 h-full bg-black z-40'>
        
       <div className="w-[20rem] px-5 pt-10 rounded-xl border h-[20rem] fixed z-20 top-52 right-[25rem] bg-white shadow-md">
      <span className='flex gap-3'><svg xmlns="http://www.w3.org/2000/svg" width="75" height="70" fill="green" classNae="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>  <p className='font-bold text-xl mt-2'>Successfull Allocated!</p></span>
 <div className='flex flex-wrap gap-2 mt-5 ml-2'>
 <span><label  htmlFor="">Matric No :</label> {updated.matric}</span>
 <span><label htmlFor="">Programme Type :</label> {updated.programme}  </span>
 <span><label htmlFor="">Hostel :</label> {updated.Hostel} </span>
  <span><label htmlFor="">Block:</label> {updated.Block} </span>
  <span><label htmlFor="">Room :</label>  {updated.room}</span>
  <span><label htmlFor="">Bed no :</label> {updated.bed} </span>
    <button onClick={()=>{
      clearInfo()
      setIsLoading(false)
        setSuccess(false)}} className=' bg-red-800 text-white px-12 mt-3 py-1 rounded-sm mx-auto'>close</button>
 </div> </div>
      </div> : <></>}
      {warn ?
       <div className='w-full fixed top-0 backdrop-blur-sm bg-opacity-25 h-full bg-black z-40'>
        <div className="w-[20rem] px-5 pt-10 rounded-xl border h-[20rem] fixed z-20 top-52 right-[40rem] bg-white shadow-md">
       <span className='flex flex-col  gap-3'>
       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="orangered" className="bi bi-cone-striped ml-20" viewBox="0 0 16 16">
   <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"/>
 </svg>
   <p className=' text-lg mt-2 text-center'>{warnMsg}</p></span>
  <div className='flex flex-wrap gap-2 mt-5 ml-2'>
 
     <button onClick={()=>{
      clearInfo()
      setWarn(false); setIsLoading(false)}} className=' bg-red-800 text-white px-12 mt-3 py-1 rounded-sm mx-auto'>close</button>
  </div>
       </div>
       </div> : <></>}
    </div>
  );
}

export default Allocation