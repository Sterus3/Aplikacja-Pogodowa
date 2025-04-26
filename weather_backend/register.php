<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_BCRYPT);
$phone = $data->phone;
$favorite_cities = json_encode($data->favorite_cities);

$stmt = $pdo->prepare("INSERT INTO users (username, email, password, phone_number, favorite_cities) 
                       VALUES (?, ?, ?, ?, ?)");

try {
    $stmt->execute([$username, $email, $password, $phone, $favorite_cities]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
