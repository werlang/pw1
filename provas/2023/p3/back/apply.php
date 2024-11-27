<?php

require "connection.php";

// Questão 4
// Receber o id da vaga do formulário por POST do campo jobs
// Usar o email do usuário logado na sessão para buscar o id do usuário
//   SQL: SELECT id FROM users WHERE email = ?
// Verificar se o usuário já se candidatou a esta vaga
//   SQL: SELECT * FROM applications WHERE user = ? AND job = ?
// Insere a candidatura
//   SQL: INSERT INTO applications (user, job) VALUES (?, ?)

$jobId = $_POST["jobs"];
$name = $_POST["name"];

session_start();
$userLogged = $_SESSION["user"];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([ $userLogged["email"] ]);

$user = $stmt->fetch();

$id = $user["id"];

$sql = "SELECT * FROM applications WHERE user = ? AND job = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $id,
    $jobId,
]);

$exists = $stmt->fetch();

if ($exists) {
    echo json_encode([
        "status" => "error",
        "message" => "Você já se candidatou a esta vaga",
    ]);
    exit;
}

$sql = "INSERT INTO applications (user, job) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $id,
    $jobId,
]);

echo json_encode([
    "status" => "success",
    "message" => "Candidatura realizada com sucesso",
]);



