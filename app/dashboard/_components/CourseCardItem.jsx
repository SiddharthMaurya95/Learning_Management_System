import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
export default function CourseCardItem({course}) {
  return (
    <div className='primaryBorder rounded-lg shadow-md p-5'>
        <div>
            <div className='flex justify-between items-center'>
                <Image src={'/knowledge.png'} alt='other' width={50} height={50}></Image>
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-green-900 text-white'>17 june 2025</h2>
            </div>
            <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.course_title}</h2>
            {console.log(course)}
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
