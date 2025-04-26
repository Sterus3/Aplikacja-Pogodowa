<?php
$host = 'localhost';
$dbname = 'weather_app';
$user = 'root';
$pass = ''; // Domyślne hasło root w XAMPP to puste

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Połączenie nieudane: " . $e->getMessage());
}
?>