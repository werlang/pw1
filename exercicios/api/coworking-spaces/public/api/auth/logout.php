<?php
session_start();
header('Content-Type: application/json');

session_destroy();

echo json_encode([
    'message' => 'Logout realizado com sucesso'
]);
