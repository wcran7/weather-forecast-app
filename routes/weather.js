const express = require('express');
const axios = require('axios');
require('dotenv').config(); 

const router = express.Router();

const API_KEY = process.env.WEATHERAPI_KEY;
const CITY = 'Brisbane';

if (!API_KEY) {
  console.error("API Key is missing. Please add WEATHERAPI_KEY in your .env file.");
}

router.get('/', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ message: 'API key is missing or invalid' });
  }

  try {
    const currentWeatherURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`;
    const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`;

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherURL),
      axios.get(forecastURL),
    ]);

    res.json({
      current: currentWeatherResponse.data.current,
      forecast: forecastResponse.data.forecast.forecastday,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
