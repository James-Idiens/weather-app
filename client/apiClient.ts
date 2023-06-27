import request from 'superagent'
import { Current, Location } from '../Models/weather'

export async function getWeather(query: string): Promise<{
  current: Current
  location: Location
}> {
  const res = await request.get(`/api/v1/weather/${query}`)
  return res.body as { current: Current; location: Location }
}
