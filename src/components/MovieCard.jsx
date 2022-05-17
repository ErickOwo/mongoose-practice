import Link from 'next/link';
import React from 'react'

const MovieCard = ({ title, plot, id }) => {
  return (
    <div className='p-3 max-w-lg border-l border-b mb-3 border-gray-600 text-md '>
      <p>
        <span className='font-bold'>Titulo: </span>
          {title}
      </p>
      <p>
        <span className='font-bold'>Description: </span>
          {plot}
      </p>
      <Link href={`/${id}`}>
        <button className='mt-2 px-2 py-1 bg-sky-300 rounded-sm'>Más info...</button>
      </Link>
    </div>
  )
}

export default MovieCard;