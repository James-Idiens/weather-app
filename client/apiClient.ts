import request from 'superagent'
import { Current, Location } from '../Models/weather'
import { BingImageResponse, BingImageWallpaper } from '../Models/background'

export async function getWeather(query: string): Promise<{
  current: Current
  location: Location
}> {
  const res = await request.get(`/api/v1/weather/${query}`)
  return res.body as { current: Current; location: Location }
}

export async function getBingWallpaper(): Promise<BingImageWallpaper> {
  const res = await request.get('/api/v1/bing-wallpaper')
  return res.body
}
