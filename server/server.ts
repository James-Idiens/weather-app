import { join } from 'node:path'
import express from 'express'
import request from 'superagent'
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

server.use(express.json())
server.use(express.static(join(__dirname, './public')))
server.use(cors('*' as CorsOptions))

export default server
