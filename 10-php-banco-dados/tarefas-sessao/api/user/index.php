<?php

// A URL pública é /api/user/index.php.
// O método HTTP decide a operação: GET lista, POST cadastra.
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    require __DIR__ . "/get_list.php";
    exit;
}

if ($method === "POST") {
    require __DIR__ . "/add.php";
    exit;
}

// PUT, DELETE e outros métodos não existem neste recurso.
http_response_code(405);
header("Allow: GET, POST");
echo json_encode([
    "error" => true,
    "message" => "Método não permitido",
]);
