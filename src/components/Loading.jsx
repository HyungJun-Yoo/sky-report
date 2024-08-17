import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = ({ loading }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <ClipLoader color='#4A90E2' loading={loading} size={50} />
      <p className='ml-4 text-lg'>조금만 기다려주세요...</p>
    </div>
  )
}

export default Loading
