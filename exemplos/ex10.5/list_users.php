<?php

include "connection.php";

header('Content-Type: application/json');

$sql = "SELECT name FROM users";
$stmt = $conn->prepare($sql);
$stmt->execute();

$listUsers = $stmt->fetchAll();

echo json_encode([
    "message" => "Usuários encontrados",
    "users" => $listUsers,
]);