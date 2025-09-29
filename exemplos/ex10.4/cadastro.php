<?php

include "connection.php";

$name = $_POST["name"];
$email = $_POST["email"];

$sql = "SELECT * FROM users WHERE email = '$email'";
$stmt = $conn->query($sql);
$result = $stmt->fetch();

if ($result) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário informado já está cadastrado",
    ]);
    exit;
}

$sql = "INSERT INTO users(name, email) VALUES ('$name', '$email')";

$conn->query($sql);

echo json_encode([
    "message" => "Usuário inserido",
]);