<?php

session_start();
include "../connection.php";

if (!isset($_SESSION["user"])) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário não está logado"
    ]);
    exit;
}

$id = $_SESSION["user"];

$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);
$data = $stmt->fetch();

if (!$data) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário não foi encontado"
    ]);
    exit;
}

echo json_encode([
    "message" => "Usuário encontrado",
    "user" => [
        "name" => $data["name"],
        "email" => $data["email"],
    ]
]);