import React, { useState } from 'react';
import axios from 'axios';
import './WeatherSearch.css';

const WeatherSearch = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!city) {
            setError('Wpisz nazwę miasta.');
            return;
        }

        try {
            setError(null);
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: process.env.REACT_APP_WEATHER_API_KEY,
                    units: 'metric',
                    lang: 'pl',
                },
            });
            setWeather(response.data);
        } catch (error) {
            setError('Nie udało się znaleźć pogody dla podanego miasta.');
            setWeather(null);
        }
    };

    return (
        <div className="weather-search-container">
            <h2>Wyszukiwarka Pogody</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Wpisz nazwę miasta"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Szukaj</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weather && (
                <div className="weather-result">
                    <h3>Pogoda w {weather.name}</h3>
                    <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
                    <p><strong>Warunki:</strong> {weather.weather[0].description}</p>
                    <p><strong>Wiatr:</strong> {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherSearch;