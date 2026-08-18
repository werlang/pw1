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
        "message" => "O corpo da requisição deve ser um JSON válido."
    ]);
    exit;
}

$usuario = trim($dados["usuario"] ?? "");
$senha = (string)($dados["senha"] ?? "");

if ($usuario === "" || $senha === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Campos 'usuario' e 'senha' são obrigatórios no JSON."
    ]);
    exit;
}

// Critérios de segurança
$temTamanho = strlen($senha) >= 8;
$temMaiuscula = preg_match("/[A-Z]/", $senha) === 1;
$temNumero = preg_match("/[0-9]/", $senha) === 1;
$temEspecial = preg_match("/[\W_]/", $senha) === 1;

$criteriosAtendidos = [
    "tamanho_minimo_8" => $temTamanho,
    "letra_maiuscula" => $temMaiuscula,
    "numero" => $temNumero,
    "caractere_especial" => $temEspecial
];

$pontos = 0;
if ($temTamanho) $pontos += 25;
if ($temMaiuscula) $pontos += 25;
if ($temNumero) $pontos += 25;
if ($temEspecial) $pontos += 25;

if ($pontos >= 75) {
    $nivel = "Forte";
} elseif ($pontos >= 50) {
    $nivel = "Média";
} else {
    $nivel = "Fraca";
}

// Se a senha for fraca (< 50 pontos), retorna 400 Bad Request
if ($pontos < 50) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => [
            "pontuacao" => $pontos,
            "nivel" => $nivel,
            "criterios" => $criteriosAtendidos
        ],
        "message" => "A senha informada não atende aos requisitos mínimos de segurança."
    ]);
    exit;
}

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "usuario" => $usuario,
        "pontuacao" => $pontos,
        "nivel" => $nivel,
        "criterios" => $criteriosAtendidos
    ],
    "message" => "Senha validada com sucesso."
]);
