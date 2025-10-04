<?php
include "../connection.php";

$stmt = $conn->prepare("DELETE FROM tasks WHERE completed = TRUE");
$stmt->execute();

$count = $stmt->rowCount();

echo json_encode([
    "message" => "$count tarefa(s) concluída(s) excluída(s)",
    "count" => $count
]);
