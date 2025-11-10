<?php

session_start();

if (!isset($_SESSION["user"])) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário não está logado"
    ]);
    exit;
}

unset($_SESSION["user"]);

echo json_encode([
    "message" => "O usuário foi deslogado",
]);