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

echo json_encode([
    "status" => "error",
    "message" => "Candidatura não implementada",
]);
