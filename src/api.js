import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = async (city, unit = 'metric') => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,
      appid: API_KEY,
      units: unit,
      lang: 'pl',
    },
  });
  return response.data;
};
