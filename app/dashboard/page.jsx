import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
function page() {
  return (
    <div>
     <WelcomeBanner/>
     <CourseList></CourseList>
    </div>
  )
}

export default page