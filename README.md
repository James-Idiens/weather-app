## About this project

This is a spin on the classic weather app. It uses the WeatherAPI.com API to gather weather data for a given city.
The user can search for a city, and the app will display the current weather, and the box will change color based on the conditions.

A further feature is utilizing the bing wallpaper of the day to display a background image. I discovered a way to the bing image in JSON format, and I am using that to display the image, and the associated copyright information.

The purpose of this project was to learn how to work with an external API. I also wanted to learn how to use a CSS framework, and I chose Tailwind CSS.

## Technologies used

- Typescript
- React
- Tailwind CSS
- WeatherAPI.com API

# React with Express and Vite

This is a project that uses Vite to bundle a React app and Express to serve it in production. Express is used in development to serve an API server.

Vite React App: [http://localhost:5173](http://localhost:5173)
Express API Server: [http://localhost:3000](http://localhost:3000)

Requests to `http://localhost:5173/api` are proxied to `http://localhost:3000/api`.

### Installation

```sh
npm install
npm run dev
```

## Setup

Please see the environment variables in the .env.sample file. You will need to create a .env file in the root directory and add the appropriate values.
