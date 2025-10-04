<?php
include "../connection.php";

if (!isset($_POST["id"])) {
    echo json_encode(["error" => true, "message" => "ID inválido"]);
    exit;
}

$id = (int)$_POST["id"];

$stmt = $conn->prepare("DELETE FROM tasks WHERE id = :id");
$stmt->execute(["id" => $id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["message" => "Tarefa excluída com sucesso"]);
} else {
    echo json_encode(["error" => true, "message" => "Tarefa não encontrada"]);
}
