import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityList from './components/CityList';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

const cities = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Opole'];

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Prognoza Pogody</h1>
          <nav>
            <ul className="nav-list">
              <li><a href="/">Strona Główna</a></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<CityList cities={cities} />} />
          <Route path="/weather/:city" element={<WeatherDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
