import MovieCard from '@components/MovieCard';
import dbConnect from '@lib/dbConnect'
import Movie from '@models/Movie';
import Link from 'next/link';

export default function Home({movies}) {
  return (
    <div className='container w-screen min-h-screen max-w-none min-w-none bg-sky-100 pb-7'>
      <h4 className='pt-7 pl-10 text-4xl mb-3 text-gray-600 font-bold'>Movies</h4>
      <Link href='/dashboard'>
        <button className='ml-10 bg-stone-400 text-yellow-100 pt-1 pb-2 px-3 my-2 text-lg'>Agregar Película</button>
      </Link>
      <div className='my-5 px-10'>
        {
          movies.map( movie =>(
            <MovieCard
            title={movie.title}
            plot={movie.plot}
            key={movie._id}
            id={movie._id} />
          ))
        }
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  try{
    await dbConnect();

    const response = await Movie.find({});
    
    const movies = response.map(movie => {
      const movieObj = movie.toObject();
      movieObj._id = movieObj._id.toString();
      return movieObj;
    })

    return {props: {movies}}
  }
  catch(e){
    console.log(e);
  }
} 
