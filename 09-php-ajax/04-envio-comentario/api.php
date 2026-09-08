<?php
/**
 * Exercício 04: Envio de Comentário / Dúvida - API em PHP
 * 
 * Recebe dados enviados via POST com FormData e devolve confirmação em JSON.
 */

header('Content-Type: application/json; charset=utf-8');

// 1. Garantir que apenas requisições POST sejam aceitas
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido. Utilize POST para enviar comentários.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Leitura dos campos do $_POST (preenchidos automaticamente pelo FormData)
$nome = trim($_POST['nome'] ?? '');
$turma = trim($_POST['turma'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');

// 3. Validação defensiva dos dados
if ($nome === '' || $turma === '' || $mensagem === '') {
    http_response_code(422);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Todos os campos (nome, turma e mensagem) são obrigatórios.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($mensagem) < 5) {
    http_response_code(422);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Sua mensagem deve conter no mínimo 5 caracteres.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. Registro bem-sucedido com código HTTP 201 Created
$idRecado = rand(100, 999);
$horarioRegistro = date('H:i');

http_response_code(201);
echo json_encode([
    'sucesso' => true,
    'mensagem' => "Obrigado, {$nome}! Seu recado foi registrado com sucesso.",
    'id' => $idRecado,
    'horario' => $horarioRegistro
], JSON_UNESCAPED_UNICODE);
exit;
