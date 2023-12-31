import { useState } from 'react'
import { getWeather } from '../apiClient'
import { Current, Location } from '../../Models/weather'
import Wallpaper from './Wallpaper'
import MapDisplay from './Map'

export default function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<Current | null>(null)
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    try {
      const weatherData = await getWeather(query)
      setWeather(weatherData.current)
      setLocation(weatherData.location)
      setError(null)
    } catch (error) {
      setWeather(null)
      setLocation(null)
      setError('Whoops! Something went wrong 😬')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const getWeatherDivClass = () => {
    if (weather && weather.condition.text) {
      const condition = weather.condition.text.toLowerCase()

      if (condition.includes('sunny')) {
        return 'bg-gradient-to-r from-blue-500 to-blue-300'
      } else if (condition.includes('cloud')) {
        return 'bg-gradient-to-r from-gray-500 to-gray-300'
      } else if (condition.includes('rain')) {
        return 'bg-gradient-to-b from-violet-800 to-violet-600'
      }
    }

    return 'bg-gradient-to-r from-blue-500 to-blue-300'
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Wallpaper />

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
        <div
          className={`max-w-md w-full ${getWeatherDivClass()} rounded-xl shadow-lg p-8`}
        >
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a location"
              aria-label="weather-search"
              className="mt-4 px-4 py-2 bg-white text-black rounded-full"
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="mt-4 ml-2 px-4 py-2 bg-white text-black rounded-full"
            >
              Search
            </button>
          </div>
          {error && <p data-testid="error-message">{error}</p>}
          {weather && location && !error && (
            <div className="mt-4 p-4">
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold">Current Weather</h2>
                <p>
                  {location.name}, {location.country}
                </p>
                <p>{Math.round(weather.temp_c)}°C</p>
                <p>{weather.condition.text}</p>
                <img src={weather.condition.icon} alt="Weather Icon" />
              </div>
            </div>
          )}
          {weather && location && !error && (
            <div id="viewDiv">
              <MapDisplay location={location} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
