import { useState } from 'react'
import { getWeather } from '../apiClient'
import { Current, Location } from '../../Models/weather'

export default function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<Current | null>(null)
  const [location, setLocation] = useState<Location | null>(null)

  const handleSearch = async () => {
    const weatherData = await getWeather(query)
    setWeather(weatherData.current)
    setLocation(weatherData.location)
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
      {weather && location && (
        <>
          <h2>Current Weather</h2>
          <p>{location.name}</p>
          <p>{Math.round(weather.temp_c)}°C</p>
          <p>{weather.condition.text}</p>
        </>
      )}
    </div>
  )
}
