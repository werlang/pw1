<?php
include "../connection.php";

$stmt = $conn->prepare("SELECT * FROM tasks ORDER BY completed ASC, created_at DESC");
$stmt->execute();
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["tasks" => $tasks]);
