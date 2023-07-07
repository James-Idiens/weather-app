import { join } from 'node:path'
import express from 'express'
import request from 'superagent'
import { BingImageResponse, BingImageWallpaper } from '../Models/background'
import cors, { CorsOptions } from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.WEATHER_API_KEY
const server = express()

server.get('/api/v1/weather/:query', async (req, res) => {
  try {
    const { query } = req.params
    const weatherResponse = await request
      .get('http://api.weatherapi.com/v1/current.json?')
      .query({ key: apiKey, q: query })

    const weather = weatherResponse.body

    res.json(weather)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})

server.get('/api/v1/bing-wallpaper', async (req, res) => {
  try {
    const response = await request.get(
      'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'
    )
    const bingImageResponse: BingImageResponse = response.body

    if (bingImageResponse.images.length > 0) {
      const image = bingImageResponse.images[0]
      const imageUrl = `http://www.bing.com${image.url}`
      const copyright = image.copyright

      const wallpaper: BingImageWallpaper = {
        imageUrl,
        copyright,
      }

      res.json(wallpaper)
    } else {
      res.status(404).json({ error: 'No Bing Image found' })
    }
  } catch (error) {
    console.error('Failed to fetch Bing Image', error)
    res.status(500).json({ error: 'Failed to fetch Bing Image' })
  }
})

server.use(express.json())
server.use(express.static(join(__dirname, './public')))
server.use(cors('*' as CorsOptions))

export default server
