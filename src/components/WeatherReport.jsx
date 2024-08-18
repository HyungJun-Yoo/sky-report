import React from 'react'
import { format, formatDistanceToNow } from 'date-fns'
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
    <div className='flex justify-between items-center p-4 min-w-[350px]'>
      <div className='flex gap-2'>
        <div className='flex items-end'>
          <p className='text-stone-300 text-sm'>최고</p>
          <div className='flex text-stone-200 text-3xl'>
            {highTemp}
            <p className='text-2xl'>°</p>
          </div>
        </div>

        <div className='flex items-end'>
          <p className='text-stone-300 text-sm'>최저</p>
          <div className='flex text-stone-200'>
            <p className='text-3xl'>{lowTemp}</p>
            <p className='text-2xl'>°</p>
          </div>
        </div>
      </div>

      <p className='text-stone-200 text-lg'>{formattedDateTime}</p>
    </div>
  )
}

export default WeatherReport
