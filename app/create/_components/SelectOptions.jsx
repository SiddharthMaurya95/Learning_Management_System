import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
function SelectOptions({selectedStudyType}) {
    const [selectedOption,setSelectedOption]=useState();
    const options=[
        {
            name:'Exam',
            icon:'/exam_1.png'
        },
        {
            name:'Job Interview',
            icon:'/job.png'
        },
        {
            name:'Practice',
            icon:'/practice.png'
        },
        {
            name:'Coding Prep',
            icon:'/code.png'
        },
        {
            name:'Others',
            icon:'/knowledge.png'
        },
       
    ]
  return (
    <div>
<h2 className='text-lg text-center mt-3'>For which of the following you want to create Personal Study Material ?</h2>
   <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'> {options.map((key,value)=>(
        <div key={value} className={`p-4 flex flex-col items-center border rounded-xl
        ${key?.name==selectedOption&&'border-green-500'}`}
        onClick={()=>{setSelectedOption(key.name);selectedStudyType(key.name)}}>
            <Image src={key.icon} alt={key.name} width={50} height={50}/>
            <h2 className='text-sm mb-2'>{key.name}</h2>
        </div>
    ))}
</div>
    </div>
  )
}

export default SelectOptions