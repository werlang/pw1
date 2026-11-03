<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Allow: POST");
    echo json_encode([
        "error" => true,
        "message" => "Use POST para sair",
    ]);
    exit;
}

session_start();

// Remove o usuário da sessão e apaga a sessão no servidor.
unset($_SESSION["user"]);
session_destroy();

echo json_encode([
    "message" => "Usuário deslogado",
]);
