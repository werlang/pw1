<?php

require "../core/connection.php";

$sql = "SELECT id, name FROM classes";
$stmt = $conn->query($sql);
$classes = $stmt->fetchAll();

echo json_encode([
    "classes" => $classes,
]);