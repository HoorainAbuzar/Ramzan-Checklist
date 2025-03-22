import React from 'react'
import img from '../assets/img.jpg'
import { useNavigate } from 'react-router-dom'

const Dua = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full p-8 bg-gradient-to-b h-screen from-green-200 to-green-600 flex flex-col items-center justify-center'>
      <img className='shadow-xl md:w-[40%]' src={img} alt="" />
      <button onClick={()=> navigate('/checklist')} className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 w-full rounded py-2 mt-3 text-white'>Next</button>
    </div>
  )
}

export default Dua