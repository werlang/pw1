<?php

include "../connection.php";

// Get JSON data from request body
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data["id"]) || !isset($data["name"]) || !isset($data["email"])) {
    echo json_encode(["error" => true, "message" => "Dados inválidos"]);
    exit;
}

$id = (int)$data["id"];
$name = trim($data["name"]);
$email = trim($data["email"]);
$bio = isset($data["bio"]) ? trim($data["bio"]) : "";

$stmt = $conn->prepare("UPDATE users SET name = :name, email = :email, bio = :bio WHERE id = :id");
$stmt->execute([
    "id" => $id,
    "name" => $name,
    "email" => $email,
    "bio" => $bio
]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["message" => "Perfil atualizado com sucesso"]);
} else {
    echo json_encode(["message" => "Nenhuma alteração realizada"]);
}
