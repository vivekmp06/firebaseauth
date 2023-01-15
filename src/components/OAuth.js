import React from 'react'
import {FcGoogle} from 'react-icons/fc'
export default function OAuth() {
  return (
    <button className='flex items-center justify-center w-full bg-red-500  text-white  px-7 py-3  uppercase text-sm font-medium  hover:bg-red-700  active:bg-red-800 transition duration-150 shadow-md hover:shadow-lg active:shadow-lg ease-in-out rounded'><FcGoogle className='text-2xl  bg-white rounded mr-2 '/>Continue with Google</button>
  )
}
