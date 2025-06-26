'use client'
import React, { use } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';
function Quiz() {
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
        setIsCorrectAnswer(true);
        setCorrectAnswer(currentQuestion?.answer);
      } else {
        setIsCorrectAnswer(false);
      }
    }
  return (
    <div>
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
    </div>
  )
}

export default Quiz
