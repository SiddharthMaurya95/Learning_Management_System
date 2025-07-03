'use client'
import React, { use } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
function Quiz() {
   const route=useRouter()
    const {courseId} = useParams();
    const [quiz,setQuiz] = useState();
    const [stepCount,setStepCount] = useState(0);
    const[quizData,setQuizData]=useState([]);
    const[isCorrectAnswer,setIsCorrectAnswer]=useState(null);
    const[correctAnswer,setCorrectAnswer]=useState(null);
    useEffect(()=>{
        GetQuiz();
    },[])
    useEffect(()=>{
      setIsCorrectAnswer(null);
      setCorrectAnswer(null);
    },[stepCount])
    const GetQuiz=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'quiz'
        })
        setQuiz(result?.data);
        console.log(result?.data);
        setQuizData(result?.data?.content?.questions); 
    }
    const checkAnswer=(userAnswer,currentQuestion)=>{
      if(userAnswer === currentQuestion?.answer) {
        setCorrectAnswer(currentQuestion?.answer);
        setIsCorrectAnswer(true);
      } else {
        setCorrectAnswer(currentQuestion?.answer);
        setIsCorrectAnswer(false);
      }
    }
  return (
    <div>
      <DashboardHeader back={()=>route.back()}></DashboardHeader>
    <div className='p-3 mt-1'>
      <h2 className='font-bold text-2xl text-center mb-5'>Quiz</h2>
      <StepProgress data={quizData} stepCount={stepCount} setStepCount={(v)=>setStepCount(v)}></StepProgress>
      <div>
            <QuizCardItem quiz={quizData[stepCount]} userSelectedOption={(v)=>checkAnswer(v,quizData[stepCount])}/>
      </div>
      {isCorrectAnswer==false&&<div>
        <div className='primaryBorder p-3 border-red-700 bg-red-200 rounded-lg mt-5'>
          <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
          <p className='text-red-500'>Correct Answer is: {correctAnswer}</p>
        </div>
        </div>}
       {isCorrectAnswer==true&&<div>
        <div className='primaryBorder p-3 border-green-700 bg-green-200 rounded-lg mt-5'>
          <h2 className='font-bold text-lg text-green-600'>Correct</h2>
          <p className='text-green-500'>Your Answer is correct </p>
        </div>
        </div>}
        {
          stepCount==quizData.length&&<div className='flex items-center gap-10 flex-col justify-center'>
        <h2>End of Quiz</h2>
        <Button  onClick={()=>route.back()} variant='outline' className='bg-green-500 text-white'>Go to Course Page</Button>
        </div>
        }
    </div>
    </div>
  )
}

export default Quiz
