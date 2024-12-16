<?php

session_start();

unset($_SESSION['user']);

echo json_encode([
    "message" => "Usuário deslogado com sucesso"
]);
