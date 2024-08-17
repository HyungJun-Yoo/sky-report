import React from 'react'
import { MdError } from 'react-icons/md'

const Error = ({ error }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-center items-center bg-red-50 shadow-lg border border-red-200 text-red-700 px-6 py-4 rounded-lg relative mx-4 my-4 w-[480px] h-[320px] transition-transform transform hover:scale-105'>
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
