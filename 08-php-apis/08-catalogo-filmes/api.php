<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize POST."
    ]);
    exit;
}

$corpo = file_get_contents("php://input");
$dados = json_decode($corpo, true);

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
$genero = trim($dados["genero"] ?? "");
$duracao = $dados["duracao_minutos"] ?? null;
$faixaEtaria = $dados["classificacao_etaria"] ?? null;

if ($titulo === "" || $genero === "" || $duracao === null || !is_numeric($duracao) || (int)$duracao <= 0) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Informe 'titulo', 'genero' e 'duracao_minutos' (número positivo) válidos."
    ]);
    exit;
}

$tipoMetragem = ((int)$duracao >= 60) ? "Longa-metragem" : "Curta-metragem";
$classificacaoTexto = ($faixaEtaria === 0 || $faixaEtaria === "Livre") ? "Classificação Livre" : "+$faixaEtaria anos";

http_response_code(201);
echo json_encode([
    "status" => "OK",
    "result" => [
        "id" => rand(100, 999),
        "titulo" => $titulo,
        "genero" => $genero,
        "duracao_minutos" => (int)$duracao,
        "formato" => $tipoMetragem,
        "indicacao" => $classificacaoTexto
    ],
    "message" => "Filme adicionado ao catálogo com sucesso!"
]);
