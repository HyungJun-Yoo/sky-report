import React, { useState } from 'react'
import { format } from 'date-fns'

const HourlyForecastTable = ({ weatherList }) => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentDate = format(now, 'yyyy-MM-dd')

  const groupedData = weatherList.reduce((acc, item) => {
    const dt = item.dt
    const dateObj = new Date(dt * 1000)
    const kstDateObj = new Date(dateObj.getTime())
    const formattedTime = format(kstDateObj, 'HH:mm')
    const date = format(kstDateObj, 'yyyy-MM-dd')

    if (
      date < currentDate ||
      (date === currentDate && kstDateObj.getHours() < currentHour)
    ) {
      return acc
    }

    const data = {
      time: formattedTime,
      temp: Math.round(item.main.temp - 273.15),
      pop: item.pop,
      rain: item.rain ? item.rain['3h'] : 0,
      wind: item.wind.speed,
      humidity: item.main.humidity,
    }

    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(data)
    return acc
  }, {})

  const dates = Object.keys(groupedData)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 1

  const currentEntries = dates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handleNext = () => {
    if (currentPage < dates.length - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className='overflow-hidden text-stone-300 p-4 mt-4 border-t-2 border-gray-600'>
      <h2 className='text-4xl font-bold mb-12 text-center'>시간별 예보</h2>
      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-500 transition ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          ◀
        </button>

        <h2 className='text-lg font-bold'>{currentEntries[0]}</h2>

        <button
          onClick={handleNext}
          disabled={currentPage >= dates.length - 1}
          className={`bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-500 transition ${
            currentPage >= dates.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          ▶
        </button>
      </div>

      {currentEntries.map((date) => (
        <div key={date} className='mb-6 flex justify-center'>
          <table className='min-w-full max-w-4xl bg-gray-800 border border-gray-700'>
            <thead>
              <tr className='bg-gray-700 text-gray-300 uppercase text-sm leading-normal'>
                <th className='py-3 px-6 text-left'>시간</th>
                <th className='py-3 px-6 text-left'>기온 (°C)</th>
                <th className='py-3 px-6 text-left'>강수확률 (%)</th>
                <th className='py-3 px-6 text-left'>강수량 (mm)</th>
                <th className='py-3 px-6 text-left'>바람 (m/s)</th>
                <th className='py-3 px-6 text-left'>습도 (%)</th>
              </tr>
            </thead>
            <tbody className='text-gray-400 text-sm font-light'>
              {groupedData[date].map(
                ({ time, temp, pop, rain, wind, humidity }) => (
                  <tr
                    key={time}
                    className='border-b border-gray-600 hover:bg-gray-700'
                  >
                    <td className='py-3 px-6'>{time}</td>
                    <td className='py-3 px-6'>{temp}°C</td>
                    <td className='py-3 px-6'>{(pop * 100).toFixed(0)}%</td>
                    <td className='py-3 px-6'>{rain.toFixed(1)} mm</td>
                    <td className='py-3 px-6'>{wind.toFixed(1)} m/s</td>
                    <td className='py-3 px-6'>{humidity}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default HourlyForecastTable
