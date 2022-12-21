<?php
require "connection.php";

$output = [];

$name = $_POST["name"];
$password = $_POST["password"];
$email = $_POST["email"];

try {
    $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password);";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        "name" => $name,
        "email" => $email,
        "password" => $password,
    ]);

    $output["status"] = "OK";
    $output["id"] = $conn->lastInsertId();
}
catch(PDOException $error) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to insert new user.",
        "error" => $error
    ]);
} 

header('Content-Type: application/json');
echo json_encode($output);