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

echo json_encode([
    "status" => "error",
    "message" => "Login não implementado",
]);
