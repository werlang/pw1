<?php
/**
 * Exercício 02: Horário Oficial do Campus - API em PHP
 * 
 * Responde a requisições GET com dados do servidor em formato JSON.
 */

// 1. Cabeçalho informando que a resposta é JSON puro
header('Content-Type: application/json; charset=utf-8');

// 2. Garante que apenas o método GET seja aceito
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido. Utilize GET para consultar o horário.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Define o fuso horário padrão
date_default_timezone_set('America/Sao_Paulo');

$hora = (int) date('H');
$turno = 'Noite';

if ($hora >= 6 && $hora < 12) {
    $turno = 'Manhã';
} elseif ($hora >= 12 && $hora < 18) {
    $turno = 'Tarde';
}

// 4. Retorno JSON padronizado com status 200 OK
http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'campus' => 'IFSul - Campus Charqueadas',
    'horario' => date('H:i:s'),
    'data' => date('d/m/Y'),
    'turno' => $turno,
    'dia_semana' => date('l')
], JSON_UNESCAPED_UNICODE);
exit;
