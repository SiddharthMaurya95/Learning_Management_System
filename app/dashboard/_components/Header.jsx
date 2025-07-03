import React from 'react'
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='p-5 shadow-md flex justify-end bg-white'>
      <UserButton/>
    </div>
  )
}

export default Header