const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = 'Brisbane';
const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=-27.4705&lon=153.026&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    const { current, daily } = response.data;
    res.json({
      current: current,
      forecast: daily.slice(1, 8) // next 7 days
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
