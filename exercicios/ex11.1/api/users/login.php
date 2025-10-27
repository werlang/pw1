<?php

include "../connection.php";

if (
    !isset($_POST["email"]) ||
    !isset($_POST["password"]) ||
    empty($_POST["email"]) ||
    empty($_POST["password"])
) {
    echo json_encode([
        "error" => true,
        "message" => "Email e senha precisam ser informados",
    ]);
    exit;
}

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$data = $stmt->fetch();

if (!$data) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário não encontrado",
    ]);
    exit;
}

if (!password_verify($password, $data["password"])) {
    echo json_encode([
        "error" => true,
        "message" => "A senha não confere",
    ]);
    exit;
}

echo json_encode([
    "message" => "Usuário logado",
]);