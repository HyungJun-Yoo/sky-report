import React from 'react'

const WeatherButton = ({ cities, handleCityChange, selectedCity }) => {
  return (
    <div className='flex justify-center w-full h-full p-4 min-w-[440px]'>
      <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5'>
        {cities.map((city) => (
          <button
            key={city}
            className={`${
              city === selectedCity ? 'bg-blue-500' : 'bg-gray-500'
            } text-white font-semibold py-2 px-4 rounded text-nowrap hover:bg-gray-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300`}
            onClick={() => handleCityChange(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default WeatherButton
