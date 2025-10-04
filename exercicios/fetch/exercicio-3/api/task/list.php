<?php

include "../connection.php";

$stmt = $conn->prepare("SELECT * FROM tasks ORDER BY id DESC");
$stmt->execute();
$tasks = $stmt->fetchAll();

echo json_encode([
    "tasks" => $tasks
]);
