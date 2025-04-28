const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Import tras

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfiguracja EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Upewnij się, że masz folder `views`

// Ładowanie tras
app.use(authRoutes);

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});