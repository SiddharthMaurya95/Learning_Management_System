"use client"
import { BrainCircuit, Navigation } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import {LayoutDashboard, Shield, UserCircle} from  'lucide-react'
import { Button} from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';
function Sidebar() {
  const {totalCourses, setTotalCourses} =useContext(CourseCountContext);
  const path=usePathname();
  const MenuList=[
{
name:'Dashboard',
icon:LayoutDashboard,
path:'/dashboard'
},
{
name:'Upgrade',
icon:Shield,
path:'/dashboard/upgrade'
}
,
{
name:'Profile',
icon:UserCircle,
path:'/dashboard/profile'
},
{
name:'Explore Courses',
icon:Navigation,
path:'/dashboard/explore'
},
  ]
  return (
    <div>
      <div className='h-screen shadow-md p-5'>
        <Link href={'/'}>
      <div className='flex gap-2 items-center'> <BrainCircuit className="h-8 w-8 text-green-600" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">CourseCraft</span>
      </div></Link>
      <div className='mt-10' >
        <Link href={'/create'}>
        <Button className='w-full bg-green-500 text-white cursor-pointer hover:bg-slate-300'>+ Create New</Button>
        </Link>
        <div className='mt-5'>
          {MenuList.map((menu,index)=>(
           
            <div key={index} onClick={() => { window.location.href = menu.path; }} className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-slate-200'}`}>
              <menu.icon/>
              <h2>{menu.name}</h2>
            </div>
           
          ))}
        </div>
      </div>
      <div className='primaryBorder p-3 bg-slate-200 rounded-lg absolute bottom-10'>
        <h2 className='text-lg mb-2'>Available Credits : {15-totalCourses}</h2>
       <Progress className='w-full bg-slate-500' value={(totalCourses/15)*100} />
        <h2 className='text-sm'>{totalCourses} out of 15 credits used</h2> 
        <Link href={'/dashboard/upgrade'} className='text-green-500 text-xs mt-3'></Link>
      </div>
    </div>
    </div>
  )
}

export default Sidebar;