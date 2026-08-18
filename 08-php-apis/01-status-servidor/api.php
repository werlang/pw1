<?php

header("Content-Type: application/json");

// Verifica se o método utilizado é GET
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "result" => null,
        "message" => "Método não permitido. Utilize GET."
    ]);
    exit;
}

http_response_code(200);
echo json_encode([
    "status" => "OK",
    "result" => [
        "servico" => "API do Campus IFSUL",
        "status_servidor" => "operacional",
        "versao_php" => PHP_VERSION,
        "horario_servidor" => date("Y-m-d H:i:s"),
        "fuso_horario" => date_default_timezone_get()
    ],
    "message" => "Serviço em pleno funcionamento."
]);
