<?php

require "connection.php";

// Questão 2: Login de usuário
// Receber por POST (do formulário) email e password.
// Retornar erros quando algum dos campos não for preenchido.
// Retornar erro quando o usuário não for encontrado.
//   SQL: SELECT * FROM users WHERE email = ?
// Retornar erro quando a senha estiver incorreta.
//   password_verify($string, $hash): true || false
// Caso credenciais válidas, criar sessão com os dados do usuário: email e name.
// Retornar sucesso e os dados do usuário.

if (
    !isset($_POST["email"]) || $_POST["email"] == "" ||
    !isset($_POST["password"]) || $_POST["password"] == ""
) {
    echo json_encode([
        "status" => "error",
        "message" => "Email e senha são obrigatórios",
    ]);
    exit;
}

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([ $email ]);

$user = $stmt->fetch();
if (!$user) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuário não encontrado"
    ]);
    exit;
}

if (!password_verify($password, $user["password"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Senha incorreta"
    ]);
    exit;
}

session_start();
$_SESSION["user"] = [
    "name" => $user["name"],
    "email" => $user["email"]
];

echo json_encode([
    "status" => "success",
    "message" => "Usuário logado com sucesso",
]);
