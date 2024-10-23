<?php

header("Content-Type: application/json");

if (!isset($_GET["id"]) && !isset($_GET["name"])) {
    echo json_encode([
        "error" => true,
        "message" => "Informações necessárias não enviadas"
    ]);
    exit;
}

require "connection.php";

if (isset($_GET["id"])) {
    $categoryId = $_GET["id"];
    
    $sql = "SELECT id, name, price FROM products WHERE category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ $categoryId ]);
    
    $products = $stmt->fetchAll();
    
    echo json_encode([
        "products" => $products
    ]);
}
else if (isset($_GET["name"])) {
    $name = $_GET["name"];
    
    $sql = "SELECT id, name, price FROM products WHERE name LIKE ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ "%$name%" ]);
    
    $products = $stmt->fetchAll();
    
    echo json_encode([
        "products" => $products
    ]);
}