import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

function MaterialCardItem({item,studyTypeContent,course,refreshData}) {
  const [loading,setLoading]=useState(false);
  const GenerateContent=async()=>{
    console.log(course)
    toast('Generating your content, please wait...')
    setLoading(true)
    let chapters=''
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters=(chapter.chapter_title||chapter.chapterTitle)+','+chapters
    });
    console.log(chapters);
     const result=await axios.post('/api/study-type-content',{
       courseId:course?.courseId,
       type:item.type,
       chapters:chapters
     })
     setLoading(false)
     console.log(result)
     refreshData(true)
     console.log(studyTypeContent)
     toast('Your content is Ready to view')
  }
  return (
     <Link href={'/course/'+course?.courseId+item.path}>
    <div className={`primaryBorder shadow-md rounded-lg p-5 flex flex-col items-center ${(studyTypeContent?.[item.type]?.length==null||studyTypeContent?.[item.type]?.length==0)&&'grayscale'}`} > 
    {studyTypeContent?.[item.type]?.length==null||studyTypeContent?.[item.type]?.length==0?<h2 className='p-1 px-2 bg-blue-400 text-white rounded-full text-[10px] mb-2'>Generate</h2>:
    <h2 className='p-1 px-2 bg-blue-400 text-white rounded-full text-[10px] mb-2'>Ready</h2>}
         <Image src={item.icon} alt={item.name} width={50} height={50}></Image>   
         <h2 className='font-medium'>{item.name}</h2>
         <p className='text-gray-500 text-sm text-center'>{item.desc}</p>
       {studyTypeContent?.[item.type]?.length==null||studyTypeContent?.[item.type]?.length==0?<Button className='primaryBorder mt-3 w-full cursor-pointer' variant='outline' onClick={()=>GenerateContent()}>{loading&& <RefreshCcw className='animate-spin'/>}Generate</Button>:
         <Button className='primaryBorder mt-3 w-full' variant='outline'>View</Button>}
    </div>
   </Link>
  )
}

export default MaterialCardItem