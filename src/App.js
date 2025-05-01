import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CityList from './components/CityList';
import WeatherDetails from './components/WeatherDetails';
import Login from './components/Login';
import Register from './components/Register';
import WeatherSearch from './components/WeatherSearch';
import './App.css';

const cities = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Opole'];

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        alert('Wylogowano pomyślnie!');
    };

    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <h1>Prognoza Pogody</h1>
                    <nav>
                        <ul className="nav-list">
                            <li><Link to="/">Strona Główna</Link></li>
                            {!user && <li><Link to="/login">Logowanie</Link></li>}
                            {!user && <li><Link to="/register">Rejestracja</Link></li>}
                            {user && <li>Witaj, {user.username}!</li>}
                            {user && (
                                <li>
                                    <button onClick={handleLogout} className="logout-button">
                                        Wyloguj się
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <CityList cities={cities} />
                            {user ? (
                                <WeatherSearch />
                            ) : (
                                <p className="error-message">Zaloguj się, aby wyszukać pogodę dla dowolnego miasta.</p>
                            )}
                        </div>
                    } />
                    <Route path="/weather/:city" element={<WeatherDetails />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/weather-search" element={<WeatherSearch />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;