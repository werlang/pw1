<?php

require "../core/connection.php";
// header("Content-Type: application/json");

if(!isset($_POST["email"]) || !isset($_POST["password"]) || empty($_POST["email"]) || empty($_POST["password"])){
    echo json_encode([
        "error" => true,
        "message" => "Email e senha são obrigatórios",
    ]);
    exit;
}

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();

if(!$user){
    echo json_encode([
        "error" => true,
        "message" => "Usuário não encontrado",
    ]);
    exit;
}

if(!password_verify($password, $user["password"])){
    echo json_encode([
        "error" => true,
        "message" => "Senha incorreta",
    ]);
    exit;
}

session_start();
$_SESSION["user"] = [
    "id" => $user["id"],
    "name" => $user["name"],
    "email" => $user["email"],
];

echo json_encode([
    "message" => "Usuário logado com sucesso",
    "user" => $user,
]);
