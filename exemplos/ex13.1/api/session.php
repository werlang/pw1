<?php

session_start();

if (!isset($_SESSION["user"])) {
    echo json_encode([
        "error" => true,
        "message" => "O usuário não está logado"
    ]);
    exit;
}

$loggedUser = $_SESSION["user"];