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

$curso = trim($_POST["curso"] ?? "");
$turno = strtolower(trim($_POST["turno"] ?? ""));
$bolsa = $_POST["bolsa_percentual"] ?? null;

$cursosDisponiveis = [
    "Informatica" => 450.00,
    "Mecatronica" => 480.00,
    "Edificacoes" => 420.00
];

$ajusteTurno = [
    "manha" => 1.00,   // sem ajuste
    "tarde" => 0.95,   // 5% desconto
    "noite" => 1.10    // 10% adicional
];

if (!isset($cursosDisponiveis[$curso])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Curso inválido. Opções válidas: Informatica, Mecatronica, Edificacoes."
    ]);
    exit;
}

if (!isset($ajusteTurno[$turno])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Turno inválido. Opções válidas: manha, tarde, noite."
    ]);
    exit;
}

if ($bolsa === null || !is_numeric($bolsa) || (float)$bolsa < 0 || (float)$bolsa > 100) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "O parâmetro 'bolsa_percentual' deve ser um número entre 0 e 100."
    ]);
    exit;
}

$valorBase = $cursosDisponiveis[$curso];
$valorComTurno = $valorBase * $ajusteTurno[$turno];
$descontoBolsa = $valorComTurno * ((float)$bolsa / 100);
$valorFinal = $valorComTurno - $descontoBolsa;

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "curso" => $curso,
        "turno" => $turno,
        "valor_base" => $valorBase,
        "valor_com_turno" => round($valorComTurno, 2),
        "desconto_bolsa" => round($descontoBolsa, 2),
        "mensalidade_final" => round($valorFinal, 2)
    ],
    "message" => "Simulação de mensalidade calculada com sucesso."
]);
