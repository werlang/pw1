<?php
/**
 * Exercício 05: Consulta de Saldo da Carteirinha - API em PHP
 * 
 * Demonstra a emissão de diferentes códigos HTTP de status (200, 404, 422)
 * para exercitar o tratamento defensivo no frontend.
 */

header('Content-Type: application/json; charset=utf-8');

// 1. Apenas GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido. Utilize GET para consultas de saldo.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Base de dados em array simulado
$carteirinhas = [
    '1001' => [
        'nome' => 'Ana Clara Souza',
        'matricula' => '20241001',
        'saldo' => 32.50,
        'situacao' => 'Ativa'
    ],
    '1002' => [
        'nome' => 'Bruno Henrique Lima',
        'matricula' => '20241002',
        'saldo' => 5.20,
        'situacao' => 'Ativa'
    ],
    '1003' => [
        'nome' => 'Carla Beatriz Mendes',
        'matricula' => '20231003',
        'saldo' => 0.00,
        'situacao' => 'Bloqueada'
    ]
];

// 3. Leitura e validação
$numero = trim($_GET['carteirinha'] ?? '');

if ($numero === '') {
    http_response_code(422);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O número da carteirinha é obrigatório.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Simula um pequeno atraso de 300ms para o aluno perceber o estado "Carregando..."
usleep(300000);

// 4. Verificação de existência da carteirinha
if (!isset($carteirinhas[$numero])) {
    http_response_code(404);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Carteirinha nº {$numero} não foi localizada no cadastro escolar."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 5. Sucesso 200 OK
http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'carteirinha' => $carteirinhas[$numero]
], JSON_UNESCAPED_UNICODE);
exit;
