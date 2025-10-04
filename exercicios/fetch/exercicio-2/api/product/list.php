<?php

include "../connection.php";

$category = isset($_GET['category']) ? trim($_GET['category']) : '';

if (empty($category)) {
    // Return all products
    $stmt = $conn->prepare("SELECT * FROM products ORDER BY name");
    $stmt->execute();
} else {
    // Filter by category
    $stmt = $conn->prepare("SELECT * FROM products WHERE category = :category ORDER BY name");
    $stmt->execute(["category" => $category]);
}

$products = $stmt->fetchAll();

echo json_encode([
    "products" => $products
]);
