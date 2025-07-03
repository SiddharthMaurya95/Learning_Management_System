'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import StepProgress from '../_components/StepProgress'
import service from '@/configs/service'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'
function viewNotes() {
    const {courseId}=useParams();
    const [notes,setNotes]=useState();
    const [stepCount,setStepCount]=useState(0);
    const route=useRouter()
    useEffect(()=>{
        GetNotes();
    },[])
    const GetNotes=async()=>{
        const result= await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'notes'
        })
        //const data=JSON.parse(result?.data?.notes);
        console.log(result)
        setNotes(result?.data)
    }
  return notes&&(
      <div>
        <DashboardHeader back={()=>route.back()}></DashboardHeader>
    <StepProgress data={notes} stepCount={stepCount} setStepCount={setStepCount}/>
   {notes?.length!=stepCount?<div className='mt-5 md:10'>
    
       <div dangerouslySetInnerHTML={{__html:JSON.parse(notes[stepCount]?.notes)[0]?.content}}/>
    </div>:
       <div className='flex items-center gap-10 flex-col justify-center'>
        <h2>End of Notes</h2>
        <Button  onClick={()=>route.back()} variant='outline' className='bg-green-500 text-white'>Go to Course Page</Button>
        </div>}
    </div>
  )
}

export default viewNotes
