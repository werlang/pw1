<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize POST para cadastrar livros."
    ]);
    exit;
}

// 1. Lê a carga útil JSON bruta do corpo da requisição
$corpoRequisicao = file_get_contents("php://input");
$dados = json_decode($corpoRequisicao, true);

if (!is_array($dados)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "O corpo da requisição deve ser um objeto JSON válido."
    ]);
    exit;
}

$titulo = trim($dados["titulo"] ?? "");
$autor = trim($dados["autor"] ?? "");
$ano = $dados["ano"] ?? null;
$paginas = $dados["paginas"] ?? null;

if ($titulo === "" || $autor === "" || $ano === null || $paginas === null || !is_numeric($paginas)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Campos 'titulo', 'autor', 'ano' e 'paginas' são obrigatórios no JSON."
    ]);
    exit;
}

$horasEstimadas = ceil((int)$paginas / 30); // Estima 30 páginas por hora

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "id" => rand(100, 999),
        "titulo" => $titulo,
        "autor" => $autor,
        "ano" => (int)$ano,
        "paginas" => (int)$paginas,
        "estimativa_leitura" => "$horasEstimadas horas"
    ],
    "message" => "Livro cadastrado na biblioteca com sucesso!"
]);
