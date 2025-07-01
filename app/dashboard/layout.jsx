'use client'
import React from 'react'
import Sidebar from "./_components/Sidebar"
import Header from "./_components/Header"
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { useState } from 'react'
function Dashboardlayout({children}) {
  const [totalCourses, setTotalCourses] = useState(0);
  return (
   < CourseCountContext.Provider value={{totalCourses, setTotalCourses}}>
    <div>
        <div className='md:w-64 hidden md:block fixed'><Sidebar></Sidebar></div>
         <div className='md:ml-64'>
            <Header></Header>
        <div className='p-10'>{children}</div>
        </div>
    </div>
    </CourseCountContext.Provider>
  )
}

export default Dashboardlayout