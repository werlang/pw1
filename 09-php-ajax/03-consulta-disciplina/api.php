<?php
/**
 * Exercício 03: Consulta de Disciplinas - API em PHP
 * 
 * Recebe o parâmetro 'sigla' via GET e retorna os detalhes da disciplina em JSON.
 */

header('Content-Type: application/json; charset=utf-8');

// 1. Aceita apenas GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido. Utilize GET para consultas.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Base de dados em array associativo
$disciplinas = [
    'pw1' => [
        'nome' => 'Programação Web I',
        'sigla' => 'PW1',
        'carga_horaria' => '80h',
        'professor' => 'Prof. Pablo Werlang',
        'ementa' => 'HTML5 semântico, CSS3 moderno, JavaScript assíncrono (DOM, Promises, fetch) e backend com PHP e APIs REST.'
    ],
    'bd' => [
        'nome' => 'Banco de Dados',
        'sigla' => 'BD',
        'carga_horaria' => '60h',
        'professor' => 'Prof. André Guimarães',
        'ementa' => 'Modelagem conceitual e lógica, álgebra relacional, linguagem SQL (DML e DDL) e integridade referencial.'
    ],
    'redes' => [
        'nome' => 'Redes de Computadores',
        'sigla' => 'REDES',
        'carga_horaria' => '80h',
        'professor' => 'Profª. Fernanda Rocha',
        'ementa' => 'Modelo OSI e pilha TCP/IP, endereçamento IPv4/IPv6, protocolos de aplicação (HTTP, DNS, DHCP) e roteamento.'
    ],
    'es' => [
        'nome' => 'Engenharia de Software',
        'sigla' => 'ES',
        'carga_horaria' => '40h',
        'professor' => 'Prof. Carlos Silva',
        'ementa' => 'Metodologias ágeis (Scrum, Kanban), levantamento de requisitos, diagramas UML e testes de software.'
    ]
];

// 3. Leitura e validação do parâmetro
$sigla = strtolower(trim($_GET['sigla'] ?? ''));

if ($sigla === '') {
    http_response_code(422);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O parâmetro "sigla" é obrigatório na URL.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!isset($disciplinas[$sigla])) {
    http_response_code(404);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Disciplina com a sigla '{$sigla}' não foi encontrada no catálogo do curso."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. Retorno com sucesso 200 OK
http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'disciplina' => $disciplinas[$sigla]
], JSON_UNESCAPED_UNICODE);
exit;
