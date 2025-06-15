import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function TopicInput({setTopic,setDifficultyLevel}) {
  return (
    <div>
        <h2>Input the Topic or the Content for Which you want to Generate Study Materials</h2>
        <Textarea placeholder='Start writing here' 
        onChange={(event)=>setTopic(event.target.value)} className='mt-2'></Textarea>
        <h2 className='mt-5 mb-3'>Select the difficulty level</h2>
        <Select onValueChange={(value)=>setDifficultyLevel(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Difficulty Level" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Easy">Easy</SelectItem>
    <SelectItem value="Medium">Medium</SelectItem>
    <SelectItem value="Hard">Hard</SelectItem>
  </SelectContent>
</Select>
    </div>
  )
}

export default TopicInput