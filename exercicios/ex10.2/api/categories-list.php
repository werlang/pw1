<?php

require "connection.php";

$stmt = $conn->prepare("SELECT * FROM categories");
$stmt->execute();
$categoriesList = $stmt->fetchAll();

header("Content-Type: application/json");
echo json_encode($categoriesList);