'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
function course() {
    const {courseId}=useParams();
    const [course,setCourse]=useState();
    useEffect(()=>{
        GetCourse()
    },[])
    const GetCourse=async()=>{
        const result=await axios.get('/api/courses?courseId='+courseId)
        console.log(result);
        setCourse(result.data.result);
    }
  return (
    <div>
      <DashboardHeader ></DashboardHeader>
    <div className='p-10 pt-20'>
        
        <div>
        {/* course Intro */}
        <CourseIntroCard course={course}/>
        {/* study Material Options */}
        <StudyMaterialSection course={course} courseId={courseId}></StudyMaterialSection>
          {/* chapter List */}
          <ChapterList course={course}></ChapterList>
        </div>
    </div>
    </div>
  )
}

export default course