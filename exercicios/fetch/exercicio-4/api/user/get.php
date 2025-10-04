<?php

include "../connection.php";

if (!isset($_GET["id"])) {
    echo json_encode(["error" => true, "message" => "ID não informado"]);
    exit;
}

$id = (int)$_GET["id"];

$stmt = $conn->prepare("SELECT id, name, email, bio FROM users WHERE id = :id");
$stmt->execute(["id" => $id]);
$user = $stmt->fetch();

if ($user) {
    echo json_encode(["user" => $user]);
} else {
    echo json_encode(["error" => true, "message" => "Usuário não encontrado"]);
}
