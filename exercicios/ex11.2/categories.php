<?php

require "connection.php";

header("Content-Type: application/json");

$sql = "SELECT * FROM categories";
$stmt = $conn->prepare($sql);
$stmt->execute();

$categories = $stmt->fetchAll();

echo json_encode([
    "categories" => $categories
]);