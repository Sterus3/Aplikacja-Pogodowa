const db = require('../models/db');
const bcrypt = require('bcrypt');

// Rejestracja użytkownika
exports.register = async (req, res) => {
    const { username, email, password, phone_number } = req.body;

    try {
        console.log('Dane wejściowe z formularza:', req.body);

        // Sprawdź, czy użytkownik z podanym emailem już istnieje
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'Użytkownik z podanym emailem już istnieje' });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Zapisz użytkownika w bazie danych
        const result = await db.execute(
            'INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, phone_number]
        );
        console.log('Wynik zapytania:', result);

        res.json({ success: true, message: 'Rejestracja zakończona pomyślnie' });
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
        res.status(500).json({ success: false, message: 'Błąd serwera' });
    }
};

// Logowanie użytkownika
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Dane wejściowe z formularza:', req.body);

        // Pobierz użytkownika na podstawie emaila
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Nieprawidłowy email lub hasło' });
        }

        const user = rows[0];

        // Porównaj hasło w postaci hashowanej
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Nieprawidłowy email lub hasło' });
        }

        // Zalogowano pomyślnie
        console.log('Zalogowany użytkownik:', { username: user.username, email: user.email });
        res.json({
            success: true,
            message: 'Zalogowano pomyślnie',
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Błąd logowania:', error);
        res.status(500).json({ success: false, message: 'Błąd serwera' });
    }
};

// Test połączenia z bazą danych
exports.testConnection = async (req, res) => {
    try {
        await db.execute('SELECT 1'); // Proste zapytanie testowe
        res.send('Połączenie z bazą danych działa poprawnie!');
    } catch (error) {
        console.error('Błąd połączenia z bazą danych:', error);
        res.status(500).send('Błąd połączenia z bazą danych');
    }
};