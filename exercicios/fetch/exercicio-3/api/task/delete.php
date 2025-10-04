<?php

include "../connection.php";

if (!isset($_GET["id"])) {
    echo json_encode(["error" => true, "message" => "ID não informado"]);
    exit;
}

$id = (int)$_GET["id"];

$stmt = $conn->prepare("DELETE FROM tasks WHERE id = :id");
$stmt->execute(["id" => $id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["message" => "Tarefa removida com sucesso"]);
} else {
    echo json_encode(["error" => true, "message" => "Tarefa não encontrada"]);
}
