<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize GET."
    ]);
    exit;
}

$valor = $_GET["valor"] ?? null;
$origem = strtoupper(trim($_GET["origem"] ?? ""));
$destino = strtoupper(trim($_GET["destino"] ?? ""));

$escalasValidas = ["C", "F", "K"];

if ($valor === null || !is_numeric($valor) || !in_array($origem, $escalasValidas, true) || !in_array($destino, $escalasValidas, true)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Parâmetros inválidos. Informe 'valor' numérico e 'origem'/'destino' válidos (C, F ou K)."
    ]);
    exit;
}

$v = (float)$valor;

// 1. Converte primeiro para Celsius como base intermediária
$celsius = match ($origem) {
    "C" => $v,
    "F" => ($v - 32) * (5 / 9),
    "K" => $v - 273.15,
};

// 2. Converte de Celsius para a escala de destino
$resultado = match ($destino) {
    "C" => $celsius,
    "F" => ($celsius * (9 / 5)) + 32,
    "K" => $celsius + 273.15,
};

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "valor_original" => $v,
        "escala_origem" => $origem,
        "escala_destino" => $destino,
        "resultado" => round($resultado, 2)
    ],
    "message" => "Conversão de temperatura realizada com sucesso."
]);
