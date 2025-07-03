'use client'
import React, { use, useEffect,useState } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import FlashCardItem from './_components/flashcardItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import { useRouter } from 'next/navigation';
function page() {
  const route=useRouter();
    const {courseId} = useParams();
    const [flashcard,setFlashcard] = useState();
    const [api, setApi] = useState();
    useEffect(()=>{
        GetFlashCards();
    },[])
    useEffect(()=>{
        if(!api){
            return ; 
        }
        api.on('select',()=>{
            setIsFlipped(false);
        })
    },[api])
    const GetFlashCards=async()=>{
       const result= await axios.post('/api/study-type',{
        courseId:courseId,
        studyType:'flashcard'
       })
       setFlashcard(result?.data);
       console.log(result?.data);
    }
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }
  return (
    <div>
      <DashboardHeader back={()=>route.back()}></DashboardHeader>
    <div className='p-13 pt-20'>
      
      <h2 className='font-bold text-2xl'>Flashcards</h2>
      <p>Flashcards: The Ultimate Tool to lock in concepts!</p>
      <div className='mt-10'>
<Carousel setApi={setApi}>
  <CarouselContent >
   { flashcard?.content&&flashcard.content?.map((item,index)=>(
    <CarouselItem  key={index} className='flex items-center justify-center'>
        <FlashCardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={item}/>
        </CarouselItem>)
    )}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      </div>
    </div>
    </div>
  )
}

export default page
