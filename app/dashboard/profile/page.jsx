import React from 'react'
import { UserProfile } from '@clerk/nextjs'
function Profile() {
  return (
    <div>
      <h2 className='font-bold text-3xl mb-7'>Manage Your Profile</h2>
      <div className='flex justify-center'>
      <UserProfile routing="hash"/>
      </div>
    </div>
  )
}

export default Profile
