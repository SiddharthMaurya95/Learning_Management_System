import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function DashboardHeader() {
  return (
    <div className='p-5 shadow-md'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
      <Link href={'/dashboard'}><Button className='bg-green-400 cursor-pointer'>Dashboard</Button></Link>
      <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader