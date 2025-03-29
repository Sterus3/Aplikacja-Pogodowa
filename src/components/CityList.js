import React from 'react';
import { Link } from 'react-router-dom';
import './CityList.css';

const CityList = ({ cities }) => {
  return (
    <div className="city-list-container">
      <div className="main-city-list">
        <h2>Wybierz miasto</h2>
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
