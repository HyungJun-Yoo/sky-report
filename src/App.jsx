import React, { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import WeatherReport from './components/WeatherReport'
import axios from 'axios'
import WeatherButton from './components/WeatherButton'
import Loading from './components/Loading'
import Error from './components/Error'

const cities = ['current', 'hanoi', 'paris', 'new york', 'seoul']
const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [todayWeather, setTodayWeather] = useState(null)
  const [city, setCity] = useState('current')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  //
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true)

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      const { data } = await axios.get(url)

      setTodayWeather(data)
      setError(null)
    } catch (err) {
      console.log(err?.message)
      setError('날씨 정보를 가져오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  const getWeatherByCity = async () => {
    setLoading(true)

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      const { data } = await axios.get(url)

      setTodayWeather(data)
      setError(null)
    } catch (err) {
      console.log(err?.message)
      setError('날씨 정보를 가져오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCityChange = (city) => {
    setCity(city)
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await getCurrentLocation()
        const { latitude, longitude } = position.coords
        await getWeatherByCurrentLocation(latitude, longitude)
      } catch (err) {
        console.log(err?.message)
        setError('현재 위치를 가져오는 데 실패했습니다.')
      }
    }

    if (city === 'current') {
      fetchWeather()
    } else {
      getWeatherByCity()
    }
  }, [city])

  if (loading) return <Loading loading={loading} />
  if (error) return <Error error={error} />

  return (
    <>
      <WeatherCard todayWeather={todayWeather} />
      <WeatherReport todayWeather={todayWeather} />
      <WeatherButton
        cities={cities}
        handleCityChange={handleCityChange}
        selectedCity={city}
      />
      <div className='h-screen bg-gray-900 flex flex-col justify-center items-center max-h-[230px]'>
        <p className='text-slate-100 font-bold'>앱 전용입니다.</p>
        <p className='text-slate-100 font-bold'>새로운 기능 추가 예정입니다.</p>
      </div>
    </>
  )
}

export default App
