<?php

session_start();

if (!isset($_SESSION['user'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuário não logado",
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "message" => "Usuário logado",
    "user" => $_SESSION['user'],
]);