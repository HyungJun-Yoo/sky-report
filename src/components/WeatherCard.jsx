import React from 'react'
import clear from '/src/assets/clear.jpg'
import clouds from '/src/assets/clouds.jpg'
import rain from '/src/assets/rain.jpg'
import drizzle from '/src/assets/drizzle.jpg'
import thunderstorm from '/src/assets/thunderstorm.jpg'
import snow from '/src/assets/snow.jpg'
import mist from '/src/assets/mist.jpg'
import fog from '/src/assets/fog.jpg'
import haze from '/src/assets/haze.jpg'
import smoke from '/src/assets/smoke.jpg'
import dust from '/src/assets/dust.jpg'
import sand from '/src/assets/sand.jpg'
import ash from '/src/assets/ash.jpg'
import squall from '/src/assets/squall.jpg'
import tornado from '/src/assets/tornado.jpg'

const weatherValue = {
  Clear: { title: '맑음', image: clear },
  Clouds: { title: '구름', image: clouds },
  Rain: { title: '비', image: rain },
  Drizzle: { title: '이슬비', image: drizzle },
  Thunderstorm: { title: '천둥/번개', image: thunderstorm },
  Snow: { title: '눈', image: snow },
  Mist: { title: '안개', image: mist },
  Fog: { title: '안개', image: fog },
  Haze: { title: '흐림', image: haze },
  Smoke: { title: '연기', image: smoke },
  Dust: { title: '먼지', image: dust },
  Sand: { title: '모래', image: sand },
  Ash: { title: '재', image: ash },
  Squall: { title: '돌풍', image: squall },
  Tornado: { title: '토네이도', image: tornado },
}

const WeatherCard = ({ todayWeather }) => {
  if (!todayWeather) return

  const { weather, main, name } = todayWeather
  const temperatureC = main ? Math.round(main.temp - 273.15) : ''
  const temperatureF = main
    ? Math.round(((main.temp - 273.15) * 9) / 5 + 32)
    : ''

  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  const weatherCondition = weatherValue[weather[0].main].title
  const backgroundImage = weatherValue[weather[0].main].image

  return (
    <div
      className='w-full h-full bg-slate-400 min-w-[350px] min-h-[500px]'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full max-w-[1280px] min-h-[500px] mx-auto flex flex-col justify-end p-4 gap-4'>
        <div className='flex gap-2'>
          <div className='flex gap-1'>
            <h2 className='text-stone-100 font-bold text-4xl'>
              {temperatureC}
            </h2>
            <p className='flex items-end text-stone-100 text-2xl'>°C</p>
          </div>
          <p className='text-stone-100 text-4xl'>/</p>
          <div className='flex gap-1'>
            <h2 className='text-stone-100 font-bold text-4xl'>
              {temperatureF}
            </h2>
            <p className='flex items-end text-stone-100 text-2xl'>°F</p>
          </div>
        </div>
        <div className='flex items-center'>
          <img className='w-[56px] h-[56px]' src={icon} alt='ICON' />
          <p className='text-stone-100 font-bold text-2xl'>
            {weatherCondition}
          </p>
        </div>
        <p className='text-stone-100 font-bold text-2xl'>{name}</p>
      </div>
    </div>
  )
}

export default WeatherCard
