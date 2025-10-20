<?php

include "connection.php";

if (
    !isset($_POST["name"]) ||
    empty($_POST["name"]) ||
    !isset($_POST["email"]) ||
    empty($_POST["email"])
) {
    echo json_encode([
        "error" => true,
        "message" => "Nome e E-mail precisam ser informados",
    ]);
    exit;
}

$name = $_POST["name"];
$email = $_POST["email"];

$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    "email" => $email,
    "name" => $name,
]);

echo json_encode([
    "message" => "Usuário inserido",
    "user" => [
        "id" => $conn->lastInsertId(),
        "name" => $name,
        "email" => $email,
    ]
]);