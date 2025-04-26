import React, { useState } from 'react';

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

const WeatherFromLocation = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="weather-from-location">
      <button onClick={handleGetWeather}>Sprawdź pogodę w mojej lokalizacji</button>
      {loading && <p>Ładowanie...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div>
          <h2>Pogoda w {weather.name}</h2>
          <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
          <p><strong>Warunki:</strong> {weather.weather[0].description}</p>
          <p><strong>Wiatr:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherFromLocation;