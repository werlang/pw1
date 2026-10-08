<?php

require "connection.php";

function insert_user($name, $email) {
    global $conn;
    $sql = "INSERT INTO users (name, email) 
        VALUES (:name, :email)";
    $stmt = $conn->prepare($sql);

    $stmt->execute([
        "email" => $email,
        "name" => $name,
    ]);
    $id = $conn->lastInsertId();
    return $id;
}

$name = $_POST["name"];
$email = $_POST["email"];
$id = insert_user($name, $email);

echo json_encode([
    "message" => "Usuário inserido",
    "user" => [
        "id" => $id,
        "name" => $name,
        "email" => $email,
    ]
]);