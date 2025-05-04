const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

// Trasa rejestracji z walidacją danych wejściowych
router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Nazwa użytkownika jest wymagana'),
        body('email').isEmail().withMessage('Podaj poprawny adres email'),
        body('password').isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków'),
        body('phone_number').optional().isMobilePhone().withMessage('Podaj poprawny numer telefonu'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    authController.register
);

// Trasa logowania
router.post('/login', authController.login);

// Test połączenia z bazą danych
router.get('/test-db', authController.testConnection);

module.exports = router;