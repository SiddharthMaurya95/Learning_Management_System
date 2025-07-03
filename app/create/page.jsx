"use client"
import SelectOptions from './_components/SelectOptions'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import {v4 as uuidv4} from 'uuid'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner" 
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiLightBulb } from "react-icons/hi2";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import Options from './_components/Options';
import Dashboard from '../dashboard/_components/DashboardHeader';
import LoadingDialog from './_components/LoadingDialog';
function create() {
  const checkStatus=()=>{
    if(formData?.length==0){
      return true;
    }
    if(step==0&&(formData?.courseType?.length==0||formData?.courseType==undefined)){
      return true;
    }
    if(step==1&&(formData?.topic?.length==0||formData?.about?.length==0||formData?.topic==undefined||formData?.about==undefined)){
        return true;
    }
    else if(step==2&&(formData?.difficultyLevel==undefined||formData?.courseDuration==undefined||formData?.noOfChapters==undefined)){
      return true;
    }
    return false;
  }
  const stepperOptions=[{
    id:1,
    name:'category',
    icon:<HiMiniSquares2X2 />
  },
  {
    id:2,
    name:'Topic & Desc',
    icon:<HiLightBulb />
  },
  {
    id:3,
    name:'Options',
    icon:<HiClipboardDocumentCheck />
  },
  
]
  const router=useRouter()
  const {user}=useUser();
    const [step,setStep]=useState(0);
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState([]);
    const handleUserInput=(fieldName,fieldValue)=>{
      setFormData(prev=>({
        ...prev,
      [fieldName]:fieldValue
      }))
      console.log(formData);
    };
    const GenerateCourseOutline=async()=>{
      const courseId=uuidv4();
      setLoading(true);
      console.log(courseId)
      const result=await axios.post('/api/generate-course-outline',{
        courseId:courseId,
        ...formData,
        createdBy:user?.primaryEmailAddress?.emailAddress
      })
      console.log(result.data);
      setLoading(false);
      router.replace('/dashboard');
      toast("Your course content is generating")
    }
  return (
    <div>
      <Dashboard></Dashboard>
    <div className='flex flex-col justify-center items-center p-5 md:px-24 lg:px-36 mt-5 '>
        <h2 className=' text-4xl font-bold text-center text-green-400'>Start Buliding your Personal Study Materials</h2>
        <div className='flex justify-center items-center mt-10 mb-10'>
        {stepperOptions.map((item,index)=>(
          <div key={index} className='flex items-center justify-center '>
          <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
            <div className={`bg-gray-200 p-3 rounded-full text-white ${step>=index&&'bg-green-400'}`}>
              {item.icon}
            </div>
            <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
            </div>
           {index!=stepperOptions.length-1&&<div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${step-1>=index&&'bg-green-400'}`}></div>}
        </div>
        ))}
        </div>
        <p className='text-gray-500 text-lg text-center'>Fill all the details in order to generate materials</p>
        <div>
            {step==0&&<SelectOptions selectedStudyType={(value)=>handleUserInput('courseType',value)}></SelectOptions>}
            {step==1&&<TopicInput
            setAbout={(value)=>handleUserInput('about',value)}
            setTopic={(value)=>handleUserInput('topic',value)}></TopicInput>}
            {step==2&&<Options setNoOfChapters={(value)=>handleUserInput('noOfChapters',value)} setAddVideo={(value)=>handleUserInput('addVideo',value)} setCourseDuration={(value)=>handleUserInput('courseDuration',value)} setDifficultyLevel={(value)=>handleUserInput('difficultyLevel',value)}></Options>}
        </div>
        <div className='flex justify-between mt-20 w-full'>
            <Button disabled={step==0} onClick={()=>setStep(step-1)}variant='outline' className='p-4'>Prev</Button>
            {step<2?<Button disabled={checkStatus()} onClick={()=>setStep(step+1)} className='bg-green-900 text-white p-4'>Next</Button>:<Button onClick={GenerateCourseOutline} disabled={checkStatus()||loading} className='bg-green-900 text-white p-4'>{loading?<Loader className='animate-spin'/>:'Generate'}</Button>}
        </div>
    </div>
    <LoadingDialog loading={loading}></LoadingDialog>
    </div>
  )
}

export default create