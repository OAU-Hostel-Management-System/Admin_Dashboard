

const Idcard = ({info})=>{
    const fetchedUrl = 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    return (
      <div className="w-screen transition duration-300 h-screen fixed top-0 left-0 z-20 bg-black bg-opacity-50

      backdrop-filter backdrop-blur-sm ">
         
         <div className="w-[550px] h-[350px]  overflow-hidden  bg-white
        fixed top-48 z-20 rounded-xl right-72">
            <div className="bg-green-600 text-black flex 
             rounded-t-xl text-center h-[70px]  px-5 py-3">
            <div className="w-[150px] pt-2 bg-white rounded-lg border-2 h-[120px]">
               <img src="./muri.png" alt="muritala muhammed" />
            </div>
                <span className="font-semibold text-xl">OBAFEMI AWOLOWO UNIVERSITY, ILE IFE</span>
            <div className="w-[150px] pt-2 bg-white rounded-lg h-[120px] border-2  ">
                <img src='./oau.svg'  alt="oau image" />
            </div>
            </div>
            <div className="mt-1 border w-fit mx-auto text-center">
               <span className="font-semibold"> MURITALA MUHAMMED </span> <br />
               <p className="text-xs">Post Graduate Hall  <label htmlFor="" className="text-red-600">(Hall of Residence)</label></p>
            </div>
            <div className="mt-1 mx-auto w-fit border text-white p-1 bg-red-700">
                <div className="border border-white px-5 py-[2px]
                text-sm">IDENTIFICATION CARD
                    </div></div>
        <div className="border flex justify-center mt-2">
        <div className="flex flex-col w-3/5 pl-10 gap-1 mr-10">
            <span className="border border-green-500">
                <label htmlFor="" className="font-semibold  p-2 rounded-sm">Name</label> 
                : {info.name}
            </span>
            <span className="border border-green-500">
            <label htmlFor="" className="font-semibold  p-2 rounded-sm">Reg no</label>  : {info.matric}
            </span>
            <span className="border border-green-500">
            <label htmlFor="" className="font-semibold  p-2 rounded-sm">Department</label>  : {info.department} 
            </span>
            <span className="border border-green-500">
            <label htmlFor="" className="font-semibold  p-2 rounded-sm">Gender</label>  : {info.gender} 
            </span>
            <span className="border border-green-500">
            <label htmlFor="" className="font-semibold  p-2 rounded-sm">Session</label>  : {info.session} 
            </span>
            <span className="border border-green-500">
            <label htmlFor="" className="font-semibold  p-2 rounded-sm">Room no</label>  : {info.bedspace}
            </span>
            </div>
            <div  style={{'--image-url': `url(${fetchedUrl})`}}  
            className="h-[120px] w-[120px] border bg-[image:var(--image-url)] bg-cover bg-center">
            </div>
        </div>
        <div className="bg-green-600 w-full h-5">
       </div>
       </div>
     
      </div>
    )
}

export default Idcard;