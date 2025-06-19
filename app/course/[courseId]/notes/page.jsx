'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
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
    <div className='flex gap-5 items-center'>
       {stepCount!=0&&<Button variant='outline' size='sm'  onClick={()=>setStepCount(stepCount-1)}>Previous</Button>}
      {notes?.map((item,index)=>(
          <div key={index} className={`w-full h-2 rounded-full ${index<=stepCount?'bg-green-500':'bg-gray-200 '}`}>
        </div>
      ))}
      {stepCount<notes.length&&<Button variant='outline' size='sm' onClick={()=>setStepCount(stepCount+1)}>Next</Button>}
    </div>
   {notes?.length!=stepCount?<div className='mt-10'>
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
