"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useContext } from 'react'
import { RefreshCw } from 'lucide-react'
import CourseCardItem from '../_components/CourseCardItem'
function Explore() {
    
    const {user}=useUser()
    const [courseList,setCourseList]=useState([]);
    useEffect(()=>{
        user&&GetCourseList() 
    },[user])
    const GetCourseList=async()=>{
       
        const result =await axios.post('/api/courses?courseId=0',{createdBy:user?.primaryEmailAddress?.emailAddress})
        console.log(result.data)
        setCourseList(result.data.result)
    }
  return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl flex justify-between items-center'>Explore More Courses <Button onClick={GetCourseList} variant='outline'className='border-black text-black cursor-pointer hover:bg-gray-200'><RefreshCw></RefreshCw> Refresh</Button></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 mt-2 gap-5'>
                {courseList?.map((course,index)=>(
                    <CourseCardItem course={course} key={index}/>
                ))}
            </div>
        </div>
  )
}

export default Explore
