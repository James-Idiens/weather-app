// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import App from '../App'

describe('<App>', () => {
  it('should display current weather after searching', async () => {
    const weatherScope = nock('http://localhost')
      .get('/api/v1/weather/City')
      .reply(200, {
        current: {
          temp_c: 25,
          condition: {
            text: 'Sunny',
            icon: 'sunny.png',
          },
        },
        location: {
          name: 'City',
          country: 'Country',
        },
      })

    const bingImageScope = nock('http://localhost')
      .get('/api/v1/bing-wallpaper')
      .reply(200, {
        imageUrl: 'http://example.com/image.jpg',
        copyright: 'Copyright Text',
      })

    render(<App />)

    // Search for weather
    const searchInput = screen.getByLabelText('weather-search')
    const searchButton = screen.getByText(/Search/i)

    const user = userEvent.setup()

    await user.type(searchInput, 'City')
    await user.click(searchButton)

    // Wait for weather data to be displayed
    const weatherInfo = await screen.findByText(/Current Weather/i)
    const locationInfo = screen.getByText(/City, Country/i)
    const temperatureInfo = screen.getByText(/25°C/i)
    const conditionInfo = screen.getByText(/Sunny/i)
    const weatherIcon = screen.getByAltText(/Weather Icon/i)

    // Assertions
    expect(weatherInfo).toBeInTheDocument()
    expect(locationInfo).toBeInTheDocument()
    expect(temperatureInfo).toBeInTheDocument()
    expect(conditionInfo).toBeInTheDocument()
    expect(weatherIcon).toBeInTheDocument()

    expect(weatherScope.isDone()).toBeTruthy()
    expect(bingImageScope.isDone()).toBeTruthy()
  })

  it('should display error message if weather search fails', async () => {
    const weatherScope = nock('http://localhost')
      .get('/api/v1/weather/Invalid')
      .reply(404)

    const bingImageScope = nock('http://localhost')
      .get('/api/v1/bing-wallpaper')
      .reply(200, {
        imageUrl: 'http://example.com/image.jpg',
        copyright: 'Copyright Text',
      })

    render(<App />)

    // Search for weather
    const searchInput = screen.getByLabelText('weather-search')
    const searchButton = screen.getByText(/Search/i)

    const user = userEvent.setup()

    await user.type(searchInput, 'City')
    await user.click(searchButton)

    // Wait for error message to be displayed
    const errorMessage = await screen.getByTestId('error-message')

    expect(errorMessage).toBeInTheDocument()

    expect(weatherScope.isDone()).toBeFalsy()
    expect(bingImageScope.isDone()).toBeTruthy()
  })
})
