import React from 'react'

const MovieCard = ({ title, plot }) => {
  return (
    <div className='p-3 max-w-lg border-l border-b mb-3 border-white text-md '>
      <p>
        <span className='font-bold'>Titulo: </span>
          {title}
      </p>
      <p>
        <span className='font-bold'>Description: </span>
          {plot}
      </p>
    </div>
  )
}

export default MovieCard;