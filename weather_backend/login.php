<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user['id'],
            "username" => $user['username'],
            "email" => $user['email'],
            "favorite_cities" => json_decode($user['favorite_cities'])
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Błędny login lub hasło"]);
}
?>
