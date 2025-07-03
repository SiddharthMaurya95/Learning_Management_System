'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
function CourseViewLayout({children}) {
  const route=useRouter()
  return (
      <div  className='mx-w-full md:mx-36 lg:px-60'>
        {children}
      </div>
  )
}

export default CourseViewLayout
