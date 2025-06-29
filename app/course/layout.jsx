import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'
function CourseViewLayout({children}) {
  return (
    <div>
        <DashboardHeader></DashboardHeader>
      <div  className='mx-w-full md:mx-36 lg:px-60 mt-10'>
        {children}
      </div>
    </div>
  )
}

export default CourseViewLayout
