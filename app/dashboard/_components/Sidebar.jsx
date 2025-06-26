"use client"
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
}
  ]
  return (
    <div>
      <div className='h-screen shadow-md p-5'>
      <div className='flex gap-2 items-center'><Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
      <h2 className='font-bold text-2xl'>Easy Study</h2>
      </div>
      <div className='mt-10' >
        <Link href={'/create'}>
        <Button className='w-full bg-green-500 text-white cursor-pointer hover:bg-slate-300'>+ Create New</Button>
        </Link>
        <div className='mt-5'>
          {MenuList.map((menu,index)=>(
            <Link href={menu.path} key={index}>
            <div key={index} className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-slate-200'}`}>
              <menu.icon/>
              <h2>{menu.name}</h2>
            </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='primaryBorder p-3 bg-slate-200 rounded-lg absolute bottom-10 w-[85%]'>
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