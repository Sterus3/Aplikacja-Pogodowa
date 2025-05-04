import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './WeatherDetails.css';
import WeatherMapWithLayers from './WeatherMapWithLayers';


const WeatherDetailsPage = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [temperatureUnit,] = useState(() => {
    return localStorage.getItem('temperatureUnit') || 'metric';
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: `${city},PL`,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: temperatureUnit,
            lang: "pl",
          },
        });
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            q: `${city},PL`,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: temperatureUnit,
            lang: "pl",
          },
        });
        const formattedForecast = forecastResponse.data.list.slice(0, 40).map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          time: new Date(item.dt * 1000).toLocaleTimeString(),
          temperature: item.main.temp,
          condition: item.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          wind: item.wind.speed,
          windDirection: item.wind.deg,
          rain: item.rain ? item.rain["3h"] : 0,
          snow: item.snow ? item.snow["3h"] : 0,
        }));
        setForecast(formattedForecast);
      } catch (error) {
        setError("Błąd pobierania danych pogodowych.");
      }
    };

    fetchWeather();
  }, [city, temperatureUnit]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!weather || forecast.length === 0) {
    return <p className="loading-message">Ładowanie danych...</p>;
  }

  return (
    <div className="container">
      <h1>Pogoda w {weather.name}</h1>
      <div className="weather-section">
      <WeatherMapWithLayers lat={weather.coord.lat} lon={weather.coord.lon} />
        <div className="weather-info">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <div className="weather-details-columns">
            <div className="weather-column">
              <p><strong>Temperatura:</strong> {weather.main.temp}{temperatureUnit === 'metric' ? '°C' : '°F'}</p>
              <p><strong>Warunki:</strong> {weather.weather[0].description}</p>
              <p><strong>Wiatr:</strong> {weather.wind.speed} {temperatureUnit === 'metric' ? 'm/s' : 'mph'} ({weather.wind.deg}°)</p>
              <p><strong>Zachmurzenie:</strong> {weather.clouds.all}%</p>
              <p><strong>Opady:</strong> {weather.rain ? weather.rain["3h"] : 0} mm deszczu, {weather.snow ? weather.snow["3h"] : 0} mm śniegu</p>
            </div>
            <div className="weather-column">
              <p><strong>Ciśnienie:</strong> {weather.main.pressure} hPa</p>
              <p><strong>Wilgotność:</strong> {weather.main.humidity}%</p>
              <p><strong>Widoczność:</strong> {weather.visibility / 1000} km</p>
              <p><strong>Wschód słońca:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p><strong>Zachód słońca:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
      <WeatherDetails forecast={forecast} />
    </div>
  );
};



const WeatherDetails = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return <p>Brak danych do wyświetlenia.</p>;
  }

  return (
    <div className="weather-details-container">
      <h2>Prognoza na 5 dni</h2>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Godzina</th>
            <th>Temperatura</th>
            <th>Warunki</th>
            <th>Wiatr</th>
            <th>Opady deszczu</th>
            <th>Opady śniegu</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.temperature} °C</td>
              <td>
                <img src={item.icon} alt={item.condition} /> {item.condition}
              </td>
              <td>{item.wind} m/s ({item.windDirection}°)</td>
              <td>{item.rain} mm</td>
              <td>{item.snow} mm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDetailsPage;
