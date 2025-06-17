"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CourseCardItem from './CourseCardItem';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
function CourseList(){
    
    const {user}=useUser()
    const [courseList,setCourseList]=useState([]);
    useEffect(()=>{
        user&&GetCourseList() 
    },[user])
    const GetCourseList=async()=>{
       
        const result =await axios.post('/api/courses',{createdBy:user?.primaryEmailAddress?.emailAddress})
        console.log(result.data)
        setCourseList(result.data.result)
        
    }
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl flex justify-between items-center'>Your study Material <Button onClick={GetCourseList} variant='outline'className='border-black text-blac cursor-pointer hover:bg-gray-200'><RefreshCw></RefreshCw> Refresh</Button></h2>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-col-3 mt-2 gap-5'>
                {courseList?.map((course,index)=>(
                    <CourseCardItem course={course} key={index}/>
                ))}
            </div>
        </div>
    )
} 
export default CourseList;