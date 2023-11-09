<?php

session_start();
require "connection.php";

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);

$user = $stmt->fetch();
if (!$user) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuário não existe"
    ]);
    exit;
}

if (!password_verify($password, $user["password"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Senha não confere"
    ]);
    exit;
}

$_SESSION["user"] = [
    "name" => $user["name"],
    "email" => $user["email"]
];

echo json_encode([
    "status" => "success",
    "message" => "Usuário logado com sucesso",
    "user" => $_SESSION["user"]
]);
