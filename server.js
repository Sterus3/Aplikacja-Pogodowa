const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import biblioteki CORS
const authRoutes = require('./routes/auth'); // Import tras

const app = express();
const PORT = 3001;

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', // Zezwól na żądania z frontendu
    methods: ['GET', 'POST'], // Zezwól na określone metody
    credentials: true // Jeśli używasz ciasteczek lub sesji
}));

// Middleware do parsowania JSON i danych z formularzy
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ładowanie tras
app.use(authRoutes);

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});