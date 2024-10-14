<?php

require "connection.php";

header('Content-Type: application/json');

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];

$sql = "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $name,
    $email,
    password_hash($password, PASSWORD_DEFAULT)
]);


$output["message"] = "Usuário cadastrado";
$output["user"] = [
    "name" => $name,
    "email" => $email
];

echo json_encode($output);