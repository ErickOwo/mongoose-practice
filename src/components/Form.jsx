import { addObject, putObject } from '@services/requests';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

const Form = ({ formData, formNewMovie = true, }) => {
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const  handleSubmit = e =>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      title: formData.get('title'),
      plot: formData.get('plot'),
    }
    if(formNewMovie) {
      addObject(data).then(res =>{
        router.push("/");
      }).catch(e=>{
        setError(Object.entries(e.response.data.error.errors)[0][1].message)
      });
    } else {
      putObject(id, data).then(res =>{
        router.push("/");
      }).catch(e=>{
        setError(Object.entries(e.response.data.error.errors)[0][1].message)
      });
    }
  }

  return (
    <form ref={formRef} className='w-4/6 pt-9 pb-16 px-4 bg-gray-900 m-auto flex flex-col items-center'>
      <label className='text-white text-lg font-bold mb-3 max-w-[370px] w-5/6' htmlFor='title'>Ingrese el Título</label>
      <input defaultValue={formData?.title} id="title" name="title" autoComplete="off" required className='max-w-[370px] w-5/6 p-1 outline-slate-600' placeholder="Título "/>
      <label className='text-white text-lg font-bold mb-3 mt-2 max-w-[370px] w-5/6' htmlFor='plot'>Ingrese el Plot</label>  
      <input defaultValue={formData?.plot} id="plot" name='plot' className='max-w-[370px] w-5/6 p-1 outline-slate-600'  placeholder='Plot' autoComplete='off' />
      { error ? <span className='h-6 text-red-600 text-lg mt-3 max-w-[370px] w-5/6'>{ error }</span> : <span className='h-6 mt-3'></span>}
      <button type='submit' onClick={handleSubmit} className='bg-slate-600 hover:bg-slate-500 text-white font-bold text-2xl mt-6 w-4/6 max-w-[230px] pt-2 pb-3'>{formNewMovie ? 'Agregar' : 'Editar'}</button>
    </form>
  )
}

export default Form