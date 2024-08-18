import React from 'react'
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiWindy,
  WiBarometer,
  WiHumidity,
} from 'react-icons/wi'

const WeatherState = ({ todayWeather }) => {
  // 필요한 데이터 추출
  const {
    main: { feels_like, pressure, humidity },
    wind: { speed, deg },
    clouds: { all },
    rain,
  } = todayWeather

  const precipitation = rain ? rain['1h'] || 0 : 0 // 최근 1시간 강수량

  return (
    <div className='flex justify-center items-center text-gray-300 rounded-lg mt-8 p-4'>
      <div className='w-full bg-gray-800 min-w-[350px] max-w-[1280px] p-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>현재 날씨 정보</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-gray-700 p-4 rounded-lg flex flex-col items-center'>
            <WiDaySunny className='text-yellow-400 text-3xl mb-2' />
            <h3 className='font-semibold'>체감 온도</h3>
            <p>{(feels_like - 273.15).toFixed(1)} °C</p>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg flex flex-col items-center'>
            <WiRain className='text-blue-400 text-3xl mb-2' />
            <h3 className='font-semibold'>강수량</h3>
            <p>{precipitation} mm</p>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg flex flex-col items-center'>
            <WiCloudy className='text-gray-400 text-3xl mb-2' />
            <h3 className='font-semibold'>구름 상태</h3>
            <p>{all}%</p>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg flex flex-col items-center'>
            <WiWindy className='text-green-400 text-3xl mb-2' />
            <h3 className='font-semibold'>바람 속도</h3>
            <p>{speed} m/s</p>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg flex flex-col items-center'>
            <WiBarometer className='text-purple-400 text-3xl mb-2' />
            <h3 className='font-semibold'>기압</h3>
            <p>{pressure} hPa</p>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg flex flex-col items-center'>
            <WiHumidity className='text-teal-400 text-3xl mb-2' />
            <h3 className='font-semibold'>습도</h3>
            <p>{humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherState
