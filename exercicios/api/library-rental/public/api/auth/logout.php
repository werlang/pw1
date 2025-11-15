<?php
session_start();
header('Content-Type: application/json');

// Destruir todas as variáveis de sessão
$_SESSION = array();

// Destruir a sessão
session_destroy();

echo json_encode([
    'message' => 'Logout realizado com sucesso'
]);
