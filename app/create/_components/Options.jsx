import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
function Options({setDifficultyLevel,setCourseDuration,setAddVideo,setNoOfChapters}) {
  return (
    <div className='px-10 md:px-30 lg:px-44'>
      <div className='grid grid-cols-1'>
        <div className=''>
         <h2 className='mt-4'>Select the difficulty level</h2>
                <Select onValueChange={(value)=>setDifficultyLevel(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        </div>
        <div>
         <h2 className='mt-4'>Course Duration</h2>
                <Select onValueChange={(value)=>setCourseDuration(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="1 Hour">1 Hour</SelectItem>
            <SelectItem value="2 Hours">2 Hours</SelectItem>
            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
       {/* <div>
         <h2 className='mt-12'>Add video</h2>
                <Select onValueChange={(value)=>setAddVideo(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <div>
         <h2 className='mt-4'>No. of Chapters</h2>
         <Input onChange={(event)=>setNoOfChapters(event.target.value)} type='number'></Input>
      </div>
      </div>
    </div>
  )
}

export default Options
