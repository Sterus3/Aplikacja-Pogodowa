import React, { useState } from 'react';
import '../App.css'; // Import stylów z App.css

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Resetuj błędy

    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const data = await response.json();
            console.log('Odpowiedź z backendu:', data); // Loguj odpowiedź
            const validationErrors = {};
            data.errors.forEach((error) => {
                validationErrors[error.path] = error.msg;
            });
            setErrors(validationErrors); // Ustaw błędy w stanie
        } else {
            alert('Rejestracja zakończona sukcesem!');
            window.location.href = '/login'; // Przekierowanie na stronę logowania
        }
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
    }
};

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Rejestracja</h2>
      </header>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nazwa użytkownika"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Numer telefonu:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Numer telefonu"
            value={formData.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && <p className="error-message">{errors.phone_number}</p>}
        </div>
        <button type="submit" className="weather-from-location button">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Register;