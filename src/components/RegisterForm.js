import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    favorite_cities: []
  });

  const handleRegister = async () => {
    const response = await fetch('http://localhost/weather_backend/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (data.success) {
      alert('Rejestracja zakończona sukcesem!');
    } else {
      alert('Błąd: ' + data.error);
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <input type="text" placeholder="Login" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="E-mail" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Hasło" onChange={e => setForm({ ...form, password: e.target.value })} />
    </div>
