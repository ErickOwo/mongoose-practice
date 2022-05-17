import Form from '@components/Form';
import { getObject } from '@services/requests';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


const Edit = () => {
  const [formData, setForm]=  useState({});
  const router = useRouter();
  const { id } = router.query;
  const {data: movie , error } = useSWR(id ? `/api/movie/${id}` : null, getObject);

  const form = {
    title: movie?.movie?.title,
    plot: movie?.movie?.plot,
  };

  useEffect(() => {
    setForm(form)
  }, [movie]);

  if (error) return <div>failed to load</div>
  if (!movie) return(
    <div className='container w-screen h-screen flex justify-center items-center relative'>
      <motion.div 
        className='w-min flex absolute'
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: .6 }} >
        <motion.div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-700 to-cyan-600'></motion.div>
        <motion.div className='w-10 h-10 mx-8 rounded-full bg-gradient-to-r from-green-300 to-emerald-500'></motion.div>
        <motion.div className='w-10 h-10 rounded-full bg-gradient-to-r to-purple-700 from-cyan-600'></motion.div>
      </motion.div>
    </div>
  );
  
  return (
    <div className='container p-6'>
      <Form
        formNewMovie={false}
        formData={formData} />
    </div>
  )
}

export default Edit;