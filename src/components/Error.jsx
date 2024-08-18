import React from 'react'
import { MdError } from 'react-icons/md'

const Error = ({ error }) => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center items-center bg-gray-800 shadow-lg border border-gray-700 text-white px-6 py-4 rounded-lg relative mx-4 my-4 max-w-[1280px] w-full transition-transform transform hover:scale-105'>
        <div className='flex items-center'>
          <MdError className='inline-block mr-2 text-red-500' size={30} />
          <strong className='font-semibold text-lg'>오류!</strong>
        </div>
        <span className='mt-2 text-center'>{error}</span>
      </div>
    </div>
  )
}

export default Error
