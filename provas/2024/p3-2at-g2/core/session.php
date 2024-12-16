<?php

session_start();

if (!isset($_SESSION['user'])) {
    echo json_encode([
        "error" => true,
        "message" => "Usuário não autenticado",
    ]);
    exit;
}

echo json_encode([
    "message" => "Usuário autenticado",
    "user" => $_SESSION['user'],
]);