import React from 'react'
import ReactCardFlip from 'react-card-flip'
function FlashCardItem({handleClick, isFlipped ,flashcard}) {
  return (
    <div className='flex items-center justify-center'>
       <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className='p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-center 
        h-[250px] cursor-pointer w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
         <h2 className='text-center text-xl'>{flashcard?.front}</h2>
        </div>

         <div className='p-4 bg-white text-green-500 rounded-lg shadow-lg flex items-center justify-center 
        h-[250px] cursor-pointer w-[200px] md:h-[350px] md:w-[300px] primaryBorder' onClick={handleClick}>
         <h2 className='text-center'>{flashcard?.back}</h2>
        </div>

      </ReactCardFlip>
    </div>
  )
}

export default FlashCardItem
