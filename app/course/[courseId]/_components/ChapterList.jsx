import React from 'react'

function ChapterList({course}) {
    const Chapters=course?.courseLayout?.chapters
  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Chapters</h2>
        <div>
            {Chapters?.map((chapter,index)=>(<div key={index}>
            <h2 className='text-2xl'>{chapter?.emoji}</h2>
            </div>))}
        </div>
    </div>
  )
}

export default ChapterList