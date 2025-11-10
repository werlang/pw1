<?php

include "../connection.php";

if (
    !isset($_POST["name"]) ||
    !isset($_POST["email"]) ||
    !isset($_POST["password"]) ||
    empty($_POST["name"]) ||
    empty($_POST["email"]) ||
    empty($_POST["password"])
) {
    echo json_encode([
        "error" => true,
        "message" => "Todos campos precisam ser preenchidos",
    ]);
    exit;
}

$email = $_POST["email"];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "error" => true,
        "message" => "O email informado não é válido",
    ]);
    exit;
}

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$data = $stmt->fetch();

if ($data) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário já está cadastrado",
    ]);
    exit;
}

$name = $_POST["name"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

try {
    $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        "name" => $name,
        "email" => $email,
        "password" => $password,
    ]);

    echo json_encode([
        "message" => "Usuário inserido",
    ]);
}
catch(error) {
    echo json_encode([
        "error" => true,
        "message" => "Um error aconteceu durante a consulta",
        "errormsg" => $error,
        "sql" => $sql,
    ]);
}
