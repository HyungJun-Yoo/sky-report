import React from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const WeatherReport = ({ todayWeather }) => {
  if (!todayWeather) return

  const { main } = todayWeather
  const highTemp = main ? Math.round(main.temp_max - 273.15) : ''
  const lowTemp = main ? Math.round(main.temp_min - 273.15) : ''

  const currentDate = new Date()
  const formattedDateTime = format(currentDate, 'M월 d일 (eee) HH:mm', {
    locale: ko,
  })

  return (
    <div className='flex justify-between items-center p-4 mx-auto max-w-[1280px] min-w-[350px]'>
      <div className='flex gap-2'>
        <div className='flex items-end gap-1'>
          <p className='text-stone-300 text-sm'>최고</p>
          <div className='flex text-red-300 text-3xl'>
            {highTemp}
            <p className='text-2xl'>°</p>
          </div>
        </div>

        <div className='flex items-end gap-1'>
          <p className='text-stone-300 text-sm'>최저</p>
          <div className='flex text-blue-300'>
            <p className='text-3xl'>{lowTemp}</p>
            <p className='text-2xl'>°</p>
          </div>
        </div>
      </div>

      <p className='text-stone-200 text-lg font-bold'>{formattedDateTime}</p>
    </div>
  )
}

export default WeatherReport
