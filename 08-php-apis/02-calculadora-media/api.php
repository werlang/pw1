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

$nota1 = $_GET["nota1"] ?? null;
$nota2 = $_GET["nota2"] ?? null;
$optativa = $_GET["optativa"] ?? null;

// Validação defensiva dos parâmetros obrigatórios
if ($nota1 === null || $nota2 === null || !is_numeric($nota1) || !is_numeric($nota2)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Informe os parâmetros numéricos obrigatórios 'nota1' e 'nota2' na URL."
    ]);
    exit;
}

$n1 = (float)$nota1;
$n2 = (float)$nota2;

// Se enviou nota optativa, substitui a menor nota caso seja maior
$usouOptativa = false;
if ($optativa !== null && is_numeric($optativa)) {
    $nOpt = (float)$optativa;
    if ($nOpt > $n1 && $n1 <= $n2) {
        $n1 = $nOpt;
        $usouOptativa = true;
    } elseif ($nOpt > $n2 && $n2 < $n1) {
        $n2 = $nOpt;
        $usouOptativa = true;
    }
}

$media = ($n1 + $n2) / 2;
$situacao = ($media >= 6.0) ? "Aprovado" : "Recuperação";

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "nota1_final" => $n1,
        "nota2_final" => $n2,
        "usou_optativa" => $usouOptativa,
        "media" => round($media, 1),
        "situacao" => $situacao
    ],
    "message" => "Cálculo de média realizado com sucesso."
]);
