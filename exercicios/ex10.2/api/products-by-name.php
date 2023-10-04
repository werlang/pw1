<?php

require "connection.php";

$name = $_GET["name"];
$stmt = $conn->prepare("SELECT * FROM products WHERE name LIKE CONCAT ('%', ?, '%')");
$stmt->execute([ $name ]);
$selectedProducts = $stmt->fetchAll();

header("Content-Type: application/json");
echo json_encode($selectedProducts);