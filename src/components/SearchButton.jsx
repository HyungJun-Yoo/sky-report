import React, { useState } from 'react'

const SearchButton = ({ handleSearch }) => {
  const [cityName, setCityName] = useState('')

  return (
    <div className='max-w-[1280px] mx-auto p-4 border border-gray-600 rounded-lg shadow-lg bg-gray-900 mt-8'>
      <h1 className='text-2xl font-bold text-center mb-4 text-white'>
        도시 검색
      </h1>
      <input
        type='text'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder='도시 이름을 입력하세요'
        className='w-full p-2 border border-gray-700 rounded-md mb-2 bg-gray-800 text-white placeholder-gray-400'
      />
      <button
        onClick={() => handleSearch(cityName)}
        className='w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'
      >
        검색
      </button>
    </div>
  )
}

export default SearchButton
