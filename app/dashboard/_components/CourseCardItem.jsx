"use client"
import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { FaEllipsisVertical } from "react-icons/fa6";
import Dropdown from './Dropdown'
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/configs/db'
import { useEffect } from 'react'
export default function CourseCardItem({course,refreshData}) {
   useEffect(() => {
  if (course?.status !== "Generating") return;

  const interval = setInterval(() => {
    refreshData();
  }, 1000);

  return () => clearInterval(interval);
}, [course?.status, refreshData]);
  const handleOnDelete=async()=>{ 
    const resp1=await db.delete(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId)).returning({id:STUDY_MATERIAL_TABLE.courseId})
    const resp2=await db.delete(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId,course?.courseId)).returning({id:CHAPTER_NOTES_TABLE.courseId})
    const resp3=await db.delete(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId,course?.courseId)).returning({id:STUDY_TYPE_CONTENT_TABLE.courseId})

    if(resp1&&resp2&&resp3){
      refreshData();
    }
  }
  return (
    <div className='primaryBorder rounded-lg shadow-md p-5  hover:scale-105 transition-all hover:border-b-green-950'>
        <div>
            <div className='flex justify-between items-center'>
                <Image src={'/knowledge.png'} alt='other' width={50} height={50}></Image>
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-green-900 text-white'>{course?.courseLayout?.creationDate}</h2>
            </div>
            <div className='flex justify-between items-center mt-3'>
            <h2 className=' font-medium text-lg'>{course?.courseLayout?.course_title}</h2>
           
           <Dropdown handleOnDelete={()=>handleOnDelete()}> < FaEllipsisVertical /> </Dropdown></div>
            <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.summary}</p>
            <div>
                <Progress className='w-full bg-slate-500' value={33} />
            </div>
            <div className='mt-3 flex justify-end'>
              {course?.status=='Generating'?<h2 className='text-sm p-1 px-2 rounded-full bg-gray-400 text-white flex gap-2 items-center'> <RefreshCw className='h-5 w-5 animate-spin'/>Generating...</h2>:<Link href={'/course/'+course?.courseId}><Button className='bg-green-500 text-white cursor-pointer hover:bg-slate-300' >View</Button></Link>}
            </div>
        </div>
    </div>
  )
}
