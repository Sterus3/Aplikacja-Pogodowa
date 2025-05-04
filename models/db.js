const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Zmień na swoje dane
    password: '', // Zmień na swoje dane
    database: 'weather_app', // Zmień na swoją bazę danych
});

module.exports = pool.promise();