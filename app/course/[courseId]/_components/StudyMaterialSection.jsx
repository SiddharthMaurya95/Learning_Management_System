import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'


function StudyMaterialSection({courseId,course}) {
    const [studyTypeContent,setStudyTypeContent]=useState();
    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Notes related to the course',
            icon:'/notes.png',
            path:'/notes',
            type:'notes'
        },
        {
            name:'Flashcard',
            desc:'Flashcard help to remember the concepts',
            icon:'/flashcard.png',
            path:'/flashcards',
            type:'flashcard'
        },
        {
            name:'Quiz',
            desc:'Great way to test your knowledge',
            icon:'/quiz.png',
            path:'/quiz',
            type:'quiz'
        },
        // {
        //     name:'Question/Answer',
        //     desc:'Helps to practice your learning',
        //     icon:'/qa.png',
        //     path:'/qa',
        //     type:'qa'
        // }
    ]
useEffect(()=>{
    GetStudyMaterials();
},[])
const GetStudyMaterials=async ()=>{
    const result= await axios.post('/api/study-type',{
        courseId:courseId,
        studyType:'ALL'
    })
    console.log(result?.data);
    setStudyTypeContent(result.data)
}
  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3'>{
            MaterialList.map((item,index)=>( 
              
                <MaterialCardItem item={item} key={index} studyTypeContent={studyTypeContent} course={course} refreshData={GetStudyMaterials}/>
               
            ))}</div>
    </div>
  )
}

export default StudyMaterialSection