"use client"
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import {LayoutDashboard, Shield, UserCircle} from  'lucide-react'
import { Button} from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { usePathname } from 'next/navigation';
function Sidebar() {
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
        <Button className='w-full bg-blue-500 text-white'>+ Create New</Button>
        <div className='mt-5'>
          {MenuList.map((menu,index)=>(
            <div key={index} className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-slate-200'}`}>
              <menu.icon/>
              <h2>{menu.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='border p-3 bg-slate-200 rounded-lg absolute bottom-10 w-[85%]'>
        <h2 className='text-lg mb-2'>Available Credits : 5</h2>
       <Progress className='w-full bg-slate-500' value={33} />
        <h2 className='text-sm'>1 out of 5 credits used</h2>
        <Link href={'/dashboard/upgrade'} className='text-blue-500 text-xs mt-3'></Link>
      </div>
    </div>
    </div>
  )
}

export default Sidebar;