import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CityList.css';

const CityList = ({ cities }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserLocation = async () => {
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      return { lat: data.lat, lon: data.lon, city: data.city };
    } catch (error) {
      console.error('Błąd podczas pobierania lokalizacji użytkownika:', error);
      return null;
    }
  };

  const getWeatherByLocation = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=pl`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd podczas pobierania danych pogodowych:', error);
      return null;
    }
  };

  const handleGetWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const location = await getUserLocation();
      if (!location) {
        setError('Nie udało się pobrać lokalizacji użytkownika.');
        setLoading(false);
        return;
      }

      const weatherData = await getWeatherByLocation(location.lat, location.lon);
      if (!weatherData) {
        setError('Nie udało się pobrać danych pogodowych.');
        setLoading(false);
        return;
      }

      setWeather(weatherData);
    } catch (err) {
      setError('Wystąpił błąd podczas pobierania danych.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="city-list-container">
      <div className="main-city-list">
        <h2>Wybierz miasto</h2>
        <button onClick={handleGetWeather} className="location-weather-button">
          Pogoda na podstawie mojej lokalizacji
        </button>
        {loading && <p>Ładowanie...</p>}
        {error && <p className="error-message">{error}</p>}
        {weather && (
          <div className="location-weather">
            <h3>Pogoda w {weather.name}</h3>
            <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
            <p><strong>Warunki:</strong> {weather.weather[0].description}</p>
            <p><strong>Wiatr:</strong> {weather.wind.speed} m/s</p>
          </div>
        )}
        <ul>
          {cities.map((city, index) => (
            <li key={index} className="city-item">
              <Link to={`/weather/${city}`} className="city-link">
                {city}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityList;
