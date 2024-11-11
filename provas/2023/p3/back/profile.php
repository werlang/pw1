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

echo json_encode([
    "status" => "error",
    "message" => "Edição de perfil não implementada",
]);
