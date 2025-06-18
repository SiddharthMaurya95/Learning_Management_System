import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
function MaterialCardItem({item}) {
  return (
    <div className='primaryBorder shadow-md rounded-lg p-5 flex flex-col items-center' > 
    <h2 className='p-1 px-2 bg-blue-400 text-white rounded-full text-[10px] mb-2'>Ready</h2>
         <Image src={item.icon} alt={item.name} width={50} height={50}></Image>   
         <h2 className='font-medium'>{item.name}</h2>
         <p className='text-gray-500 text-sm text-center'>{item.desc}</p>
         <Button className='primaryBorder mt-3 w-full' variant='outline'>View</Button>
    </div>
  )
}

export default MaterialCardItem