'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
function course() {
    const {courseId}=useParams();
    useEffect(()=>{
        GetCourse()
    },[])
    const GetCourse=async()=>{
        const result=await axios.get('/api/courses?courseId='+courseId)
        console.log(result);
    }
  return (
    <div>
        <DashboardHeader></DashboardHeader>
    </div>
  )
}

export default course