"use client"
import SelectOptions from './_components/SelectOptions'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
function create() {
    const [step,setStep]=useState(0);
    const [formData,setFormData]=useState([]);
    const handleUserInput=(fieldName,fieldValue)=>{
      setFormData(prev=>({
        ...prev,
      [fieldName]:fieldValue
      }))
      console.log(formData);
    };
  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20 '>
        <h2 className=' text-4xl font-bold text-green-400'>Start Buliding your Personal Study Materials</h2>
        <p className='text-gray-500 text-lg'>Fill all the details in order to generate materials</p>
        <div>
            {step==0?<SelectOptions selectedStudyType={(value)=>handleUserInput('studyType',value)}></SelectOptions>:<TopicInput
            setTopic={(value)=>handleUserInput('topic',value)} setDifficultyLevel={(value)=>handleUserInput('difficulty',value)}></TopicInput>}
        </div>
        <div className='flex justify-between mt-32 w-full'>
            {step!=0?<Button onClick={()=>setStep(step-1)}variant='outline' className='p-4'>Prev</Button>:'-'}
            {step==0?<Button onClick={()=>setStep(step+1)} className='bg-green-900 text-white p-4'>Next</Button>:<Button className='bg-green-900 text-white p-4'>Generate</Button>}
        </div>
    </div>
  )
}

export default create