'use client'
import React, { useState } from 'react'
import Sidebar from "./_components/Sidebar"
import Header from "./_components/Header"
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { X } from 'lucide-react'
function Dashboardlayout({children}) {
  const [totalCourses, setTotalCourses] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CourseCountContext.Provider value={{totalCourses, setTotalCourses}}>
      <div>
        {/* Mobile sidebar button */}
{!sidebarOpen && (
  <button
    className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
    onClick={() => setSidebarOpen(true)}
  >
    {/* Hamburger icon */}
    <span className="block w-6 h-0.5 bg-black mb-1"></span>
    <span className="block w-6 h-0.5 bg-black mb-1"></span>
    <span className="block w-6 h-0.5 bg-black"></span>
  </button>
)}

        {/* Sidebar for desktop */}
        <div className='md:w-64 hidden md:block fixed'><Sidebar /></div>

        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden" onClick={() => setSidebarOpen(false)}>
            <div
              className="w-64 bg-white h-full shadow-lg"
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside sidebar
            >
              <button className="p-2" onClick={() => setSidebarOpen(false)}>X Close</button>
              <Sidebar  />
            </div>
          </div>
        )}

        <div className="fixed top-0 left-0 w-full z-30">
  <Header />
</div>
<div className='md:ml-64'>
  <div className='p-10 pt-20'>{children}</div>
</div>
      </div>
    </CourseCountContext.Provider>
  )
}

export default Dashboardlayout