import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import './WeatherMap.css';

const WeatherMapWithLayers = ({ lat, lon }) => {
  const mapRef = useRef(null);
  const [currentLayer, setCurrentLayer] = useState('clouds_new');

  const layerOptions = {
    clouds_new: 'Chmury',
    precipitation_new: 'Deszcz',
    temp_new: 'Temperatura',
    wind_new: 'Wiatr'
  };

  useEffect(() => {
    if (!lat || !lon) return;

    const map = L.map('weather-map').setView([lat, lon], 10);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const weatherLayer = L.tileLayer(getLayerUrl(currentLayer), {
      attribution: '© OpenWeatherMap',
      opacity: 1
    }).addTo(map);

    mapRef.current.weatherLayer = weatherLayer;

    return () => {
      map.remove();
    };
  },);

  useEffect(() => {
    if (!mapRef.current) return;

    const newLayer = L.tileLayer(getLayerUrl(currentLayer), {
      attribution: '© OpenWeatherMap',
      opacity: 1
    });

    mapRef.current.weatherLayer?.remove();
    newLayer.addTo(mapRef.current);
    mapRef.current.weatherLayer = newLayer;
  }, [currentLayer]);

  const getLayerUrl = (layerName) =>
    `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  return (
    <div>
      <div className="layer-buttons">
        {Object.entries(layerOptions).map(([layer, label]) => (
          <button
            key={layer}
            className={layer === currentLayer ? 'active' : ''}
            onClick={() => setCurrentLayer(layer)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="weather-map" className="weather-map" />
    </div>
  );
};

export default WeatherMapWithLayers;