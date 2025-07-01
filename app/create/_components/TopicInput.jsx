import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function TopicInput({setTopic,setAbout}) {
  return (
    <div>
        <h2 className='mt-5'>Write the topic for which you want to generate a course(eg., Python Course, Yoga, etc)</h2>
        <Textarea placeholder='Start writing here' 
        onChange={(event)=>setTopic(event.target.value)} className='mt-2' required></Textarea>

        <h2 className='mt-5'>Tell us more about your course, what you want to include in this course</h2>
        <Textarea placeholder='About your course' 
        onChange={(event)=> setAbout(event.target.value)} className='mt-2' required></Textarea>
    </div>
  )
}

export default TopicInput