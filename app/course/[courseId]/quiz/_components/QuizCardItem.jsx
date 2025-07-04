import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
function QuizCardItem({quiz,userSelectedOption}) {
  const [selectedOption, setSelectedOption] = useState(null);
  return (  
    <div className=' p-3'>
     <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        {quiz?.options?.map((option, index) =>(
            <h2  onClick={()=>{setSelectedOption(option);userSelectedOption(option)}} key={index} className={`primaryBorder w-full cursor-pointer rounded-xl text-center lg:text-lg lg:p-3
  ${selectedOption === option 
    ? 'bg-blue-500 text-white' 
    : 'hover:bg-gray-200'}
`}>{option}</h2>
        ))}
     </div>
    </div>
  )
}

export default QuizCardItem
