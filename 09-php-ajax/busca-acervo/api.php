<?php
/**
 * API do Acervo da Biblioteca - Simulação de Catálogo
 * 
 * Responde a requisições GET filtrando livros pelo título, autor ou categoria.
 * Retorna dados em JSON com cabeçalhos e status HTTP adequados.
 */

header('Content-Type: application/json; charset=utf-8');

// 1. Garantir que o método HTTP seja GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido. Utilize GET para consultas no acervo.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Acervo simulado da biblioteca escolar
$acervo = [
    [
        'id' => 1,
        'titulo' => 'Introdução à Programação Web com HTML5 e CSS3',
        'autor' => 'Carlos Alberto Silva',
        'ano' => 2023,
        'categoria' => 'Desenvolvimento Web',
        'disponivel' => true
    ],
    [
        'id' => 2,
        'titulo' => 'JavaScript Moderno: Do Básico ao Assíncrono',
        'autor' => 'Mariana Duarte Souza',
        'ano' => 2024,
        'categoria' => 'Programação',
        'disponivel' => true
    ],
    [
        'id' => 3,
        'titulo' => 'PHP e MySQL para Iniciantes',
        'autor' => 'Roberto Mendes',
        'ano' => 2022,
        'categoria' => 'Backend',
        'disponivel' => false
    ],
    [
        'id' => 4,
        'titulo' => 'Redes de Computadores e a Internet',
        'autor' => 'James F. Kurose',
        'ano' => 2021,
        'categoria' => 'Infraestrutura',
        'disponivel' => true
    ],
    [
        'id' => 5,
        'titulo' => 'Estruturas de Dados e Algoritmos em Java',
        'autor' => 'Fernanda Lima Rocha',
        'ano' => 2020,
        'categoria' => 'Ciência da Computação',
        'disponivel' => false
    ],
    [
        'id' => 6,
        'titulo' => 'Bancos de Dados Relacionais e SQL',
        'autor' => 'André Luis Guimarães',
        'ano' => 2023,
        'categoria' => 'Banco de Dados',
        'disponivel' => true
    ],
    [
        'id' => 7,
        'titulo' => 'Design Responsivo e Acessibilidade na Web',
        'autor' => 'Camila Vasconcelos',
        'ano' => 2024,
        'categoria' => 'Desenvolvimento Web',
        'disponivel' => true
    ],
    [
        'id' => 8,
        'titulo' => 'Arquitetura de Sistemas e APIs RESTful',
        'autor' => 'Paulo Henrique Neves',
        'ano' => 2023,
        'categoria' => 'Backend',
        'disponivel' => true
    ],
    [
        'id' => 9,
        'titulo' => 'Segurança da Informação e Criptografia Prática',
        'autor' => 'Renato Faria Castro',
        'ano' => 2022,
        'categoria' => 'Segurança',
        'disponivel' => false
    ],
    [
        'id' => 10,
        'titulo' => 'Desenvolvimento de Aplicações com TypeScript',
        'autor' => 'Juliana Borges Ramos',
        'ano' => 2024,
        'categoria' => 'Programação',
        'disponivel' => true
    ]
];

// 3. Leitura e higienização do parâmetro de busca
$termo = trim($_GET['busca'] ?? '');

// 4. Validação: termo com no mínimo 2 caracteres
if (mb_strlen($termo) < 2) {
    http_response_code(422);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O termo de busca deve conter pelo menos 2 caracteres.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 5. Simulação de um pequeno atraso de rede (50 a 150ms) para tornar evidente o teste de concorrência
usleep(rand(50000, 150000));

// 6. Filtragem case-insensitive no título, autor ou categoria
$resultados = array_filter($acervo, function ($livro) use ($termo) {
    $termoNoTitulo = mb_stripos($livro['titulo'], $termo) !== false;
    $termoNoAutor = mb_stripos($livro['autor'], $termo) !== false;
    $termoNaCategoria = mb_stripos($livro['categoria'], $termo) !== false;

    return $termoNoTitulo || $termoNoAutor || $termoNaCategoria;
});

// 7. Retorno com os resultados filtrados
http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'termo' => $termo,
    'total' => count($resultados),
    'livros' => array_values($resultados)
], JSON_UNESCAPED_UNICODE);
exit;
