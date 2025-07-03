import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
function CourseIntroCard({course}) {
  return (
    <div className='flex gap-5 items-center p-10 primaryBorder shadow-md rounded-lg'>
      <div>
      <Image src={'/knowledge.png'} alt='other' width={50} height={50}></Image>
        <h2 className='font-bold text-2xl '>{course?.courseLayout?.course_title}</h2>
        <p className=''>{course?.courseLayout?.summary}</p>
         <Progress className='w-full bg-slate-500 mt-3' value={33} />
         <h2 className='mt-3 text-lg text-gray-500'>Total Chapters:{course?.courseLayout?.chapters?.length}</h2>
      </div>
    </div>
  )
}

export default CourseIntroCard