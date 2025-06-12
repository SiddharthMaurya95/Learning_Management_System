import React from 'react'
import Sidebar from "./_components/Sidebar"
import DashboardHeader from "./_components/DashboardHeader"

function Dashboardlayout({children}) {
  return (
    <div>
        <div className='md:w-64 hidden md:block fixed'><Sidebar></Sidebar></div>
         <div className='md:ml-64'>
            <DashboardHeader></DashboardHeader>
        <div>{children}</div>
        </div>
    </div>
  )
}

export default Dashboardlayout