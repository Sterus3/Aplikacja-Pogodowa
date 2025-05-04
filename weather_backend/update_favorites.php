<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$favorite_cities = json_encode($data->favorite_cities);

$stmt = $pdo->prepare("UPDATE users SET favorite_cities = ? WHERE id = ?");
try {
    $stmt->execute([$favorite_cities, $user_id]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>