import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            if (response.data.success) {
                alert(response.data.message);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
                window.location.href = '/';
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Nieznany błąd logowania');
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h2>Logowanie</h2>
            </header>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="weather-from-location button">
                    Zaloguj się
                </button>
            </form>
        </div>
    );
};

export default Login;