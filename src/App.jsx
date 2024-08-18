import React, { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import WeatherReport from './components/WeatherReport'
import axios from 'axios'
import WeatherButton from './components/WeatherButton'
import Loading from './components/Loading'
import Error from './components/Error'
import WeatherHourly from './components/WeatherHourly'
import WeatherState from './components/WeatherState'
import SearchButton from './components/searchButton'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [todayWeather, setTodayWeather] = useState(null)
  const [weatherList, setWeatherList] = useState([])
  const [city, setCity] = useState('current')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [buttonList, setButtonList] = useState([
    'current',
    'hanoi',
    'paris',
    'new york',
    'seoul',
  ])

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position)
        },
        (error) => {
          setCity('seoul')
          reject(error)
        }
      )
    })
  }

  // 현재 위치에 날씨 정보 가져오기
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

  // 현재 위치에 5일 날씨 정보 가져오기
  const getWeatherListByCurrentLocation = async (lat, lon) => {
    setLoading(true)

    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      const { data } = await axios.get(url)

      setWeatherList(data.list)
      setError(null)
    } catch (err) {
      console.log(err?.message)
      setError('날씨 정보를 가져오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 현재 도시에 날씨 정보 가져오기
  const getWeatherByCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      const { data } = await axios.get(url)

      setTodayWeather(data)
      setError(null)

      if (!buttonList.includes(city)) setButtonList((list) => [...list, city])
    } catch (err) {
      console.log(err?.message)
      setError('날씨 정보를 가져오는 데 실패했습니다.')
    }
  }

  // 현재 도시에 5일 날씨 정보 가져오기
  const getWeatherListByCity = async () => {
    setLoading(true)

    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      const { data } = await axios.get(url)

      setWeatherList(data.list)
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

  const fetchLocationWeather = async () => {
    setLoading(true)
    try {
      const position = await getCurrentLocation()
      const { latitude, longitude } = position.coords
      await getWeatherByCurrentLocation(latitude, longitude)
      await getWeatherListByCurrentLocation(latitude, longitude)
    } catch (err) {
      console.log(err?.message)
      setError('날씨 정보를 가져오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const fetchCityWeather = async () => {
    setLoading(true)
    try {
      await getWeatherByCity()
      await getWeatherListByCity()
    } catch (err) {
      console.log(err?.message)
      setError('날씨 정보를 가져오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (city === 'current') {
      fetchLocationWeather()
    } else {
      fetchCityWeather()
    }
  }, [city])

  if (loading || !todayWeather || !weatherList)
    return <Loading loading={loading} />
  if (error)
    return (
      <div className='bg-gray-900 w-full h-screen flex justify-center items-center'>
        <div className='w-full'>
          <Error error={error} />
          <SearchButton handleSearch={setCity} />
        </div>
      </div>
    )

  return (
    <div className='bg-gray-900 w-full h-full min-w-[350px]'>
      <WeatherCard todayWeather={todayWeather} />
      <WeatherReport todayWeather={todayWeather} />
      <WeatherButton
        buttonList={buttonList}
        handleCityChange={handleCityChange}
        selectedCity={city}
      />
      <SearchButton handleSearch={setCity} />
      <WeatherState todayWeather={todayWeather} />
      <WeatherHourly weatherList={weatherList} />
    </div>
  )
}

export default App
