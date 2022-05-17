import React from 'react'
import dbConnect from "@lib/dbConnect"
import Movie from '@models/Movie';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { deleteObject } from '@services/requests';

const PageMovie = ({success, movie, error}) => {
  const router = useRouter();
  const { id } = router.query;

  if(error) return (
    <div className='container flex justify-center items-center max-w-none bg-sky-100 h-screen p-6'>
      <div className='rounded-xl w-5/6 text-center text-white bg-slate-700 py-12'>
         <h4 className='text-3xl'>{`${error} :(`}</h4>
        <Link href='/'> 
          <button className='mt-4 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white'>Volver</button>
        </Link>
      </div>
    </div>
  )
  return(
    <div className='container flex justify-center max-w-none p-6'>
      <div className='w-5/6 px-10 pt-9 pb-14 bg-sky-900 flex flex-col justify-center min-h-min max-h-none'>
        <h4 className='text-2xl text-white mb-5 border-b border-sky-200 pb-1'>Detalle de la Película</h4>
        <h3 className='text-xl text-rose-50'>{movie.title}</h3>
        <p className='text-xl text-rose-50'>{movie.plot}</p>
        <div className='options h-10 mt-6'>
        <Link href='/'> 
          <button className='mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white'>Volver</button>
        </Link>
        <Link href={`/${movie._id}/edit`}> 
          <button className='mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white'>Editar</button>
        </Link>
        <button onClick={() =>{ 
          deleteObject(id).then(res => router.push('/'));
        }} className='mt-4 mr-3 rounded-md text-md py-2 px-3 bg-sky-100 text-gray-800 text white'>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default PageMovie;

export async function getServerSideProps({params}){
  try{
    await dbConnect();

    const movie = await Movie.findById(params.id).lean();
    if(!movie) return {props: {success: false, error: 'No se encontró la película'}};
    movie._id = `${movie._id}`;

    return {props: {success: true, movie}};
  }
  catch(e){
    if(e.kind == 'ObjectId') return {props: {success:false , error: 'id no valido'}};
    return  {props: {success:false ,error: 'error de servidor'}};
  }
} 