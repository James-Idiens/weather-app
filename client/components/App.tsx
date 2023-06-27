import { useState } from 'react'
import { getWeather } from '../apiClient'
import { Current, Location } from '../../Models/weather'

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
      setError(null) // Reset the error state if successful
    } catch (error) {
      setWeather(null)
      setLocation(null)
      setError('Whoops! Something went wrong 😬')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a location"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {weather && location && !error && (
        <>
          <h2>Current Weather</h2>
          <p>{location.name}</p>
          <p>{Math.round(weather.temp_c)}°C</p>
          <p>{weather.condition.text}</p>
          <img src={weather.condition.icon} alt="Weather Icon" />
        </>
      )}
    </div>
  )
}
