<?php

require "connection.php";

$category = $_GET["id"];
$sql = "SELECT * FROM products";
$data = [];

if ($category !== '0') {
    $sql .= " WHERE category_id = ?";
    $data[] = $category;
}

$stmt = $conn->prepare($sql);
$stmt->execute($data);
$selectedProducts = $stmt->fetchAll();

header("Content-Type: application/json");
echo json_encode($selectedProducts);