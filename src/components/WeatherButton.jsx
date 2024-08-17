import React from 'react'

const WeatherButton = ({ cities, handleCityChange, selectedCity }) => {
  return (
    <div className='flex justify-center w-full h-full bg-gray-900 p-4 min-w-[440px] overflow-auto'>
      <div className='flex justify-center items-center gap-4'>
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
