<?php

require "connection.php";

// Questão 3:
// Receber os dados do usuário logado.
// Fazer a validaçao do usuário, para garantir que a senha enviada corresponde ao usuário logado (verificar sessão). Esta parte é igual ao login
// Verificar e garantir que a extensão do currículo enviado seja .pdf
// Enviar o currículo para a pasta uploads com nome igual ao id do usuário logado
// Atualizar o perfil do usuário no banco de dados
//   SQL: UPDATE users SET name = ?, email = ? WHERE id = ?
// Atualizar os dados do usuário na sessão: name e email
// Retornar sucesso e os dados do usuário.

session_start();
$userLogged = $_SESSION["user"];
$password = $_POST["password"];
$name = $_POST["name"];
$email = $_POST["email"];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([ $userLogged["email"] ]);

$user = $stmt->fetch();

$id = $user["id"];

if (!password_verify($password, $user["password"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Senha incorreta"
    ]);
    exit;
}

$sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([
    $name,
    $email,
    $id
]);

$_SESSION["user"] = [
    "name" => $name,
    "email" => $email,
];

$file = $_FILES["curriculum"];

if ($file["type"] != "application/pdf") {
    echo json_encode([
        "status" => "error",
        "message" => "Currículo deve ser um arquivo PDF"
    ]);
    exit;
}

$destination = "uploads/$id.pdf";
if (!move_uploaded_file($file["tmp_name"], $destination)) {
    echo json_encode([
        "status" => "error",
        "message" => "Erro ao enviar arquivo"
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "message" => "Usuário atualizado com sucesso",
    "user" => $_SESSION["user"]
]);




