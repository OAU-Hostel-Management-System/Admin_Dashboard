import React from 'react'
import Picture from './Ellipse 10.svg'
import Notification from './Vector.svg'

function Topbar() {
  return (
    <div className = 'flex justify-between w-full mt-1 py-6 px-10 items-center border-4 bg-white'>
        <h1 className = 'font-semibold'>
            Custom Allocation
        </h1> 
        <div className = 'flex items-center gap-3  '>
             <img src = {Notification} alt = "notification-logo" className = 'w-4' />
             <img src = {Picture} alt = "pic-logo" className = 'w-6' />
            <h2>admin@gmail.com</h2>
        </div>
    </div>
  )
}

export default Topbar