<?php
include "../connection.php";

if (!isset($_POST["id"])) {
    echo json_encode(["error" => true, "message" => "ID inválido"]);
    exit;
}

$id = (int)$_POST["id"];

$stmt = $conn->prepare("UPDATE tasks SET completed = NOT completed WHERE id = :id");
$stmt->execute(["id" => $id]);

$stmt = $conn->prepare("SELECT * FROM tasks WHERE id = :id");
$stmt->execute(["id" => $id]);
$task = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode(["message" => "Status atualizado", "task" => $task]);
